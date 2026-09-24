import { useState, type FormEvent } from 'react';
import { Loader2, CheckCircle2, AlertCircle, Calendar, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import WorkbookSection from '@/components/WorkbookSection';
import { SESSIONS, type SessionNumber } from '@/lib/types';

interface RegistrationFormData {
  first_name: string;
  last_name: string;
  business: string;
  role: string;
  email: string;
  important_question: string;
  preferred_session: SessionNumber;
  wants_recording: boolean;
  wants_workbook: boolean;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const initialState: RegistrationFormData = {
  first_name: '',
  last_name: '',
  business: '',
  role: '',
  email: '',
  important_question: '',
  preferred_session: 1,
  wants_recording: false,
  wants_workbook: false,
};

export default function RegistrationForm() {
  const [formData, setFormData] = useState<RegistrationFormData>(initialState);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field: keyof RegistrationFormData, value: string | boolean | SessionNumber) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const sendConfirmationEmail = async (registrationId: string) => {
    const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-confirmation`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    };

    const res = await fetch(functionUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        preferred_session: formData.preferred_session,
        wants_workbook: formData.wants_workbook,
        wants_recording: formData.wants_recording,
        payment_status: formData.wants_workbook ? 'pending' : 'free',
      }),
    });

    if (!res.ok) {
      console.error('Confirmation email failed:', await res.text());
    }
  };

  const redirectToCheckout = async (registrationId: string) => {
    const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    };

    const res = await fetch(functionUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        registration_id: registrationId,
        email: formData.email,
        preferred_session: formData.preferred_session,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Payment setup failed: ${errText}`);
    }

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('No checkout URL returned');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setStatus('submitting');
    setErrorMessage('');

    try {
      const { data, error } = await supabase
        .from('webinar_registrations')
        .insert([
          {
            first_name: formData.first_name,
            last_name: formData.last_name || null,
            company: formData.business || null,
            role: formData.role || null,
            email: formData.email,
            important_question: formData.important_question || null,
            preferred_session: formData.preferred_session,
            wants_recording: formData.wants_recording,
            wants_workbook: formData.wants_workbook,
            payment_status: formData.wants_workbook ? 'pending' : 'free',
          },
        ])
        .select('id')
        .single();

      if (error) throw error;

      const registrationId = data.id;

      sendConfirmationEmail(registrationId).catch((err) =>
        console.error('Email send error:', err),
      );

      if (formData.wants_workbook) {
        await redirectToCheckout(registrationId);
        return;
      }

      setStatus('success');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setStatus('error');
      setErrorMessage(msg);
    }
  };

  if (status === 'success') {
    const session = SESSIONS[formData.preferred_session];
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
          <CheckCircle2 className="h-7 w-7 text-teal-700" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-ink-900">You're registered</h3>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-600">
          A confirmation email is on its way to{' '}
          <span className="font-medium text-ink-900">{formData.email}</span> with the live-session
          link and calendar options for Google, Outlook, Apple and Yahoo.
        </p>
        <div className="mt-5 w-full rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-left">
          <p className="text-sm font-semibold text-ink-900">
            {session.label}: {session.date}
          </p>
          <p className="mt-1 text-sm text-ink-600">{session.time}</p>
          {formData.wants_recording && (
            <p className="mt-2 text-sm text-ink-600">
              You will receive the recording after the live sessions.
            </p>
          )}
        </div>
        <div className="mt-5 w-full rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 text-left">
          <p className="text-sm font-medium uppercase tracking-wider text-ink-500">
            Optional: 30 seconds
          </p>
          <p className="mt-1 text-sm font-semibold text-ink-700">
            NexFrontier Logic Leadership Pulse
          </p>
          <p className="mt-1 text-sm text-ink-500">
            A brief pulse survey whose aggregate responses may help ground the webinar in what
            leaders are seeing now.{' '}
            <a
              href="https://nexfrontierlogic.nz/leadership-pulse"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal-700 underline underline-offset-2 transition-colors hover:text-teal-800"
            >
              Take the survey
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mx-auto max-w-2xl space-y-6">
      {/* Session selection cards */}
      <div>
        <label className="mb-3 block text-base font-medium text-ink-900">Choose your live session</label>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {([1, 2] as SessionNumber[]).map((num) => {
            const session = SESSIONS[num];
            const isSelected = formData.preferred_session === num;
            return (
              <button
                key={num}
                type="button"
                onClick={() => handleChange('preferred_session', num)}
                className={`flex flex-col rounded-xl border-2 p-5 text-left transition-all ${
                  isSelected
                    ? 'border-teal-600 bg-teal-50 shadow-md shadow-teal-600/10'
                    : 'border-slate-200 bg-white hover:border-teal-300'
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
              </button>
            );
          })}
        </div>
      </div>

      {/* Required fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          label="First name"
          name="first_name"
          value={formData.first_name}
          onChange={(v) => handleChange('first_name', v)}
          required
        />
        <InputField
          label="Last name (optional)"
          name="last_name"
          value={formData.last_name}
          onChange={(v) => handleChange('last_name', v)}
        />
      </div>

      <InputField
        label="Email address"
        name="email"
        type="email"
        value={formData.email}
        onChange={(v) => handleChange('email', v)}
        required
      />

      {/* Optional fields */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          label="Business (optional)"
          name="business"
          value={formData.business}
          onChange={(v) => handleChange('business', v)}
        />
        <InputField
          label="Role (optional)"
          name="role"
          value={formData.role}
          onChange={(v) => handleChange('role', v)}
        />
      </div>

      {/* Advance question */}
      <div>
        <label htmlFor="important_question" className="mb-2 block text-base font-medium text-ink-900">
          What is the most important question, concern or opportunity your business is working through
          as AI changes customers, competitors or ways of working?
        </label>
        <p className="mb-2 text-sm text-ink-500">
          Optional. Questions submitted in advance may help shape the live session.
        </p>
        <textarea
          id="important_question"
          name="important_question"
          rows={4}
          value={formData.important_question}
          onChange={(e) => handleChange('important_question', e.target.value)}
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-ink-900 placeholder-slate-400 transition-colors focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
          placeholder="Share what is on your mind..."
        />
      </div>

      {/* Recording opt-in */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={formData.wants_recording}
            onChange={(e) => handleChange('wants_recording', e.target.checked)}
            className="mt-0.5 h-5 w-5 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
          />
          <div>
            <span className="text-base font-medium text-ink-900">
              Send me the webinar recording after the live sessions.
            </span>
            <p className="mt-1 text-sm leading-relaxed text-ink-500">
              The recording will be available only to registered attendees who select this option. Live
              Q&amp;A is available only during the live sessions.
            </p>
          </div>
        </label>
      </div>
      </div>

      {/* Workbook offer - full width */}
      <WorkbookSection
        selected={formData.wants_workbook}
        onToggle={(value) => handleChange('wants_workbook', value)}
      />

      <div className="mx-auto max-w-2xl">
      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-base text-red-700">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-700 px-6 py-4 text-base font-semibold text-white shadow-md shadow-teal-700/20 transition-all hover:bg-teal-800 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {formData.wants_workbook ? 'Redirecting to payment...' : 'Reserving your place...'}
          </>
        ) : (
          <>
            Reserve my place
            {formData.wants_workbook ? ' & pay for workbook' : ''}
          </>
        )}
      </button>
      <p className="text-center text-sm text-ink-500">
        Free webinar registration. The workbook is optional.
      </p>
      </div>
    </form>
  );
}

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}

function InputField({ label, name, value, onChange, type = 'text', required }: InputFieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-base font-medium text-ink-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-ink-900 placeholder-slate-400 transition-colors focus:border-teal-600 focus:outline-none focus:ring-1 focus:ring-teal-600"
      />
    </div>
  );
}
