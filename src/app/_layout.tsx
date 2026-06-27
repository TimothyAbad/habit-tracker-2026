import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

import { HabitsProvider } from '@/contexts/habits-context';
import { migrateDb } from '@/db/schema';

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="habits.db" onInit={migrateDb}>
      <HabitsProvider>
        <ThemeProvider value={DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="habit/[id]" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </HabitsProvider>
    </SQLiteProvider>
  );
}
