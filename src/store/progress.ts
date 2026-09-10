import { create } from "zustand";
import { persist } from "zustand/middleware";

export function hourKey(week: number, hour: 1 | 2) {
  return `${week}-${hour}`;
}

type ProgressState = {
  done: Record<string, boolean>;
  notes: Record<string, string>;
  bookmarks: Record<number, boolean>;
  toggleDone: (week: number, hour: 1 | 2) => void;
  setNote: (week: number, hour: 1 | 2, note: string) => void;
  toggleBookmark: (week: number) => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      done: {},
      notes: {},
      bookmarks: {},
      toggleDone: (week, hour) =>
        set((s) => {
          const k = hourKey(week, hour);
          return { done: { ...s.done, [k]: !s.done[k] } };
        }),
      setNote: (week, hour, note) =>
        set((s) => ({ notes: { ...s.notes, [hourKey(week, hour)]: note } })),
      toggleBookmark: (week) =>
        set((s) => ({ bookmarks: { ...s.bookmarks, [week]: !s.bookmarks[week] } })),
    }),
    { name: "robotik-atolye-progress" },
  ),
);
