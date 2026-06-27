import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';

import { useHabitsContext } from '@/contexts/habits-context';
import { type Habit, getCompletionsByDateRange, today } from '@/db/queries';

export type DayCell = {
  date: string;
  dayLabel: string;
  completed: boolean;
  isFuture: boolean;
};

export type HabitRow = {
  habit: Habit;
  days: DayCell[];
};

function getMonday(d: Date): Date {
  const day = d.getDay();
  const diff = (day + 6) % 7; // 0=Mon offset
  const monday = new Date(d);
  monday.setDate(d.getDate() - diff);
  return monday;
}

function toDateString(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const DAY_LABELS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export function useWeekGrid(habits: Habit[]) {
  const db = useSQLiteContext();
  const { completionVersion } = useHabitsContext();
  const [rows, setRows] = useState<HabitRow[]>([]);
  const [weekDates, setWeekDates] = useState<{ date: string; label: string }[]>([]);

  useEffect(() => {
    async function load() {
      const now = new Date();
      const monday = getMonday(now);
      const todayStr = today();

      const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return { date: toDateString(d), label: DAY_LABELS[i] };
      });

      setWeekDates(dates);

      if (habits.length === 0) {
        setRows([]);
        return;
      }

      const startDate = dates[0].date;
      const endDate = dates[6].date;
      const completions = await getCompletionsByDateRange(db, startDate, endDate);

      const completionSet = new Set(
        completions.map((c) => `${c.habit_id}:${c.date}`)
      );

      const newRows: HabitRow[] = habits.map((habit) => ({
        habit,
        days: dates.map(({ date, label }) => ({
          date,
          dayLabel: label,
          completed: completionSet.has(`${habit.id}:${date}`),
          isFuture: date > todayStr,
        })),
      }));

      setRows(newRows);
    }

    load();
  }, [db, habits, completionVersion]);

  return { rows, weekDates };
}
