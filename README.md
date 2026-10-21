<div align="center">
  <h1 align="center">Breaksy</h1>
  <p align="center">
    <strong>Mindful Screen-Time Intervention & Digital Well-being</strong>
  </p>
  <p align="center">
    Interrupt subconscious doomscrolling muscle memory with micro-friction challenges, serene breathing pauses, themed vibe locks, and habit rewiring.
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind-CSS%20v4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Vite-Fast-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
    <img src="https://img.shields.io/badge/Lenis-Smooth_Scroll-000000?style=flat-square" alt="Lenis" />
  </p>
</div>

---

## 🌟 Features

- **🐰 Interactive Sleeping Mascot**: The signature Breaksy bunny rests peacefully with floating animated `Zzz` bubbles and naturally tracks your mouse movement while you explore.
- **✨ Ultra-Smooth Scrolling**: Powered by [Lenis](https://github.com/darkroomengineering/lenis) momentum scrolling with optimized touch responsiveness.
- **🛡️ Interception Simulator**: Interactive playground demonstrating real-time reflex intercepts and breathing pauses before opening addictive apps.
- **🎮 Micro-Challenges & Vibe Locks**: Interactive showcase of mini-tasks, tactile hurdles, and calming focus modes.
- **📱 Responsive & Fast**: Fully optimized across desktop, tablet, and mobile screens with code-splitting and asset minification.
- **🔒 Privacy Policy & Terms Pages**: Complete, accessible legal and policy documents built directly into the client.

---

## 🚀 Quick Start (Local Development)

### Prerequisites

Ensure you have **Node.js** (version 18 or newer) installed.

### 1. Clone the repository
```bash
git clone https://github.com/Imama1076/breaksy.git
cd breaksy
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
```
The production bundle will be generated in the `dist/` directory.

---

## 🌐 Deploy to the Web

### Option A: Deploy with Vercel (Recommended)
1. Push your code to GitHub (see instructions below).
2. Go to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your `breaksy` repository.
4. Vercel will automatically detect **Vite** framework settings (`npm run build`, output: `dist`).
5. Click **Deploy**! A `vercel.json` file is already included for smooth single-page routing.

### Option B: Deploy with Netlify
1. Connect your repository on [Netlify](https://www.netlify.com/).
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`
4. Deploy! The included `public/_redirects` ensures all routes resolve to `index.html`.

---

## 📤 Push to GitHub

If you are uploading this project to GitHub for the first time:

1. Create a new repository on [GitHub](https://github.com/new) (e.g. `breaksy`).
2. Run the following commands in your project terminal:

```bash
# Add your GitHub remote URL
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/breaksy.git

# Set main branch
git branch -M main

# Push your code
git push -u origin main
```

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 + Vanilla CSS animations
- **Motion & Interactions**: Framer Motion, Lenis Smooth Scroll
- **Icons**: Lucide React

---

## 📄 License

MIT License. Designed with care for digital well-being and mindful focus.
