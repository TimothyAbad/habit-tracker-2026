import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type Props = {
  message?: string;
};

export function EmptyState({ message = 'No habits yet.\nTap + to add your first habit.' }: Props) {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.icon}>○</ThemedText>
      <ThemedText type="default" themeColor="textSecondary" style={styles.message}>
        {message}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.six,
    gap: Spacing.three,
  },
  icon: {
    fontSize: 40,
    color: '#D0D0D0',
  },
  message: {
    textAlign: 'center',
    lineHeight: 22,
  },
});
