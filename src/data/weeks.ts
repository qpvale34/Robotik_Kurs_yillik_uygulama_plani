import type { WeekPlan } from "./types";
import { WEEKS_01_08 } from "./weeks-01-08";
import { WEEK_DATES } from "./calendar";

export const ALL_WEEKS: WeekPlan[] = [...WEEKS_01_08];

export function getWeek(n: number): WeekPlan | undefined {
  return ALL_WEEKS.find((w) => w.week === n);
}

export function weeksBySemester(sem: 1 | 2): WeekPlan[] {
  return ALL_WEEKS.filter((w) => w.semester === sem);
}

export const UNIT_INDEX = (() => {
  const map = new Map<string, number[]>();
  for (const w of ALL_WEEKS) {
    const list = map.get(w.unit) ?? [];
    list.push(w.week);
    map.set(w.unit, list);
  }
  return [...map.entries()].map(([unit, weeks]) => ({ unit, weeks }));
})();

export function dateFor(week: number): string {
  return WEEK_DATES.find((d) => d.week === week)?.dates ?? "";
}
