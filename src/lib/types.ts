export interface RegistrationData {
  first_name: string;
  last_name: string;
  business: string;
  role: string;
  email: string;
  important_question: string;
  preferred_session: 1 | 2;
  wants_recording: boolean;
  wants_workbook: boolean;
}

export const SESSIONS = {
  1: {
    label: 'Session 1',
    date: 'Thursday, 15 October 2026',
    time: '1:00 PM NZST',
    isoStart: '2026-10-15T13:00:00+13:00',
    isoEnd: '2026-10-15T14:00:00+13:00',
  workbookPrice: 47,
  workbookDayPrice: 99,
  liveDayDate: '2026-10-15',
  webinarLink: 'https://us06web.zoom.us/j/FutureFitNowSession1',
  calendarTitle: 'FutureFitNow: AI Business Navigation Executive Briefing',
    calendarLocation: 'Live Online (Zoom)',
  calendarDescription:
      'A practical business-strategy webinar for leaders of established businesses. ' +
      'Understand what is changing around your business as AI reshapes how customers find, compare and choose, and decide what deserves your attention now.',
  },
  2: {
    label: 'Session 2',
    date: 'Wednesday, 21 October 2026',
    time: '1:00 PM NZST',
    isoStart: '2026-10-21T13:00:00+13:00',
    isoEnd: '2026-10-21T14:00:00+13:00',
    workbookPrice: 47,
    workbookDayPrice: 99,
    liveDayDate: '2026-10-21',
    webinarLink: 'https://us06web.zoom.us/j/FutureFitNowSession2',
    calendarTitle: 'FutureFitNow: AI Business Navigation Executive Briefing',
    calendarLocation: 'Live Online (Zoom)',
    calendarDescription:
      'A practical business-strategy webinar for leaders of established businesses. ' +
      'Understand what is changing around your business as AI reshapes how customers find, compare and choose, and decide what deserves your attention now.',
  },
} as const;

export type SessionNumber = keyof typeof SESSIONS;
