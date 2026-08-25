import type { TimetableEvent } from './timetable';

export interface CalendarDay {
  date: Date | null; // null = padding cell outside the displayed month
  events: TimetableEvent[];
  isToday: boolean;
}

// Build-time month grid, Monday-first (matches the homepage hero's week grid).
// Like the hero, "today" is a build-time snapshot — expected for a static site.
export function buildMonthGrid(events: TimetableEvent[], reference: Date = new Date()): CalendarDay[] {
  const year = reference.getFullYear();
  const month = reference.getMonth();
  const todayKey = new Date(reference).setHours(0, 0, 0, 0);

  const firstOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const leadingBlanks = (firstOfMonth.getDay() + 6) % 7; // Sun=0 -> 6, Mon=1 -> 0, ...

  const cells: CalendarDay[] = [];
  for (let i = 0; i < leadingBlanks; i++) {
    cells.push({ date: null, events: [], isToday: false });
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayEvents = events.filter(
      (e) => e.date.getFullYear() === year && e.date.getMonth() === month && e.date.getDate() === day
    );
    cells.push({ date, events: dayEvents, isToday: date.setHours(0, 0, 0, 0) === todayKey });
  }
  while (cells.length % 7 !== 0) {
    cells.push({ date: null, events: [], isToday: false });
  }
  return cells;
}

export function monthLabel(reference: Date = new Date()): string {
  return reference.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}
