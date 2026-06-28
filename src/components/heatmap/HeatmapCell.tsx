import { StyleSheet, View } from 'react-native';

import { type HeatmapLevel, type HeatmapPalette } from '@/constants/theme';

const DEFAULT_PALETTE: HeatmapPalette = ['#EBEBEB', '#BDBDBD', '#888888', '#444444', '#000000'];

type Props = {
  level: HeatmapLevel;
  size?: number;
  palette?: HeatmapPalette;
};

export function HeatmapCell({ level, size = 12, palette }: Props) {
  const activePalette = palette ?? DEFAULT_PALETTE;

  return (
    <View
      style={[
        styles.cell,
        {
          width: size,
          height: size,
          borderRadius: 3,
          backgroundColor: activePalette[level],
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
