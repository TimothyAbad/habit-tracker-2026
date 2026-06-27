import { type SQLiteDatabase } from 'expo-sqlite';

export const CREATE_HABITS_TABLE = `
  CREATE TABLE IF NOT EXISTS habits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    emoji TEXT NOT NULL DEFAULT '✅',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (date('now'))
  );
`;

export const CREATE_COMPLETIONS_TABLE = `
  CREATE TABLE IF NOT EXISTS completions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_id INTEGER NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
    date TEXT NOT NULL,
    UNIQUE(habit_id, date)
  );
`;

export const CREATE_SETTINGS_TABLE = `
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );
`;

export async function migrateDb(db: SQLiteDatabase) {
  await db.execAsync(CREATE_HABITS_TABLE);
  await db.execAsync(CREATE_COMPLETIONS_TABLE);
  await db.execAsync(CREATE_SETTINGS_TABLE);
  await db.execAsync('PRAGMA foreign_keys = ON;');
}
