import { useSQLiteContext } from 'expo-sqlite';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import {
  type Completion,
  type Habit,
  addHabit as dbAddHabit,
  deleteAllData,
  deleteCompletion,
  deleteHabit as dbDeleteHabit,
  getCompletionsByDateRange,
  getHabits,
  insertCompletion,
  today,
  updateHabitColor as dbUpdateHabitColor,
  updateHabitEmoji,
} from '@/db/queries';
import { suggestEmoji } from '@/utils/emoji-suggestions';

type HabitsContextValue = {
  habits: Habit[];
  todayCompletions: Set<number>;
  completionVersion: number;
  addHabit: (name: string, emoji: string, color: string) => Promise<void>;
  deleteHabit: (id: number) => Promise<void>;
  toggleCompletion: (habitId: number, date: string) => Promise<void>;
  updateHabitColor: (id: number, color: string) => Promise<void>;
  resetAllData: () => Promise<void>;
  isLoaded: boolean;
};

const HabitsContext = createContext<HabitsContextValue | null>(null);

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const db = useSQLiteContext();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [todayCompletions, setTodayCompletions] = useState<Set<number>>(new Set());
  const [completionVersion, setCompletionVersion] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function load() {
      const [loadedHabits, loadedCompletions] = await Promise.all([
        getHabits(db),
        getCompletionsByDateRange(db, today(), today()),
      ]);

      // Apply emoji suggestions to all existing habits
      const updatedHabits = await Promise.all(
        loadedHabits.map(async (habit) => {
          const suggested = suggestEmoji(habit.name);
          if (suggested && suggested !== habit.emoji) {
            await updateHabitEmoji(db, habit.id, suggested);
            return { ...habit, emoji: suggested };
          }
          return habit;
        })
      );

      setHabits(updatedHabits);
      setTodayCompletions(new Set(loadedCompletions.map((c: Completion) => c.habit_id)));
      setIsLoaded(true);
    }
    load();
  }, [db]);

  const addHabit = useCallback(
    async (name: string, emoji: string, color: string) => {
      await dbAddHabit(db, name, emoji, color);
      const updated = await getHabits(db);
      setHabits(updated);
    },
    [db]
  );

  const updateHabitColor = useCallback(
    async (id: number, color: string) => {
      await dbUpdateHabitColor(db, id, color);
      setHabits((prev) => prev.map((h) => (h.id === id ? { ...h, color } : h)));
    },
    [db]
  );

  const deleteHabit = useCallback(
    async (id: number) => {
      await dbDeleteHabit(db, id);
      setHabits((prev) => prev.filter((h) => h.id !== id));
      setTodayCompletions((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
    [db]
  );

  const toggleCompletion = useCallback(
    async (habitId: number, date: string) => {
      const isToday = date === today();
      const isCompleted = isToday ? todayCompletions.has(habitId) : false;

      // Optimistic update for today
      if (isToday) {
        setTodayCompletions((prev) => {
          const next = new Set(prev);
          if (isCompleted) {
            next.delete(habitId);
          } else {
            next.add(habitId);
          }
          return next;
        });
      }

      try {
        if (isCompleted) {
          await deleteCompletion(db, habitId, date);
        } else {
          await insertCompletion(db, habitId, date);
        }
        setCompletionVersion((v) => v + 1);
      } catch {
        // Revert optimistic update on error
        if (isToday) {
          setTodayCompletions((prev) => {
            const next = new Set(prev);
            if (isCompleted) {
              next.add(habitId);
            } else {
              next.delete(habitId);
            }
            return next;
          });
        }
      }
    },
    [db, todayCompletions]
  );

  const resetAllData = useCallback(async () => {
    await deleteAllData(db);
    setHabits([]);
    setTodayCompletions(new Set());
  }, [db]);

  return (
    <HabitsContext.Provider
      value={{ habits, todayCompletions, completionVersion, addHabit, deleteHabit, toggleCompletion, updateHabitColor, resetAllData, isLoaded }}>
      {children}
    </HabitsContext.Provider>
  );
}

export function useHabitsContext(): HabitsContextValue {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error('useHabitsContext must be used inside HabitsProvider');
  return ctx;
}
