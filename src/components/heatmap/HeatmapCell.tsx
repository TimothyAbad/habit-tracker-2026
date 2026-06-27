import { StyleSheet, View } from 'react-native';

import { type HeatmapLevel } from '@/constants/theme';
import { usePrimaryColor } from '@/contexts/primary-color-context';

type Props = {
  level: HeatmapLevel;
  size?: number;
};

export function HeatmapCell({ level, size = 12 }: Props) {
  const { heatmapPalette } = usePrimaryColor();

  return (
    <View
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          borderRadius: 3,
          backgroundColor: heatmapPalette[level],
          borderWidth: level === 0 ? StyleSheet.hairlineWidth : 0,
          borderColor: '#D8D8D8',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  cell: {},
});
