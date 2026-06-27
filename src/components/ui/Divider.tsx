import { StyleSheet, View } from 'react-native';

import { Spacing } from '@/constants/theme';

type Props = {
  marginVertical?: number;
};

export function Divider({ marginVertical = Spacing.three }: Props) {
  return <View style={[styles.divider, { marginVertical }]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
  },
});
