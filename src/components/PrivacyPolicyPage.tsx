import React from 'react';
import {
  ArrowLeft,
  ExternalLink,
  FileText,
} from 'lucide-react';
import { BreaksyLogo } from './BreaksyLogo';
import { BunnyCloudGraphic } from './BunnyCloudGraphic';
import { BackToTopButton } from './BackToTopButton';

interface PrivacyPolicyPageProps {
  onBackToHome: () => void;
  onOpenDownload?: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onBackToHome,
  onOpenDownload,
}) => {
  return (
    <div className="min-h-screen bg-transparent text-[#D7E2EA] font-sans selection:bg-purple-500/30 selection:text-white flex flex-col justify-between">
      {/* 1. Header / Navigation */}
      <header className="sticky top-0 z-40 w-full bg-[#060816]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
          {/* Logo links back to home */}
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2.5 group cursor-pointer bg-transparent border-0 p-0 text-left"
          >
            <BreaksyLogo size="sm" showText={false} />
            <span className="text-xl font-black tracking-tight text-white uppercase heading-font group-hover:text-purple-300 transition-colors">
              Breaksy
            </span>
          </button>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href="#/terms"
              className="px-3 sm:px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              <span>Terms of Service</span>
            </a>
            <button
              onClick={onBackToHome}
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>
            <button
              onClick={onOpenDownload}
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid rgba(255, 255, 255, 0.95)',
                outlineOffset: '-3px',
              }}
              className="px-4 py-1.5 rounded-full text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-md select-none inline-flex items-center justify-center"
            >
              Get App
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        {/* Hero Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <BunnyCloudGraphic size="lg" className="mb-4" />

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white mb-2">
            Breaksy Privacy Policy
          </h1>

          {/* Clean metadata line without artificial pill containers */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-400">
            <span><strong className="text-slate-300">Last updated:</strong> 17 October 2026</span>
            <span className="text-white/20">•</span>
            <span><strong className="text-slate-300">Platform:</strong> Android Digital Wellbeing</span>
            <span className="text-white/20">•</span>
            <span><strong className="text-slate-300">Architecture:</strong> Local On-Device Storage</span>
          </div>
        </div>

        {/* Clean, comfortable centered reading layout directly on the universal dark background */}
        <div className="max-w-4xl mx-auto w-full">
            {/* Quick Principles Note */}
            <div className="mb-10 pl-4 border-l-2 border-emerald-500/60 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <span className="text-white font-semibold block mb-1 uppercase tracking-wider text-xs">
                Device-First Architecture
              </span>
              Breaksy operates locally without server sign-ups. Your app selections and habit records stay on your phone. Read below for full details on on-device processing and third-party Google services.
            </div>

            {/* Section 1 */}
            <section
              id="sec-1"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">1</span>
                Introduction
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Breaksy (&ldquo;Breaksy&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is an Android digital wellbeing app that helps you reduce mindless scrolling and build healthier screen-time habits. It does this by pausing you with a breathing prompt or short challenge when you open apps you have chosen.
                </p>
                <p>
                  This policy explains what information Breaksy accesses and handles, why, who receives it, and what choices you have. It covers information that stays on your device and information processed by the third-party services built into the app (Google Firebase and Google AdMob). It applies to the Breaksy app on Android.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section
              id="sec-2"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">2</span>
                Summary
              </h2>
              <div className="space-y-3 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <ul className="space-y-2.5 pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Breaksy has no account, sign-up or login.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Your selected apps, focus settings, goals and progress are processed and stored on your device and are not uploaded by Breaksy.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Breaksy uses the Android Accessibility Service only to detect when you open an app you selected. It does not read screen content, keystrokes or messages.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Third-party services in the app (Firebase Analytics, Firebase Cloud Messaging, Firebase Crashlytics and Google AdMob) collect technical and advertising-related information from your device. This is explained in sections 5 and 6.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Breaksy does not have an in-app setting to change ad personalization. You can control ads through your Android settings.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section
              id="sec-3"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">3</span>
                Information stored and processed on your device
              </h2>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  To provide its core features, Breaksy handles the following on your device:
                </p>
                <ul className="space-y-2 pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>The apps you choose to be interrupted;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Your focus settings, habit goals and onboarding choices;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Your progress, such as streaks and your Crystal Garden;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Your Vibe Lock and notification preferences.</span>
                  </li>
                </ul>
                <p className="pt-1">
                  This information is stored and processed locally on your device and is not uploaded by Breaksy as part of its core functionality. You can remove it by clearing Breaksy&rsquo;s app data or uninstalling the app.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section
              id="sec-4"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">4</span>
                Accessibility Service
              </h2>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Breaksy uses Android&rsquo;s Accessibility Service to detect when you open an app you have selected for interruption. This lets Breaksy show a mindful pause, breathing prompt or cognitive challenge before you continue. This is the only purpose for which Breaksy uses this service.
                </p>
                <div className="pl-4 border-l-2 border-purple-500/60 text-purple-200">
                  <p className="leading-relaxed">
                    Breaksy does not use Accessibility Service to read screen content, keystrokes, passwords, messages or personal communications. Information detected through the service is processed on your device and is not sent to our servers or to third parties by Breaksy. We do not use it for advertising and we do not sell it.
                  </p>
                </div>
                <p>
                  Breaksy shows you a separate notice explaining this before you are taken to Android Settings to enable the service. You must enable it yourself, and you can turn it off at any time in <span className="text-white font-medium">Android Settings &gt; Accessibility</span>. If you turn it off, the app-interruption features will stop working.
                </p>
              </div>
            </section>

            {/* Section 5 with Clean Responsive Table (Directly on page background) */}
            <section
              id="sec-5"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">5</span>
                Third-party services and the information they process
              </h2>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Breaksy includes the following services provided by Google. Google processes information under its own terms and privacy policies, and, depending on the product and settings, may act as an independent controller or as a service provider.
                </p>

                {/* Table for Third-Party Services */}
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/20 text-white font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
                        <th className="py-3 pr-4">Service</th>
                        <th className="py-3 px-4">What it does in Breaksy</th>
                        <th className="py-3 pl-4">Information it may process</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <tr>
                        <td className="py-3.5 pr-4 font-medium text-white whitespace-nowrap align-top">
                          Firebase Analytics
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 align-top">
                          Helps us understand app usage and engagement
                        </td>
                        <td className="py-3.5 pl-4 text-slate-300 align-top">
                          App events and interactions, app-instance identifiers, device and app information, approximate location derived from IP address
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 pr-4 font-medium text-white whitespace-nowrap align-top">
                          Firebase Cloud Messaging
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 align-top">
                          Delivers push notifications
                        </td>
                        <td className="py-3.5 pl-4 text-slate-300 align-top">
                          Notification delivery tokens and related technical information
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 pr-4 font-medium text-white whitespace-nowrap align-top">
                          Firebase Crashlytics
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 align-top">
                          Identifies crashes and technical problems
                        </td>
                        <td className="py-3.5 pl-4 text-slate-300 align-top">
                          Crash reports, diagnostic information, device and operating-system details, installation identifiers
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 pr-4 font-medium text-white whitespace-nowrap align-top">
                          Google AdMob
                        </td>
                        <td className="py-3.5 px-4 text-slate-300 align-top">
                          Displays advertisements
                        </td>
                        <td className="py-3.5 pl-4 text-slate-300 align-top">
                          Advertising identifier, IP address, device information, ad interactions and diagnostic data
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  The exact information depends on how these services are configured and on your device settings. Learn more: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline underline-offset-2 hover:text-white inline-flex items-center gap-1">Google Privacy Policy <ExternalLink className="w-3 h-3 inline" /></a>, <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline underline-offset-2 hover:text-white inline-flex items-center gap-1">Privacy and Security in Firebase <ExternalLink className="w-3 h-3 inline" /></a>, <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline underline-offset-2 hover:text-white inline-flex items-center gap-1">How Google uses information from sites or apps that use its services <ExternalLink className="w-3 h-3 inline" /></a>.
                </p>
                <p>
                  These services may link their information to a device or app installation. Breaksy does not intentionally combine it with your name or contact details, because Breaksy does not collect them.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section
              id="sec-6"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">6</span>
                Advertising
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Breaksy shows ads through Google AdMob. AdMob and Google&rsquo;s advertising partners may use your advertising identifier, IP address and ad interactions to deliver, measure, personalize and protect ads and to prevent fraud. Ads may be personalized or non-personalized depending on your settings, applicable consent requirements and Google&rsquo;s ad systems.
                </p>
                <p>
                  Breaksy does not provide an in-app control to change ad personalization. You can manage it on Android in <span className="text-white font-medium">Settings &gt; Privacy &gt; Ads</span>, where you can reset your advertising ID or opt out of ads personalization. See also Google Ad Settings. Breaksy does not give advertisers any information from the Accessibility Service or your on-device Breaksy data.
                </p>
              </div>
            </section>

            {/* Section 7 with Permissions Table (Directly on page background) */}
            <section
              id="sec-7"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">7</span>
                Permissions
              </h2>
              <div className="space-y-4 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-white/20 text-white font-semibold uppercase tracking-wider text-[11px] sm:text-xs">
                        <th className="py-3 pr-4">Permission</th>
                        <th className="py-3 pl-4">Why Breaksy uses it</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      <tr>
                        <td className="py-3.5 pr-4 font-medium text-white whitespace-nowrap align-top">
                          Accessibility Service
                        </td>
                        <td className="py-3.5 pl-4 text-slate-300 align-top">
                          To detect when you open a selected app and show the pause screen (section 4)
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 pr-4 font-medium text-white whitespace-nowrap align-top">
                          Notifications
                        </td>
                        <td className="py-3.5 pl-4 text-slate-300 align-top">
                          To send reminders, focus-session alerts and wind-down prompts you allow
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 pr-4 font-medium text-white whitespace-nowrap align-top">
                          Run at startup
                        </td>
                        <td className="py-3.5 pl-4 text-slate-300 align-top">
                          To restore supported reminders and protections after your device restarts
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 pr-4 font-medium text-white whitespace-nowrap align-top">
                          Vibration
                        </td>
                        <td className="py-3.5 pl-4 text-slate-300 align-top">
                          To give touch feedback during challenges and breathing exercises
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3.5 pr-4 font-medium text-white whitespace-nowrap align-top">
                          Internet access
                        </td>
                        <td className="py-3.5 pl-4 text-slate-300 align-top">
                          Needed by Firebase and AdMob to send diagnostics and load ads
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p>
                  You can review or revoke permissions at any time in your Android settings. If you deny or revoke a permission, the feature that depends on it will not work.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section
              id="sec-8"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">8</span>
                How we use information
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>We and our service providers use information to:</p>
                <ul className="space-y-2.5 pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Detect when you open a selected app and show an interruption;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Run focus sessions, challenges, Vibe Locks and progress features;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Send notifications you have allowed;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Understand usage and engagement, and fix crashes and technical problems;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Show and measure advertising;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Keep the app secure and reliable, prevent misuse, and meet legal obligations.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 9 */}
            <section
              id="sec-9"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">9</span>
                Sharing
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>We share information only as follows:</p>
                <ul className="space-y-2.5 pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Google (Firebase and AdMob) and, through AdMob, Google&rsquo;s advertising partners, as described in sections 5 and 6;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Authorities or advisers where the law requires it or to protect rights, safety or the security of the app;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>A successor if Breaksy is sold or transferred, in which case this policy will continue to apply unless you are told of a change.</span>
                  </li>
                </ul>
                <p className="pt-2">
                  We do not sell personal information for money. Some privacy laws define &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; broadly to include certain advertising disclosures; where those laws apply to you, you can use the Android ad controls in section 6 to opt out of personalized ads.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section
              id="sec-10"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">10</span>
                Retention and deletion
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  <strong className="text-white font-medium">On your device:</strong> Breaksy&rsquo;s local data stays until you clear Breaksy&rsquo;s app data or uninstall the app, which removes it from your device.
                </p>
                <p>
                  <strong className="text-white font-medium">Third-party services:</strong> information held by Firebase and AdMob is kept under Google&rsquo;s retention practices and the settings we configure. For example, Google states that Crashlytics crash data is kept for 90 days. Uninstalling Breaksy does not delete information those services have already received.
                </p>
                <p>
                  <strong className="text-white font-medium">Requests:</strong> because Breaksy has no accounts, there is no in-app account deletion. For questions or requests about information handled by Breaksy, email <code className="px-2 py-0.5 rounded bg-white/10 text-purple-200 font-mono text-xs">[PRIVACY CONTACT EMAIL]</code>. We will tell you what we can do. We may not be able to identify data held by Google, and some of it can only be managed through Google&rsquo;s own privacy tools.
                </p>
              </div>
            </section>

            {/* Section 11 */}
            <section
              id="sec-11"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">11</span>
                Security
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  We take reasonable steps to protect information handled by Breaksy, including keeping your core app data on your device and collecting only what the app needs. Information on your device is also protected by your device&rsquo;s security, and information held by Google is subject to Google&rsquo;s security practices. No method of storage or transmission is completely secure, so we cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Section 12 */}
            <section
              id="sec-12"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">12</span>
                Children
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Breaksy is intended for users aged 13 and older and is not intended for children under 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided information through Breaksy, contact us at <code className="px-2 py-0.5 rounded bg-white/10 text-purple-200 font-mono text-xs">[PRIVACY CONTACT EMAIL]</code> and we will review it.
                </p>
              </div>
            </section>

            {/* Section 13 */}
            <section
              id="sec-13"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">13</span>
                Your rights and choices
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Depending on where you live, you may have the right to ask about, access, correct, delete, restrict or object to the processing of your personal information, to withdraw consent where processing relies on it, and to complain to your local data-protection authority.
                </p>
                <p>
                  You can exercise your choices by changing Android permissions, turning off the Accessibility Service, adjusting Android ad settings, clearing app data or uninstalling Breaksy. For requests about information handled by Breaksy, email <code className="px-2 py-0.5 rounded bg-white/10 text-purple-200 font-mono text-xs">[PRIVACY CONTACT EMAIL]</code>. We may ask for details to understand your request. Requests about information held by Google may need to be sent to Google.
                </p>
              </div>
            </section>

            {/* Section 14 */}
            <section
              id="sec-14"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">14</span>
                International processing
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Google may process information in countries other than the one where you live, including the United States. Google&rsquo;s terms and safeguards govern those transfers.
                </p>
              </div>
            </section>

            {/* Section 15 */}
            <section
              id="sec-15"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">15</span>
                Changes to this policy
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  We may update this policy when Breaksy, its services or legal requirements change. We will post the new version at <code className="px-2 py-0.5 rounded bg-white/10 text-purple-200 font-mono text-xs">[PRIVACY POLICY URL]</code> and update the &ldquo;Last updated&rdquo; date. If a change is significant, we will tell you in the app.
                </p>
              </div>
            </section>

            {/* Section 16 */}
            <section
              id="sec-16"
              className="scroll-mt-24 pb-8 sm:pb-10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">16</span>
                Contact
              </h2>
              <div className="space-y-2 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  <strong className="text-white font-medium">App:</strong> Breaksy
                </p>
                <p>
                  <strong className="text-white font-medium">Developer:</strong> <code className="px-2 py-0.5 rounded bg-white/10 text-purple-200 font-mono text-xs">[DEVELOPER OR LEGAL ENTITY NAME]</code>
                </p>
                <p>
                  <strong className="text-white font-medium">Email:</strong> <code className="px-2 py-0.5 rounded bg-white/10 text-purple-200 font-mono text-xs">[PRIVACY CONTACT EMAIL]</code>
                </p>
                <p>
                  <strong className="text-white font-medium">Privacy Policy URL:</strong> <code className="px-2 py-0.5 rounded bg-white/10 text-purple-200 font-mono text-xs">[PRIVACY POLICY URL]</code>
                </p>
              </div>
            </section>
        </div>
      </main>

      {/* 3. Footer */}
      <footer className="w-full bg-transparent border-t border-white/10 py-10 mt-16 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BreaksyLogo size="sm" showText={false} />
            <div>
              <span className="font-bold text-white tracking-wide uppercase heading-font">Breaksy</span>
              <p className="text-[11px] text-slate-400">Mindful Phone Use & Habit Architecture</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={onBackToHome}
              className="hover:text-white transition-colors cursor-pointer bg-transparent border-0 p-0 text-slate-400"
            >
              Home
            </button>
            <span className="text-white/20">•</span>
            <a href="#/terms" className="hover:text-white transition-colors text-slate-400">
              Terms of Service
            </a>
            <span className="text-white/20">•</span>
            <a href="#/privacy" className="text-purple-300 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <span className="text-white/20">•</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="hover:text-purple-300 transition-colors cursor-pointer bg-transparent border-0 p-0 text-slate-400"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <BackToTopButton />
    </div>
  );
};
