import { type SQLiteDatabase } from 'expo-sqlite';

export type Habit = {
  id: number;
  name: string;
  emoji: string;
  sort_order: number;
  created_at: string;
};

export type Completion = {
  id: number;
  habit_id: number;
  date: string;
};

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export async function getHabits(db: SQLiteDatabase): Promise<Habit[]> {
  return db.getAllAsync<Habit>('SELECT * FROM habits ORDER BY sort_order ASC, id ASC');
}

export async function addHabit(db: SQLiteDatabase, name: string, emoji: string): Promise<void> {
  await db.runAsync('INSERT INTO habits (name, emoji) VALUES (?, ?)', name, emoji);
}

export async function deleteHabit(db: SQLiteDatabase, id: number): Promise<void> {
  await db.runAsync('DELETE FROM habits WHERE id = ?', id);
}

export async function getCompletionsByDateRange(
  db: SQLiteDatabase,
  startDate: string,
  endDate: string
): Promise<Completion[]> {
  return db.getAllAsync<Completion>(
    'SELECT * FROM completions WHERE date >= ? AND date <= ?',
    startDate,
    endDate
  );
}

export async function getCompletionsForHabit(
  db: SQLiteDatabase,
  habitId: number,
  startDate: string,
  endDate: string
): Promise<Completion[]> {
  return db.getAllAsync<Completion>(
    'SELECT * FROM completions WHERE habit_id = ? AND date >= ? AND date <= ?',
    habitId,
    startDate,
    endDate
  );
}

export async function insertCompletion(
  db: SQLiteDatabase,
  habitId: number,
  date: string
): Promise<void> {
  await db.runAsync(
    'INSERT OR IGNORE INTO completions (habit_id, date) VALUES (?, ?)',
    habitId,
    date
  );
}

export async function deleteCompletion(
  db: SQLiteDatabase,
  habitId: number,
  date: string
): Promise<void> {
  await db.runAsync('DELETE FROM completions WHERE habit_id = ? AND date = ?', habitId, date);
}

export async function updateHabitEmoji(db: SQLiteDatabase, id: number, emoji: string): Promise<void> {
  await db.runAsync('UPDATE habits SET emoji = ? WHERE id = ?', emoji, id);
}

export async function deleteAllData(db: SQLiteDatabase): Promise<void> {
  await db.runAsync('DELETE FROM completions');
  await db.runAsync('DELETE FROM habits');
}
