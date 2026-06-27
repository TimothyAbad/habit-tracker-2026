import { StyleSheet, View } from 'react-native';

import { HeatmapColors, type HeatmapLevel } from '@/constants/theme';

type Props = {
  level: HeatmapLevel;
  size?: number;
};

export function HeatmapCell({ level, size = 12 }: Props) {
  return (
    <View
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          borderRadius: 3,
          backgroundColor: HeatmapColors[`level${level}`],
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
