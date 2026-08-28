// UBCO's academic year runs September to August. Matches the label format
// already used in execs' `term` field (e.g. "2024-2025") and photos' `year`.
export function academicYearOf(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0 = January, 8 = September
  const startYear = month >= 8 ? year : year - 1;
  return `${startYear}-${startYear + 1}`;
}
