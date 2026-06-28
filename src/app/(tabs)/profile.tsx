import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import { Alert, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { Divider } from '@/components/ui/Divider';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatCard } from '@/components/ui/StatCard';
import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import { useHabitsContext } from '@/contexts/habits-context';

type AggregateStats = {
  totalHabits: number;
  totalCompletions: number;
  bestStreak: number;
};

export default function ProfileScreen() {
  const db = useSQLiteContext();
  const { habits, resetAllData } = useHabitsContext();
  const [stats, setStats] = useState<AggregateStats>({
    totalHabits: 0,
    totalCompletions: 0,
    bestStreak: 0,
  });

  useEffect(() => {
    async function loadStats() {
      const result = await db.getFirstAsync<{ count: number }>(
        'SELECT COUNT(*) as count FROM completions'
      );
      const totalCompletions = result?.count ?? 0;

      // Compute best streak across all habits
      const completions = await db.getAllAsync<{ date: string }>(
        'SELECT DISTINCT date FROM completions ORDER BY date ASC'
      );

      let bestStreak = 0;
      let streak = 0;
      let prevDate: string | null = null;

      for (const { date } of completions) {
        if (prevDate) {
          const prev = new Date(prevDate);
          const curr = new Date(date);
          const diff = (curr.getTime() - prev.getTime()) / 86400000;
          streak = diff === 1 ? streak + 1 : 1;
        } else {
          streak = 1;
        }
        bestStreak = Math.max(bestStreak, streak);
        prevDate = date;
      }

      setStats({
        totalHabits: habits.length,
        totalCompletions,
        bestStreak,
      });
    }

    loadStats();
  }, [db, habits]);

  function handleReset() {
    if (Platform.OS === 'web') {
      if (window.confirm('This will permanently delete all habits and completion history. This cannot be undone.')) {
        resetAllData();
      }
    } else {
      Alert.alert(
        'Reset all data',
        'This will permanently delete all habits and completion history. This cannot be undone.',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Reset', style: 'destructive', onPress: resetAllData },
        ]
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Profile" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.statsRow}>
          <StatCard value={stats.totalHabits} label="Habits" />
          <View style={styles.statGap} />
          <StatCard value={stats.totalCompletions} label="Completions" />
          <View style={styles.statGap} />
          <StatCard value={stats.bestStreak} label="Best streak" />
        </View>

        <Divider marginVertical={Spacing.four} />

        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
          SETTINGS
        </ThemedText>

        <Pressable onPress={handleReset} style={({ pressed }) => [styles.settingRow, pressed && styles.pressed]}>
          <ThemedText type="default" style={styles.destructiveText}>
            Reset all data
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            Delete habits & history
          </ThemedText>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.six,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: Spacing.two,
  },
  statGap: {
    width: Spacing.two,
  },
  sectionLabel: {
    marginBottom: Spacing.two,
    letterSpacing: 0.5,
  },
  settingRow: {
    paddingVertical: Spacing.three,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.light.backgroundElement,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.6,
  },
  destructiveText: {
    color: '#CC0000',
  },
});
