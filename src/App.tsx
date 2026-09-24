import {
  ArrowRight,
  ArrowDown,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  Eye,
  PauseCircle,
  TrendingUp,
  ScanEye,
  ShieldCheck,
  Compass,
  Target,
  Users,
  Award,
  BookOpen,
} from 'lucide-react';
import RegistrationForm from '@/components/RegistrationForm';
import AMCTDiagram from '@/components/AMCTDiagram';
import { SESSIONS, type SessionNumber } from '@/lib/types';
import sukeshPhoto from '@/assets/sukesh_1.png';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-sm font-bold uppercase tracking-[0.15em] text-teal-600">
      {children}
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2 font-serif text-2xl font-semibold leading-snug tracking-tight text-ink-900 sm:text-3xl">
      {children}
    </h2>
  );
}

function SessionCard({ num, compact }: { num: SessionNumber; compact?: boolean }) {
  const session = SESSIONS[num];
  return (
    <div
      className={`flex flex-col rounded-xl border-2 border-teal-200 bg-teal-50/50 ${
        compact ? 'p-4' : 'p-5'
      }`}
    >
      <span className="text-sm font-bold uppercase tracking-wider text-teal-600">
        {session.label}
      </span>
      <span className="mt-2 flex items-center gap-2 text-base font-semibold text-ink-900">
        <Calendar className="h-4 w-4 text-teal-700" />
        {session.date}
      </span>
      <span className="mt-1 flex items-center gap-2 text-sm text-ink-600">
        <Clock className="h-4 w-4 text-teal-700" />
        {session.time}
      </span>
    </div>
  );
}

function scrollToRegistration() {
  document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
}

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-ink-900 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold tracking-tight text-ink-900">FutureFitNow</span>
            <span className="text-ink-300">|</span>
            <span className="text-sm text-ink-500">AI Business Navigation</span>
          </div>
          <button
            onClick={scrollToRegistration}
            className="rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-700/20 transition-all hover:bg-teal-800 hover:shadow-lg sm:text-base"
          >
            Reserve my place
          </button>
        </div>
      </header>

      {/* SECTION 1: HERO (no video) */}
      <section className="relative overflow-hidden py-12 lg:py-16">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-teal-50 blur-3xl" />
        <div className="absolute -left-20 top-40 h-72 w-72 rounded-full bg-amber-50/60 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-6">
          {/* Full-width opening */}
          <div className="mx-auto max-w-[950px]">
            <span className="text-sm font-bold uppercase tracking-[0.15em] text-teal-600">
              Free live webinar for business owners and senior leaders
            </span>
            <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-[2.75rem]">
              Your business may be performing well. But are the rules of business changing around it?
            </h1>
          </div>

          {/* Two-column content beneath headline */}
          <div className="mt-8 grid gap-10 lg:grid-cols-[58fr_42fr] lg:gap-12">
            {/* Left column: supporting copy */}
            <div>
              <p className="text-lg leading-relaxed text-ink-600">
                AI is not only changing how businesses work. It is changing how customers find, compare
                and choose them, how competitors respond and how value is created.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                Those changes may already be affecting your market, even if revenue, customer
                satisfaction and other familiar measures still look healthy.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                Join this practical business session to understand what may be changing, what it could
                mean for your business and what deserves your attention now.
              </p>
            </div>

            {/* Right column: sessions, CTA, details */}
            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <SessionCard num={1} />
                <SessionCard num={2} />
              </div>

              <p className="mt-4 text-sm font-medium text-ink-500">
                Live online &middot; 60 minutes &middot; Limited attendance &middot; Free to attend
              </p>

              <button
                onClick={scrollToRegistration}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-teal-700/20 transition-all hover:bg-teal-800 hover:shadow-lg"
              >
                Reserve my place
                <ArrowRight className="h-5 w-5" />
              </button>
              <p className="mt-3 text-sm text-ink-500">
                For owners, CEOs, general managers and senior leaders of established businesses. No
                technical knowledge required.
              </p>
            </div>
          </div>

          {/* Compact benefit line + limited attendance note */}
          <div className="mt-10 border-t border-slate-200 pt-6">
            <p className="text-center text-base font-medium text-ink-700">
              Live Q&amp;A &middot; Submit a question &middot; Recording by request &middot; Attendee-only workbook
            </p>
            <p className="mx-auto mt-3 max-w-[680px] text-center text-sm leading-relaxed text-ink-500">
              Only two live sessions are being offered. Attendance is limited so questions from
              participating business leaders can form part of the conversation.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY THIS MATTERS (navy feature section) */}
      <section className="bg-ink-900 py-14 text-white lg:py-16">
        <div className="mx-auto max-w-6xl px-6">
          {/* Two-column opening row */}
          <div className="grid gap-8 lg:grid-cols-[40fr_60fr] lg:gap-12">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-teal-400">
                Why this matters
              </span>
              <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
                Good results today do not guarantee that the same strategy will work tomorrow.
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed text-slate-200">
                Every business operates through a strategy, whether formally written down or revealed
                through everyday choices.
              </p>
              <p className="text-lg leading-relaxed text-slate-200">
                That strategy rests on assumptions about customers, competitors, value, capability and
                how the business wins.
              </p>
              <p className="text-lg font-semibold leading-relaxed text-teal-300">
                AI is beginning to change those assumptions.
              </p>
            </div>
          </div>

          {/* Connected three-stage stepper */}
          {/* Desktop: horizontal line with numbered circles above equal-height cards */}
          {/* Mobile: vertical timeline with numbered circles beside equal-width cards */}
          <div className="mt-10">
            {/* Desktop: horizontal connecting line with numbered circles */}
            <div className="relative hidden md:block">
              {/* Horizontal line behind circles */}
              <div className="absolute top-6 left-[16.67%] right-[16.67%] h-0.5 bg-teal-500/30" />
              {/* Three numbered circles */}
              <div className="relative grid grid-cols-3">
                {[
                  { num: '01', color: 'bg-amber-100 text-ink-900' },
                  { num: '02', color: 'bg-amber-200 text-ink-900' },
                  { num: '03', color: 'bg-teal-100 text-ink-900' },
                ].map((node) => (
                  <div key={node.num} className="flex justify-center">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20 font-serif text-base font-bold ${node.color}`}>
                      {node.num}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop: three equal-height cards */}
            <div className="mt-4 hidden grid-cols-3 gap-4 md:grid">
              {[
                {
                  num: '01',
                  title: 'WHAT MADE THE BUSINESS SUCCESSFUL',
                  body: 'Customers, capabilities, operating choices and competitive advantages',
                  cardClass: 'bg-ink-800/60 border-white/10',
                },
                {
                  num: '02',
                  title: 'WHAT IS CHANGING AROUND IT',
                  body: 'How customers discover, compare and decide, how competitors respond and what the market values',
                  cardClass: 'bg-ink-800/40 border-amber-400/20',
                },
                {
                  num: '03',
                  title: 'WHAT LEADERSHIP MUST DECIDE',
                  body: 'What to protect, strengthen or investigate, and whether to move, watch or wait',
                  cardClass: 'bg-ink-800/40 border-teal-400/20',
                },
              ].map((card) => (
                <div
                  key={card.num}
                  className={`flex flex-col rounded-2xl border p-6 ${card.cardClass}`}
                >
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white">{card.title}</h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-300">{card.body}</p>
                </div>
              ))}
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden">
              <div className="relative pl-16">
                {/* Vertical line */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-teal-500/30" />
                {[
                  {
                    num: '01',
                    title: 'WHAT MADE THE BUSINESS SUCCESSFUL',
                    body: 'Customers, capabilities, operating choices and competitive advantages',
                    circleColor: 'bg-amber-100 text-ink-900',
                    cardClass: 'bg-ink-800/60 border-white/10',
                  },
                  {
                    num: '02',
                    title: 'WHAT IS CHANGING AROUND IT',
                    body: 'How customers discover, compare and decide, how competitors respond and what the market values',
                    circleColor: 'bg-amber-200 text-ink-900',
                    cardClass: 'bg-ink-800/40 border-amber-400/20',
                  },
                  {
                    num: '03',
                    title: 'WHAT LEADERSHIP MUST DECIDE',
                    body: 'What to protect, strengthen or investigate, and whether to move, watch or wait',
                    circleColor: 'bg-teal-100 text-ink-900',
                    cardClass: 'bg-ink-800/40 border-teal-400/20',
                  },
                ].map((card) => (
                  <div key={card.num} className="relative pb-6 last:pb-0">
                    {/* Numbered circle on the line */}
                    <div className={`absolute -left-12 top-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20 font-serif text-base font-bold ${card.circleColor}`}>
                      {card.num}
                    </div>
                    {/* Card */}
                    <div className={`rounded-2xl border p-5 ${card.cardClass}`}>
                      <h3 className="text-sm font-bold uppercase tracking-wide text-white">{card.title}</h3>
                      <p className="mt-2 text-base leading-relaxed text-slate-300">{card.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leadership-choice strip */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-3">
              {[
                {
                  icon: ArrowRight,
                  title: 'MOVE EARLY',
                  body: 'Where evidence is strong and learning sooner could create an advantage',
                },
                {
                  icon: Eye,
                  title: 'WATCH CAREFULLY',
                  body: 'Where the direction matters but the evidence is still forming',
                },
                {
                  icon: PauseCircle,
                  title: 'DELIBERATELY WAIT',
                  body: 'Where investment is premature, with clear signals for reconsidering',
                },
              ].map((choice, i) => (
                <div
                  key={choice.title}
                  className={`flex flex-col p-5 ${i < 2 ? 'md:border-r border-white/10' : ''} border-b border-white/10 md:border-b-0`}
                >
                  <div className="flex items-center gap-2">
                    <choice.icon className="h-4 w-4 text-teal-400" />
                    <span className="text-sm font-bold tracking-wide text-white">{choice.title}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{choice.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Closing line */}
          <p className="mx-auto mt-4 max-w-[680px] text-center text-lg font-medium leading-relaxed text-teal-200">
            The risk is not moving early or waiting. It is doing either without understanding what has
            changed.
          </p>
        </div>

        {/* Visual transition: teal accent line connecting navy to light section */}
        <div className="mx-auto mt-10 h-px max-w-[680px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent" />
      </section>

      {/* SECTION 3: A BUSINESS PERSPECTIVE (light cream section) */}
      <section className="bg-amber-50/40 py-14 lg:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[38fr_62fr] lg:gap-12">
            {/* Left column */}
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.15em] text-teal-600">
                A business perspective, not a technology pitch
              </span>
              <h2 className="mt-3 font-serif text-2xl font-semibold leading-snug tracking-tight text-ink-900 sm:text-3xl">
                Understand the changing game before deciding how to play it.
              </h2>
              <div className="mt-5 space-y-3">
                <p className="text-lg leading-relaxed text-ink-600">
                  The webinar starts with the business, not with AI tools.
                </p>
                <p className="text-lg leading-relaxed text-ink-600">
                  It helps leaders step back from the noise, understand which changes may matter and
                  decide what deserves a response.
                </p>
              </div>

              {/* Inset pull-out */}
              <div className="mt-6 rounded-xl border-l-4 border-teal-600 bg-teal-50 px-5 py-4">
                <p className="text-lg font-semibold leading-relaxed text-ink-900">
                  This is not about using more AI.
                </p>
                <p className="mt-2 text-base leading-relaxed text-ink-700">
                  It is about making better business decisions as AI changes the environment in which
                  strategy must work.
                </p>
              </div>
            </div>

            {/* Right column: 2x2 + 1 outcome grid */}
            <div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  {
                    num: '01',
                    icon: TrendingUp,
                    title: 'SEE THE CHANGE',
                    body: 'Which rules of business may be changing',
                  },
                  {
                    num: '02',
                    icon: ScanEye,
                    title: 'TEST THE MEANING',
                    body: 'What those changes could mean for your business and current strategy',
                  },
                  {
                    num: '03',
                    icon: ShieldCheck,
                    title: 'ASSESS YOUR POSITION',
                    body: 'Where the business may be exposed or newly advantaged',
                  },
                  {
                    num: '04',
                    icon: Compass,
                    title: 'CHOOSE YOUR POSTURE',
                    body: 'Whether to move early, watch carefully or deliberately wait',
                  },
                ].map((card) => (
                  <div
                    key={card.num}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-700 text-white">
                        <span className="font-serif text-sm font-bold">{card.num}</span>
                      </span>
                      <card.icon className="h-5 w-5 text-teal-600" />
                    </div>
                    <h3 className="mt-3 text-sm font-bold uppercase tracking-wide text-ink-900">{card.title}</h3>
                    <p className="mt-1.5 text-base leading-relaxed text-ink-600">{card.body}</p>
                  </div>
                ))}
              </div>

              {/* Card 05: full width conclusion */}
              <div className="mt-4 rounded-2xl border-2 border-teal-200 bg-teal-50/50 p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-teal-700 text-white">
                    <span className="font-serif text-sm font-bold">05</span>
                  </span>
                  <Target className="h-5 w-5 text-teal-600" />
                </div>
                <h3 className="mt-3 text-sm font-bold uppercase tracking-wide text-ink-900">
                  DECIDE WHAT COMES NEXT
                </h3>
                <p className="mt-1.5 text-base leading-relaxed text-ink-600">
                  What deserves investigation before committing money, capability and attention.
                </p>
              </div>
            </div>
          </div>

          {/* Concluding line */}
          <p className="mx-auto mt-8 max-w-[760px] text-center text-lg font-medium leading-relaxed text-ink-700">
            The session does not assume that every business should move quickly. It gives leaders a
            better basis for deciding whether to move, watch, wait or take no action.
          </p>
        </div>
      </section>

      {/* SECTION 4: AI-MEDIATED CHOICE TRIANGLE */}
      <section className="border-t border-slate-100 bg-ink-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="flex justify-center">
              <AMCTDiagram />
            </div>
            <div>
              <SectionLabel>One part of the changing business environment</SectionLabel>
              <SectionHeading>Customers are not waiting for businesses to work out their AI strategy.</SectionHeading>
              <p className="mt-4 text-lg leading-relaxed text-ink-600">
                Customers are already using AI to frame problems, compare alternatives and decide what to
                do next. Competitors are learning too.
              </p>
              <p className="mt-3 text-lg leading-relaxed text-ink-600">
                The question is whether your business can still be understood, trusted, considered,
                chosen and responded to as the customer&rsquo;s decision process changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: COMBINED AUDIENCE + SUKESH AUTHORITY PANEL */}
      <section className="border-t border-slate-100 py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-stretch gap-10 lg:grid-cols-[44fr_56fr] lg:gap-12">
            {/* Audience block */}
            <div className="flex flex-col justify-center">
              <SectionHeading>This session is particularly relevant if:</SectionHeading>
              <ul className="mt-5 space-y-3">
                {[
                  'current performance is sound, but you are uncertain how long the conditions supporting it will last',
                  'you are reviewing strategy, growth, capability or transformation priorities',
                  'you are deciding where AI or digital capability deserves investment',
                  'you want to separate commercially important change from noise',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <ChevronRight className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
                    <span className="text-base leading-relaxed text-ink-700">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-base font-medium text-ink-700">
                For owners, CEOs, general managers and senior leaders of established businesses. No
                technical knowledge is required.
              </p>
            </div>

            {/* Sukesh authority card */}
            <div className="overflow-hidden rounded-2xl border border-teal-200 bg-teal-50/40">
              {/* Desktop: two columns inside the card */}
              <div className="hidden sm:grid sm:grid-cols-[38fr_62fr]">
                {/* Left: full-height portrait */}
                <div className="relative min-h-[280px] overflow-hidden">
                  <img
                    src={sukeshPhoto}
                    alt="Sukesh Sukumaran"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: 'center 15%' }}
                  />
                </div>
                {/* Right: credentials */}
                <div className="flex flex-col justify-center p-6">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-teal-600">
                    About Sukesh
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-ink-900">
                    Strategy grounded in operating reality
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">
                    Sukesh Sukumaran brings more than 20 years of experience across business strategy,
                    technology-enabled growth, transformation and commercial leadership.
                  </p>
                  <div className="mt-4 space-y-3">
                    {[
                      { icon: Users, label: 'BUSINESS MENTOR', value: 'Business Mentors New Zealand since 2010' },
                      { icon: Award, label: 'INTERNATIONAL RECOGNITION', value: 'Recipient of the Business, Entrepreneurship & Innovation Changemaker International Award at the 2026 Icons of Change' },
                      { icon: BookOpen, label: 'FORTHCOMING AUTHOR', value: 'Strategy Before Strategy: Leadership in the AI Era' },
                    ].map((cred) => (
                      <div key={cred.label} className="flex items-start gap-3">
                        <cred.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-600" />
                        <div>
                          <span className="block text-xs font-bold uppercase tracking-wide text-ink-900">{cred.label}</span>
                          <span className="mt-0.5 block text-sm leading-relaxed text-ink-600">{cred.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile: portrait on top, credentials below */}
              <div className="sm:hidden">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={sukeshPhoto}
                    alt="Sukesh Sukumaran"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ objectPosition: 'center 15%' }}
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-teal-600">
                    About Sukesh
                  </span>
                  <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-ink-900">
                    Strategy grounded in operating reality
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-600">
                    Sukesh Sukumaran brings more than 20 years of experience across business strategy,
                    technology-enabled growth, transformation and commercial leadership.
                  </p>
                  <div className="mt-4 space-y-3">
                    {[
                      { icon: Users, label: 'BUSINESS MENTOR', value: 'Business Mentors New Zealand since 2010' },
                      { icon: Award, label: 'INTERNATIONAL RECOGNITION', value: 'Recipient of the Business, Entrepreneurship & Innovation Changemaker International Award at the 2026 Icons of Change' },
                      { icon: BookOpen, label: 'FORTHCOMING AUTHOR', value: 'Strategy Before Strategy: Leadership in the AI Era' },
                    ].map((cred) => (
                      <div key={cred.label} className="flex items-start gap-3">
                        <cred.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-600" />
                        <div>
                          <span className="block text-xs font-bold uppercase tracking-wide text-ink-900">{cred.label}</span>
                          <span className="mt-0.5 block text-sm leading-relaxed text-ink-600">{cred.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: REGISTRATION + WORKBOOK */}
      <section id="register" className="border-t border-slate-100 bg-ink-50 py-16">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <SectionLabel>Register to attend</SectionLabel>
            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-ink-900">
              Choose your live session
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-lg leading-relaxed text-ink-600">
              Attendance is free and limited. Choose the session that suits you, tell me what is on your
              mind if you wish, and reserve your place.
            </p>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-8">
            <RegistrationForm />
          </div>

          {/* SECTION 7: POST-REGISTRATION REASSURANCE */}
          <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-ink-900">What happens after you register</h3>
            <ul className="mt-4 space-y-3">
              {[
                'You will receive an email confirming your selected live session.',
                'The email will include the webinar link and calendar options.',
                'If you requested the recording, it will be sent after the live sessions.',
                'You may receive an optional 30-second leadership pulse before the webinar.',
                'Questions submitted in advance may help shape the session.',
                'If you purchased the workbook, you will receive access after payment.',
                'If you did not purchase the workbook during advance registration, you may purchase it for $99 on the day of your selected live webinar.',
                'The workbook is not available for purchase separately from the webinar.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-600" />
                  <span className="text-base leading-relaxed text-ink-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 8: FINAL CTA */}
      <section className="border-t border-slate-100 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="font-serif text-2xl font-semibold leading-snug text-ink-900 sm:text-3xl">
            Your business may be performing well today.
          </p>
          <p className="mt-3 font-serif text-xl font-medium leading-snug text-ink-700 sm:text-2xl">
            Are the rules creating that performance still fit for the market now forming?
          </p>
          <p className="mx-auto mt-5 max-w-[680px] text-lg leading-relaxed text-ink-600">
            Join one of two live sessions to understand what may be changing, what it could mean for your
            strategy and what deserves your attention next.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <SessionCard num={1} compact />
            <SessionCard num={2} compact />
          </div>

          <button
            onClick={scrollToRegistration}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-8 py-4 text-base font-semibold text-white shadow-md shadow-teal-700/20 transition-all hover:bg-teal-800 hover:shadow-lg"
          >
            Reserve my place
            <ArrowRight className="h-5 w-5" />
          </button>
          <p className="mt-3 text-sm font-medium text-ink-500">
            Free to attend &middot; Live online &middot; Limited attendance
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <span className="text-base font-medium text-ink-600">
              FutureFitNow | AI Business Navigation
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <a href="#privacy" className="text-sm text-ink-500 transition-colors hover:text-teal-700">
                Privacy
              </a>
              <a href="#terms" className="text-sm text-ink-500 transition-colors hover:text-teal-700">
                Terms
              </a>
              <a href="#terms" className="text-sm text-ink-500 transition-colors hover:text-teal-700">
                Workbook purchase terms
              </a>
              <a href="#contact" className="text-sm text-ink-500 transition-colors hover:text-teal-700">
                Contact
              </a>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-ink-400">
            &copy; 2026 FutureFitNow
          </p>
        </div>
      </footer>
    </div>
  );
}
