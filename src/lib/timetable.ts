// Build-time layout math for the homepage hero's timetable grid (Section 8.2).
// Pure functions, no client JS — Astro computes grid placement once, at build time,
// and the result is plain CSS Grid. "Current week" is therefore a build-time snapshot,
// which is expected for a static site rebuilt on a normal content-update cadence.

export interface TimetableEvent {
  title: string;
  date: Date;
  end?: Date;
  location: string;
  type: string;
  href?: string;
}

export interface PlacedEvent {
  event: TimetableEvent;
  dayIndex: number; // 0 = Monday .. 6 = Sunday
  rowStart: number; // 1-based, relative to HOUR_START
  rowSpan: number;
  isPast: boolean;
}

export const HOUR_START = 8; // 8am
export const HOUR_END = 21; // 9pm
export const HOUR_ROWS = HOUR_END - HOUR_START; // number of 1-hour rows

export function getWeekStart(reference: Date): Date {
  const day = reference.getDay(); // 0 = Sunday
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const monday = new Date(reference);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(reference.getDate() + diffToMonday);
  return monday;
}

export function layoutWeek(events: TimetableEvent[], now: Date = new Date()): PlacedEvent[] {
  const weekStart = getWeekStart(now);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 7);

  return events
    .filter((e) => e.date >= weekStart && e.date < weekEnd)
    .map((event) => {
      const dayIndex = (event.date.getDay() + 6) % 7; // Monday = 0
      const startHour = event.date.getHours() + event.date.getMinutes() / 60;
      const clampedStart = Math.min(Math.max(startHour, HOUR_START), HOUR_END - 1);
      const rowStart = Math.round(clampedStart - HOUR_START) + 1;

      const durationHours = event.end
        ? Math.max((event.end.getTime() - event.date.getTime()) / 3_600_000, 1)
        : 1;
      const rowSpan = Math.max(Math.round(Math.min(durationHours, HOUR_END - clampedStart)), 1);

      return {
        event,
        dayIndex,
        rowStart,
        rowSpan,
        isPast: event.date < now,
      };
    });
}

export function weekDayLabels(now: Date = new Date()): { short: string; date: Date; isToday: boolean }[] {
  const weekStart = getWeekStart(now);
  const todayKey = new Date(now).setHours(0, 0, 0, 0);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return {
      short: date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      date,
      isToday: date.setHours(0, 0, 0, 0) === todayKey,
    };
  });
}
