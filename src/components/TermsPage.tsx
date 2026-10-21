import React from 'react';
import {
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import { BreaksyLogo } from './BreaksyLogo';
import { BunnyCloudGraphic } from './BunnyCloudGraphic';
import { BackToTopButton } from './BackToTopButton';

interface TermsPageProps {
  onBackToHome: () => void;
  onOpenDownload?: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({
  onBackToHome,
  onOpenDownload,
}) => {

  return (
    <div className="min-h-screen bg-transparent text-[#D7E2EA] font-sans selection:bg-purple-500/30 selection:text-white flex flex-col justify-between">
      {/* 1. Header / Navigation */}
      <header className="sticky top-0 z-40 w-full bg-[#060816]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-3 sm:px-8 py-3 flex items-center justify-between gap-2">
          {/* Logo links back to home */}
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 group cursor-pointer bg-transparent border-0 p-0 text-left shrink-0"
          >
            <BreaksyLogo size="sm" showText={false} />
            <span className="text-lg sm:text-xl font-black tracking-tight text-white uppercase heading-font group-hover:text-purple-300 transition-colors">
              Breaksy
            </span>
          </button>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <a
              href="#/privacy"
              title="Privacy Policy"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400 shrink-0" />
              <span className="hidden md:inline">Privacy Policy</span>
              <span className="hidden xs:inline md:hidden">Privacy</span>
            </a>
            <button
              onClick={onBackToHome}
              title="Back to Home"
              className="px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-medium uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Home</span>
            </button>
            <button
              onClick={onOpenDownload}
              style={{
                background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
                outline: '2px solid rgba(255, 255, 255, 0.95)',
                outlineOffset: '-3px',
              }}
              className="px-3 sm:px-4 py-1.5 rounded-full text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-md select-none inline-flex items-center justify-center whitespace-nowrap shrink-0"
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
            Breaksy Terms of Service
          </h1>

          {/* Clean metadata line without artificial pill containers */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs text-slate-400">
            <span><strong className="text-slate-300">Effective date:</strong> [EFFECTIVE DATE]</span>
            <span className="text-white/20">•</span>
            <span><strong className="text-slate-300">Last updated:</strong> 17 October 2026</span>
            <span className="text-white/20">•</span>
            <span><strong className="text-slate-300">Provider:</strong> [DEVELOPER OR LEGAL ENTITY NAME]</span>
            <span className="text-white/20">•</span>
            <span><strong className="text-slate-300">Contact:</strong> [CONTACT EMAIL]</span>
          </div>
        </div>

        {/* Clean, comfortable centered reading layout directly on the universal dark background */}
        <div className="max-w-4xl mx-auto w-full">
          {/* Quick Principles Note */}
          <div className="mb-10 pl-4 border-l-2 border-purple-500/60 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className="text-white font-semibold block mb-1 uppercase tracking-wider text-xs">
              Key Principles
            </span>
            Breaksy is an on-device digital wellbeing self-help tool operating via mindful friction. It requires no user accounts or passwords, and your selected apps and habit records remain processed locally on your device.
          </div>

            {/* Section 1 */}
            <section
              id="sec-1"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">1</span>
                Agreement
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  These Terms of Service (&ldquo;Terms&rdquo;) are an agreement between you and <code className="px-2 py-0.5 rounded bg-white/10 text-purple-200 font-mono text-xs">[DEVELOPER OR LEGAL ENTITY NAME]</code> (&ldquo;we&rdquo;, &ldquo;us&rdquo;) for your use of Breaksy, an Android app that helps you reduce mindless phone use through pauses, challenges, focus sessions and related features (the &ldquo;App&rdquo;).
                </p>
                <p>
                  By installing or using the App, you agree to these Terms. If you do not agree, do not use the App. These Terms are separate from our <a href="#/privacy" className="text-purple-300 underline underline-offset-2 hover:text-white transition-colors">Privacy Policy</a>, which explains how information is handled. Agreeing to these Terms does not mean you have agreed to any specific permission or consent request in the App, and you can accept or decline those separately.
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
                Who can use Breaksy
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  You must be at least 13 years old to use the App. If you are under the age of majority where you live, you should use the App only with the permission of a parent or guardian. Breaksy has no account or sign-up, so you are responsible for how the App is used on your device.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section
              id="sec-3"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">3</span>
                What Breaksy does
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Breaksy detects when you open apps you have chosen and shows an interruption, such as a breathing prompt, a short puzzle or a pause, before you continue. It also offers focus sessions with themed &ldquo;Vibe Locks&rdquo;, progress tracking and the Crystal Garden, sleep and wind-down tools, and notifications.
                </p>
                <p>
                  Breaksy is a self-help tool that works through friction. It does not physically prevent you from using other apps, and it is not a parental-control or device-security product. We do not promise that it will change your habits or that every app launch will be detected.
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
                Permissions you control
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Breaksy uses Android&rsquo;s Accessibility Service to detect when you open apps you have selected for interruption, allowing Breaksy to display its intended prompts and challenges. The Accessibility Service is used for Breaksy&rsquo;s digital wellbeing features, as described in our Privacy Policy.
                </p>
                <p>
                  You are asked to review the relevant disclosure and provide your consent before enabling the Accessibility Service. You must then enable the permission through your device&rsquo;s Android settings. You can revoke this permission at any time through those settings, although some Breaksy features may no longer function as intended.
                </p>
                <p>
                  You agree to grant and use the Accessibility Service permission voluntarily and solely to enable Breaksy&rsquo;s intended features on your own device. You must not misuse or interfere with the App&rsquo;s use of this permission.
                </p>
                <p>
                  Other permissions, such as notifications, may be requested where needed for specific features. You can deny or revoke permissions through your device settings, but doing so may affect the availability or functionality of certain features.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section
              id="sec-5"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">5</span>
                Your use of the App
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>You agree not to:</p>
                <ul className="space-y-2.5 pl-1">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Copy, modify, reverse engineer, decompile or attempt to extract the source code of the App, except where the law allows it despite this restriction;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Bypass, disable or tamper with the App&apos;s security, ad delivery or safeguards;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Use the App to break the law or to harm, harass or spy on another person, including by using it on a device you do not own or have permission to manage;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Use automated tools to interact with the App, or interfere with Google services that the App relies on;</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-2" />
                    <span>Resell, rent or redistribute the App, or make it available under another name.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section
              id="sec-6"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">6</span>
                Health and wellbeing notice
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Breaksy offers breathing, stretching and wind-down exercises and sleep-timing suggestions for general wellbeing. They are not medical advice, diagnosis or treatment, and Breaksy is not a substitute for a doctor or mental-health professional. Stop an exercise if it causes pain or discomfort. If you are struggling with compulsive phone use, sleep problems or your mental health, please speak to a qualified professional.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section
              id="sec-7"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">7</span>
                Advertising and third-party services
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Breaksy uses third-party services, including Google Firebase, Google Firebase Cloud Messaging, Google Firebase Crashlytics, and Google AdMob, to support app analytics, notifications, crash reporting, and advertising.
                </p>
                <p>
                  These services may process certain technical information and other data as described in our Privacy Policy. Their independent operations are governed by their respective terms and privacy policies.
                </p>
                <p>
                  We do not control the independent operations of these third-party services. However, this does not exclude or limit any responsibilities we have under applicable law concerning Breaksy or our use of these services.
                </p>
                <p>
                  The display of advertisements does not constitute an endorsement of the advertised products or services by Breaksy. Any transactions or interactions you choose to have with advertisers are between you and the relevant third party.
                </p>
                <p>
                  Breaksy is distributed through Google Play and is subject to the applicable Google Play terms and policies.
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
                Our rights in the App
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  The App, including its design, themes, sounds, animations, text, software and the Breaksy name and logo, belongs to us or our licensors and is protected by intellectual-property laws. We give you a personal, non-exclusive, non-transferable, revocable licence to install and use the App on your Android devices for your own personal, non-commercial use, under these Terms. We keep all other rights.
                </p>
                <p>
                  If you send us feedback or suggestions, you allow us to use them to improve Breaksy without owing you anything for them.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section
              id="sec-9"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">9</span>
                Updates and changes to the App
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  We may update, change, add or remove features, themes or ads at any time. Some updates may be required for the App to keep working or to meet platform requirements. We may also stop providing the App, in which case we will take reasonable steps to tell you where we can.
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
                Availability
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Breaksy&rsquo;s availability and functionality may depend on your device, Android version, device settings, battery optimization settings, and the availability of third-party services.
                </p>
                <p>
                  Although we aim to make Breaksy function reliably, we do not guarantee that the App will always be available, uninterrupted, or error-free, or that every selected app launch will be detected and interrupted.
                </p>
                <p>
                  Certain features may not function as intended if required permissions are disabled or if device or operating system restrictions prevent them from working.
                </p>
                <p>
                  We may modify, suspend, or discontinue features where reasonably necessary, subject to applicable law. Where practicable, we will provide reasonable notice of significant changes or discontinuation.
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
                Termination
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  You can stop using Breaksy at any time by uninstalling it. We may suspend or end your right to use the App if you break these Terms or if we need to do so to comply with the law or to protect the App, its users or third parties. When your right ends, you must stop using the App. Sections that by their nature should continue (including sections 5, 6, 8, 12, 13 and 14) will continue to apply.
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
                Disclaimers
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  Breaksy is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis, to the extent permitted by applicable law. We do not guarantee that the App will meet every user&rsquo;s expectations, achieve a particular digital wellbeing outcome, or remain compatible with every device or future operating system update.
                </p>
                <p>
                  Nothing in these Terms excludes, restricts, or modifies any consumer rights, warranties, or protections that cannot lawfully be excluded, restricted, or modified under applicable law.
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
                Limitation of liability
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  To the maximum extent permitted by applicable law, Breaksy and its provider will not be liable for indirect, incidental, special, consequential, or punitive losses arising out of or relating to your use of, or inability to use, the App.
                </p>
                <p>
                  Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by applicable law, including liability for fraud or for death or personal injury caused by negligence where such liability cannot lawfully be excluded.
                </p>
                <p>
                  Where liability may lawfully be limited, any limitation will apply only to the extent permitted by the applicable law.
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
                Governing law and disputes
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  These Terms are governed by the laws of [GOVERNING LAW / COUNTRY], without regard to conflict-of-law rules. Courts in [COURT LOCATION] will have jurisdiction over disputes about these Terms, unless the law of the country where you live gives you the right to bring a claim in your local courts or to rely on your local consumer-protection law, in which case those rights are not affected. Before starting a formal claim, please contact us at <code className="px-2 py-0.5 rounded bg-white/10 text-purple-200 font-mono text-xs">[CONTACT EMAIL]</code> so we can try to resolve the issue informally.
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
                Changes to these Terms
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  We may update these Terms from time to time to reflect changes to Breaksy, our services, legal requirements, or other operational needs.
                </p>
                <p>
                  When we make changes, we will update the &ldquo;Last Updated&rdquo; date and make the revised Terms available at <code className="px-2 py-0.5 rounded bg-white/10 text-purple-200 font-mono text-xs">TERMS OF SERVICE URL</code>. Where required by applicable law, or where changes are material, we will provide appropriate notice and obtain any required agreement.
                </p>
                <p>
                  Your continued use of Breaksy after revised Terms take effect will indicate acceptance only where this is legally sufficient. If you do not agree to the revised Terms, you should stop using the App.
                </p>
              </div>
            </section>

            {/* Section 16 */}
            <section
              id="sec-16"
              className="scroll-mt-24 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-white/10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">16</span>
                General
              </h2>
              <div className="space-y-3.5 text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                <p>
                  These Terms and the Privacy Policy are the whole agreement between you and us about the App. If any part of these Terms is found to be unenforceable, the rest will stay in effect. If we do not enforce a right, we have not given it up. You may not transfer your rights under these Terms; we may transfer ours to a successor of the App.
                </p>
              </div>
            </section>

            {/* Section 17 */}
            <section
              id="sec-17"
              className="scroll-mt-24 pb-8 sm:pb-10"
            >
              <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2.5">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-bold">17</span>
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
                  <strong className="text-white font-medium">Email:</strong> <code className="px-2 py-0.5 rounded bg-white/10 text-purple-200 font-mono text-xs">[CONTACT EMAIL]</code>
                </p>
                <p>
                  <strong className="text-white font-medium">Terms URL:</strong> <code className="px-2 py-0.5 rounded bg-white/10 text-purple-200 font-mono text-xs">[TERMS URL]</code>
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
            <a href="#/terms" className="text-purple-300 hover:text-white transition-colors">
              Terms of Service
            </a>
            <span className="text-white/20">•</span>
            <a href="#/privacy" className="hover:text-white transition-colors text-slate-400">
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
