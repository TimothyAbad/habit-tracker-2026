import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { WeeklyGridCell } from './WeeklyGridCell';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import { type HabitRow } from '@/hooks/use-week-grid';

const CELL_SIZE = 32;
const CELL_GAP = 6;
const LABEL_WIDTH = 90;

type Props = {
  rows: HabitRow[];
  weekDates: { date: string; label: string }[];
  onHabitPress?: (habitId: number) => void;
};

export function WeeklyGrid({ rows, weekDates, onHabitPress }: Props) {
  return (
    <View style={styles.container}>
      {/* Day labels header */}
      <View style={styles.headerRow}>
        <View style={{ width: LABEL_WIDTH }} />
        {weekDates.map(({ date, label }) => (
          <View key={date} style={[styles.dayLabel, { width: CELL_SIZE }]}>
            <ThemedText type="small" themeColor="textSecondary" style={styles.dayText}>
              {label}
            </ThemedText>
          </View>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {rows.map(({ habit, days }) => (
          <Pressable
            key={habit.id}
            onPress={() => onHabitPress?.(habit.id)}
            style={({ pressed }) => [styles.habitRow, pressed && styles.pressed]}>
            <View style={[styles.habitLabel, { width: LABEL_WIDTH }]}>
              <ThemedText style={styles.emoji}>{habit.emoji}</ThemedText>
              <ThemedText type="small" numberOfLines={1} style={styles.habitName}>
                {habit.name}
              </ThemedText>
            </View>
            {days.map((day) => (
              <WeeklyGridCell
                key={day.date}
                completed={day.completed}
                isFuture={day.isFuture}
                size={CELL_SIZE}
              />
            ))}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.four,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CELL_GAP,
    marginBottom: Spacing.two,
  },
  dayLabel: {
    alignItems: 'center',
  },
  dayText: {
    fontSize: 11,
  },
  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: CELL_GAP,
    paddingVertical: CELL_GAP / 2,
  },
  pressed: {
    opacity: 0.6,
  },
  habitLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.one,
  },
  emoji: {
    fontSize: 16,
  },
  habitName: {
    flex: 1,
    color: Colors.light.text,
    fontSize: 12,
  },
});
