import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import { ContributionHeatmap } from '@/components/heatmap/ContributionHeatmap';
import { ColorPicker } from '@/components/habits/ColorPicker';
import { ThemedText } from '@/components/themed-text';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { StatCard } from '@/components/ui/StatCard';
import { Divider } from '@/components/ui/Divider';
import { Colors, PRIMARY_COLORS, Spacing } from '@/constants/theme';
import { useHabitsContext } from '@/contexts/habits-context';
import { useHeatmap } from '@/hooks/use-heatmap';

export default function HabitDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const habitId = Number(id);
  const router = useRouter();
  const { habits, deleteHabit, updateHabitColor } = useHabitsContext();
  const habit = habits.find((h) => h.id === habitId);
  const { weeks, stats } = useHeatmap(habitId);

  function handleDelete() {
    if (Platform.OS === 'web') {
      if (window.confirm(`Delete "${habit?.name}"? All history will be lost.`)) {
        deleteHabit(habitId).then(() => router.back());
      }
    } else {
      Alert.alert(
        'Delete habit',
        `Delete "${habit?.name}"? All history will be lost.`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              await deleteHabit(habitId);
              router.back();
            },
          },
        ]
      );
    }
  }

  if (!habit) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={`${habit.emoji} ${habit.name}`}
        onBack={() => router.back()}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
          CONSISTENCY
        </ThemedText>

        <ContributionHeatmap weeks={weeks} palette={PRIMARY_COLORS.find((c) => c.id === habit.color)?.heatmap} />

        <Divider marginVertical={Spacing.four} />

        <View style={styles.statsRow}>
          <StatCard value={stats.currentStreak} label="Current streak" />
          <View style={styles.statGap} />
          <StatCard value={stats.longestStreak} label="Best streak" />
          <View style={styles.statGap} />
          <StatCard value={stats.totalCompletions} label="Total" />
        </View>

        <Divider marginVertical={Spacing.four} />

        <ThemedText type="smallBold" themeColor="textSecondary" style={styles.sectionLabel}>
          COLOR
        </ThemedText>
        <ColorPicker
          selected={habit.color ?? 'black'}
          onSelect={(colorId) => updateHabitColor(habitId, colorId)}
        />

        <Divider marginVertical={Spacing.four} />

        <Pressable onPress={handleDelete} style={({ pressed }) => [styles.deleteRow, pressed && styles.pressed]}>
          <ThemedText type="default" style={styles.destructiveText}>
            Delete habit
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
  sectionLabel: {
    marginBottom: Spacing.three,
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
  },
  statGap: {
    width: Spacing.two,
  },
  deleteRow: {
    paddingVertical: Spacing.three,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
  destructiveText: {
    color: '#CC0000',
  },
});
