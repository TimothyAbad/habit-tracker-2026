import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { AddHabitModal } from '@/components/habits/AddHabitModal';
import { EmptyState } from '@/components/habits/EmptyState';
import { WeeklyGrid } from '@/components/heatmap/WeeklyGrid';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Colors, Spacing } from '@/constants/theme';
import { useHabitsContext } from '@/contexts/habits-context';
import { useWeekGrid } from '@/hooks/use-week-grid';

export default function DashboardScreen() {
  const { habits, todayCompletions, addHabit } = useHabitsContext();
  const { rows, weekDates } = useWeekGrid(habits);
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const weekStats = useMemo(() => {
    if (rows.length === 0) return { pct: 0, streak: 0 };
    let completedCount = 0;
    let pastCount = 0;
    for (const row of rows) {
      for (const day of row.days) {
        if (!day.isFuture) {
          pastCount++;
          if (day.completed) completedCount++;
        }
      }
    }
    const pct = pastCount > 0 ? Math.round((completedCount / pastCount) * 100) : 0;
    return { pct };
  }, [rows]);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Dashboard" onAdd={() => setModalVisible(true)} />

      {habits.length === 0 ? (
        <EmptyState message="No habits yet.\nTap + to start tracking." />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          <WeeklyGrid
            rows={rows}
            weekDates={weekDates}
            onHabitPress={(id) =>
              router.push({ pathname: '/habit/[id]', params: { id } })
            }
          />

          <View style={styles.statsRow}>
            <StatCard value={`${weekStats.pct}%`} label="This week" />
            <View style={styles.statGap} />
            <StatCard value={habits.length} label="Habits" />
            <View style={styles.statGap} />
            <StatCard value={todayCompletions.size} label="Today" />
          </View>
        </ScrollView>
      )}

      <AddHabitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addHabit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    paddingBottom: Spacing.six,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.four,
    marginTop: Spacing.four,
  },
  statGap: {
    width: Spacing.two,
  },
});
