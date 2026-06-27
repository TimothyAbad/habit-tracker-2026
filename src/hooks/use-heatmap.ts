import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';

import { type HeatmapLevel } from '@/constants/theme';
import { getCompletionsForHabit, today } from '@/db/queries';

export type HeatmapCell = {
  date: string;
  level: HeatmapLevel;
};

export type WeekCol = {
  monthLabel: string | null;
  cells: HeatmapCell[];
};

function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function useHeatmap(habitId: number) {
  const db = useSQLiteContext();
  const [weeks, setWeeks] = useState<WeekCol[]>([]);
  const [stats, setStats] = useState({ currentStreak: 0, longestStreak: 0, totalCompletions: 0 });

  useEffect(() => {
    async function load() {
      const todayStr = today();
      const now = new Date();

      // Query from beginning of current month for display + stats
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const startStr = toDateString(monthStart);

      const completions = await getCompletionsForHabit(db, habitId, startStr, todayStr);
      const completedDates = new Set(completions.map((c) => c.date));

      // Build week columns: start at the Sunday on or before the 1st of this month
      const startSunday = new Date(monthStart);
      startSunday.setDate(monthStart.getDate() - monthStart.getDay());

      const allWeeks: WeekCol[] = [];
      const weekCursor = new Date(startSunday);

      while (toDateString(weekCursor) <= todayStr) {
        let monthLabel: string | null = null;
        const cells: HeatmapCell[] = [];

        for (let d = 0; d < 7; d++) {
          const cellDate = new Date(weekCursor);
          cellDate.setDate(weekCursor.getDate() + d);
          const dateStr = toDateString(cellDate);

          // Show month label on the first day of the month
          if (cellDate.getDate() === 1) {
            monthLabel = MONTH_LABELS[cellDate.getMonth()];
          }

          const level: HeatmapLevel = completedDates.has(dateStr) ? 4 : 0;
          cells.push({ date: dateStr, level });
        }

        allWeeks.push({ monthLabel, cells });
        weekCursor.setDate(weekCursor.getDate() + 7);
      }

      setWeeks(allWeeks);

      // Stats: current streak (backwards from today)
      let currentStreak = 0;
      const check = new Date(now);
      while (completedDates.has(toDateString(check))) {
        currentStreak++;
        check.setDate(check.getDate() - 1);
      }

      // Longest streak
      const sortedDates = [...completedDates].sort();
      let longestStreak = 0;
      let streak = 0;
      let prev: Date | null = null;
      for (const d of sortedDates) {
        const curr = new Date(d);
        if (prev) {
          const diff = (curr.getTime() - prev.getTime()) / 86400000;
          streak = diff === 1 ? streak + 1 : 1;
        } else {
          streak = 1;
        }
        longestStreak = Math.max(longestStreak, streak);
        prev = curr;
      }

      setStats({ currentStreak, longestStreak, totalCompletions: completedDates.size });
    }

    load();
  }, [db, habitId]);

  return { weeks, stats };
}
