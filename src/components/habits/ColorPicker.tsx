import { Pressable, StyleSheet, View } from 'react-native';

import { PRIMARY_COLORS } from '@/constants/theme';

type Props = {
  selected: string;
  onSelect: (colorId: string) => void;
};

export function ColorPicker({ selected, onSelect }: Props) {
  return (
    <View style={styles.row}>
      {PRIMARY_COLORS.map(({ id, color }) => (
        <Pressable key={id} onPress={() => onSelect(id)} style={styles.swatchWrapper}>
          <View
            style={[
              styles.swatch,
              { backgroundColor: color },
              selected === id && styles.swatchSelected,
            ]}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  swatchWrapper: {
    padding: 3,
  },
  swatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  swatchSelected: {
    borderWidth: 3,
    borderColor: '#ffffff',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
});
