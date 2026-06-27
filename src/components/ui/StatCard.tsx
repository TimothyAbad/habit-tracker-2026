import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';

type Props = {
  value: string | number;
  label: string;
};

export function StatCard({ value, label }: Props) {
  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.value}>
        {value}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary" style={styles.label}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.three,
    backgroundColor: Colors.light.backgroundElement,
    borderRadius: Spacing.two,
  },
  value: {
    fontSize: 24,
    lineHeight: 28,
  },
  label: {
    marginTop: Spacing.one,
    textAlign: 'center',
  },
});
