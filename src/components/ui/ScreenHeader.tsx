import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';

type Props = {
  title: string;
  onAdd?: () => void;
  onBack?: () => void;
};

export function ScreenHeader({ title, onAdd, onBack }: Props) {
  return (
    <View style={styles.container}>
      {onBack ? (
        <Pressable onPress={onBack} style={styles.iconButton} hitSlop={8}>
          <ThemedText style={styles.iconText}>‹</ThemedText>
        </Pressable>
      ) : (
        <View style={styles.iconButton} />
      )}

      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>

      {onAdd ? (
        <Pressable onPress={onAdd} style={styles.iconButton} hitSlop={8}>
          <ThemedText style={styles.iconText}>+</ThemedText>
        </Pressable>
      ) : (
        <View style={styles.iconButton} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.three,
    backgroundColor: Colors.light.background,
  },
  title: {
    flex: 1,
    textAlign: 'center',
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 28,
    lineHeight: 32,
    color: Colors.light.text,
  },
});
