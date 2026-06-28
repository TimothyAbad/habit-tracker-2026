import { Pressable, StyleSheet, View } from 'react-native';

import { HabitCheckbox } from './HabitCheckbox';

import { ThemedText } from '@/components/themed-text';
import { Colors, PRIMARY_COLORS, Spacing } from '@/constants/theme';
import { type Habit } from '@/db/queries';

type Props = {
  habit: Habit;
  completed: boolean;
  onToggle: () => void;
  onPress: () => void;
};

export function HabitListItem({ habit, completed, onToggle, onPress }: Props) {
  const habitColor = PRIMARY_COLORS.find((c) => c.id === habit.color)?.color ?? '#000000';

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.container, pressed && styles.pressed]}>
      <View style={styles.left}>
        <ThemedText style={styles.emoji}>{habit.emoji}</ThemedText>
        <ThemedText type="default" style={styles.name} numberOfLines={1}>
          {habit.name}
        </ThemedText>
      </View>
      <HabitCheckbox checked={completed} onPress={onToggle} color={habitColor} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    backgroundColor: Colors.light.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.light.backgroundElement,
  },
  pressed: {
    opacity: 0.6,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: Spacing.three,
    marginRight: Spacing.three,
  },
  emoji: {
    fontSize: 22,
  },
  name: {
    flex: 1,
    fontSize: 16,
  },
});
