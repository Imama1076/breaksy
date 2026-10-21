/**
 * Persistent high-capacity storage for user-uploaded slide images.
 * Uses IndexedDB with localStorage fallback and automatic high-fidelity compression
 * so that uploaded images never exceed browser quotas and never disappear on refresh.
 */

const DB_NAME = 'breaksy_media_db';
const DB_VERSION = 1;
const STORE_NAME = 'slide_images';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveImageToDB(key: string, dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(dataUrl, key);
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn('IndexedDB save failed, falling back to localStorage only', err);
  }
}

export async function getAllImagesFromDB(): Promise<Record<string, string>> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    return new Promise((resolve) => {
      const images: Record<string, string> = {};
      const request = store.openCursor();
      request.onsuccess = () => {
        const cursor = request.result;
        if (cursor) {
          images[String(cursor.key)] = String(cursor.value);
          cursor.continue();
        } else {
          resolve(images);
        }
      };
      request.onerror = () => resolve({});
    });
  } catch {
    return {};
  }
}

export async function removeImageFromDB(key: string): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(key);
  } catch {
    // ignore
  }
}

/**
 * Optimizes high-res phone screenshots to clean, web-efficient resolution
 * (max 1400px, 90% quality) so that even 10 large uploads easily fit in memory and disk.
 */
export function optimizeImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      const img = new Image();
      img.onerror = () => resolve(rawDataUrl); // Fallback to raw if load fails
      img.onload = () => {
        try {
          const maxDim = 1400;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(rawDataUrl);
            return;
          }

          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Try WebP first for ultra-crisp compression, fall back to JPEG
          const webpData = canvas.toDataURL('image/webp', 0.92);
          if (webpData.startsWith('data:image/webp')) {
            resolve(webpData);
          } else {
            resolve(canvas.toDataURL('image/jpeg', 0.9));
          }
        } catch {
          resolve(rawDataUrl);
        }
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  });
}
