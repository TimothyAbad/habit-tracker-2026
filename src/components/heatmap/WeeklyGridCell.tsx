import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { usePrimaryColor } from '@/contexts/primary-color-context';

type Props = {
  completed: boolean;
  isFuture: boolean;
  size?: number;
};

export function WeeklyGridCell({ completed, isFuture, size = 32 }: Props) {
  const { primaryColor } = usePrimaryColor();

  if (isFuture) {
    return <View style={[styles.cell, { width: size, height: size, borderRadius: 6 }]} />;
  }

  return (
    <View
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          borderRadius: 6,
          backgroundColor: completed ? primaryColor : '#E8E8E8',
        },
      ]}>
      <ThemedText
        style={[
          styles.mark,
          {
            fontSize: size * 0.42,
            color: completed ? Colors.light.background : '#A0A0A0',
          },
        ]}>
        {completed ? '✓' : '✗'}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  mark: {
    fontWeight: '700',
    lineHeight: undefined,
  },
});
