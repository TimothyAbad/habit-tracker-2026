import { ScrollView, StyleSheet, View } from 'react-native';

import { HeatmapCell } from './HeatmapCell';

import { ThemedText } from '@/components/themed-text';
import { type HeatmapPalette, Spacing } from '@/constants/theme';
import { type WeekCol } from '@/hooks/use-heatmap';

const CELL_SIZE = 13;
const CELL_GAP = 3;

type Props = {
  weeks: WeekCol[];
  palette?: HeatmapPalette;
};

export function ContributionHeatmap({ weeks, palette }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.content}>
      {weeks.map((week, weekIndex) => (
        <View key={weekIndex} style={[styles.weekCol, { gap: CELL_GAP }]}>
          <ThemedText style={styles.monthLabel}>
            {week.monthLabel ?? ''}
          </ThemedText>
          {week.cells.map((cell, dayIndex) => (
            <HeatmapCell key={dayIndex} level={cell.level} size={CELL_SIZE} palette={palette} />
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    marginHorizontal: -Spacing.four,
  },
  content: {
    paddingHorizontal: Spacing.four,
    flexDirection: 'row',
    gap: CELL_GAP,
    paddingBottom: Spacing.two,
  },
  weekCol: {
    flexDirection: 'column',
  },
  monthLabel: {
    fontSize: 9,
    height: 14,
    color: '#A0A0A0',
  },
});
