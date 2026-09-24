import { useState } from 'react';
import { BookOpen, Lock, ChevronDown, Check } from 'lucide-react';

interface WorkbookSectionProps {
  selected: boolean;
  onToggle: (value: boolean) => void;
}

function WorkbookCover() {
  return (
    <div
      className="relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lg"
      style={{
        background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 55%, #0f766e 100%)',
      }}
    >
      <div className="absolute inset-x-0 top-0 h-1.5 bg-teal-400" />

      <div className="flex h-full flex-col items-center justify-between px-5 py-7 text-center">
        <div className="mt-3">
          <div className="mx-auto mb-4 h-px w-12 bg-teal-400/60" />
          <p className="font-serif text-[1.35rem] font-bold leading-tight tracking-wide text-white sm:text-[1.5rem]">
            AI-ERA
          </p>
          <p className="font-serif text-[1.35rem] font-bold leading-tight tracking-wide text-white sm:text-[1.5rem]">
            BUSINESS STRATEGY
          </p>
          <p className="font-serif text-[1.35rem] font-bold leading-tight tracking-wide text-teal-300 sm:text-[1.5rem]">
            WORKBOOK
          </p>
          <div className="mx-auto mt-4 h-px w-12 bg-teal-400/60" />
        </div>

        <div className="flex-1" />

        <div className="mb-1 space-y-1.5">
          <p className="text-[0.7rem] font-medium leading-snug text-slate-300 sm:text-xs">
            A practical workbook for owners and senior leadership teams
          </p>
          <p className="text-[0.7rem] font-semibold leading-snug text-teal-300 sm:text-xs">
            268-page fillable PDF
          </p>
          <p className="mt-3 text-sm font-bold tracking-wider text-white">
            FutureFitNow
          </p>
        </div>
      </div>
    </div>
  );
}

export default function WorkbookSection({ selected, onToggle }: WorkbookSectionProps) {
  const [expanded, setExpanded] = useState(false);

  const detailSections = [
    {
      heading: 'Understand what is changing',
      body: 'Investigate shifts in customer behaviour, competition, market expectations and the role AI may play in discovery and choice.',
    },
    {
      heading: 'Build an AI-Mediated Ideal Customer Profile',
      body: 'Go beyond age, sector and company size to examine the customer\u2019s trigger, urgency, risk, context, desired outcome, alternatives and likely use of AI.',
    },
    {
      heading: 'Test how well the business still fits',
      body: 'Examine whether the business can be understood, trusted, considered and chosen, and whether customer intent survives contact with the business through response speed, handoffs, context preservation, follow-up and customer effort.',
    },
    {
      heading: 'Build a measurable baseline',
      body: 'Compare the current position, the future target or hypothesis and the actual future state, while keeping observed evidence separate from assumptions.',
    },
    {
      heading: 'Connect signals to business value',
      body: 'Trace market and operating evidence through to customer outcomes, commercial consequences and enterprise value.',
    },
    {
      heading: 'Test investments before committing',
      body: 'Model demand-side value, operating improvements, value protected, investment cost, payback, scenarios and break-even conditions without pretending uncertain assumptions are proven facts.',
    },
    {
      heading: 'Make strategic choices',
      body: 'Decide what to protect, strengthen, redesign, test, automate, invest in, defer or stop.',
    },
    {
      heading: 'Build the next 90 days',
      body: 'Turn the strategy into a focused evidence and capability agenda rather than another long transformation plan.',
    },
  ];

  return (
    <div
      className={`cursor-pointer rounded-2xl border-2 p-6 transition-all sm:p-7 ${
        selected
          ? 'border-teal-600 bg-teal-50 shadow-md shadow-teal-600/10'
          : 'border-slate-200 bg-white hover:border-teal-300'
      }`}
      onClick={() => onToggle(!selected)}
    >
      {/* TOP ROW: cover (32%) + title/pricing/core proposition (68%) */}
      <div className="grid gap-6 sm:grid-cols-[32fr_68fr] sm:gap-8">
        {/* Left column: cover + availability */}
        <div>
          <WorkbookCover />
          <p className="mt-3 text-center text-sm font-semibold text-ink-700">
            268-page fillable PDF
          </p>
          <p className="mt-1 text-center text-sm text-ink-500">
            Available only through webinar registration
          </p>
        </div>

        {/* Right column: eyebrow, heading, pricing, core proposition */}
        <div className="flex flex-col">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-teal-100">
              <BookOpen className="h-5 w-5 text-teal-700" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-teal-600">
                Optional attendee resource
              </span>
              <h3 className="mt-1 text-lg font-bold text-ink-900">AI-Era Business Strategy Workbook</h3>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-2xl font-bold text-ink-900">$47</span>
            <span className="text-base font-medium text-ink-600">
              when added during advance registration
            </span>
            <span className="hidden sm:inline text-ink-300">|</span>
            <span className="text-base font-medium text-ink-500">
              $99 on the day of your selected webinar
            </span>
          </div>

          <p className="mt-4 text-base leading-relaxed text-ink-600">
            The webinar gives you the leadership view. The workbook helps you apply it to your own
            business.
          </p>
        </div>
      </div>

      {/* FULL-WIDTH CONTENT BELOW THE TOP ROW */}
      <div className="mt-6 border-t border-slate-100 pt-5">
        <div className="space-y-3">
          <p className="text-base leading-relaxed text-ink-600">
            This is not a prompt guide, AI-tool catalogue or short downloadable checklist.
          </p>
          <p className="text-base leading-relaxed text-ink-600">
            It is a 268-page practical business-strategy workbook that helps owners and leadership
            teams work through what AI is changing, what it means for their business and what is
            worth doing next.
          </p>
          <p className="text-base leading-relaxed text-ink-600">
            Use it during the webinar to capture notes, then return to it individually or with your
            leadership team for the deeper work.
          </p>
        </div>

        {/* Outcomes heading */}
        <p className="mt-5 text-sm font-semibold text-ink-900">Work through the workbook to develop:</p>

        {/* Two-column outcomes grid */}
        <div className="mt-3 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2">
          {[
            'AI-Era Strategy v1',
            'market and operating baselines',
            'priority evidence gaps and measures',
            'business-impact and ROI scenarios',
            'a 90-Day Evidence + Capability Agenda',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2.5 list-none">
              <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-600" />
              <span className="text-sm leading-relaxed text-ink-700">{item}</span>
            </li>
          ))}
        </div>

        {/* Expandable detail */}
        <div className="mt-4">
          <button
            type="button"
            className="flex w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-left transition-colors hover:bg-slate-100"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            aria-expanded={expanded}
          >
            <span className="text-sm font-semibold text-ink-900">See everything included in the workbook</span>
            <ChevronDown
              className={`h-5 w-5 flex-shrink-0 text-ink-500 transition-transform ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
          {expanded && (
            <div className="mt-3 space-y-4 rounded-lg border border-slate-200 bg-white p-5">
              {detailSections.map((section) => (
                <div key={section.heading}>
                  <h4 className="text-sm font-bold text-ink-900">{section.heading}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{section.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Availability statement */}
        <div className="mt-4 rounded-lg bg-amber-50 px-4 py-3">
          <p className="text-sm font-semibold text-ink-800">
            The workbook is not sold separately. It is available only through webinar registration.
          </p>
        </div>

        {/* Purchase checkbox */}
        <div className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-4">
          <div
            className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded border-2 transition-colors ${
              selected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
            }`}
          >
            {selected && (
              <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <span className="text-base font-medium text-ink-900">
            Add the AI-Era Business Strategy Workbook for $47
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          Secure payment by Stripe follows registration. Your webinar place remains reserved if you do
          not complete the workbook purchase.
        </p>

        {/* Licence */}
        <div className="mt-3 flex items-start gap-2 border-t border-slate-100 pt-3">
          <Lock className="mt-0.5 h-4 w-4 flex-shrink-0 text-ink-400" />
          <p className="text-sm leading-relaxed text-ink-500">
            Licensed for use within your own organisation. External distribution, resale and commercial
            client use are prohibited.{' '}
            <a href="#terms" className="font-medium text-teal-700 underline underline-offset-2 hover:text-teal-800">
              View complete purchase terms
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
