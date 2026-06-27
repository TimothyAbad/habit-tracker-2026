/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#000000',
    background: '#ffffff',
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
  },
  dark: {
    text: '#ffffff',
    background: '#000000',
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

export const HeatmapColors = {
  level0: '#F0F0F0',
  level1: '#C0C0C0',
  level2: '#909090',
  level3: '#505050',
  level4: '#000000',
} as const;

export type HeatmapLevel = 0 | 1 | 2 | 3 | 4;

export type HeatmapPalette = [string, string, string, string, string];

export const PRIMARY_COLORS = [
  {
    id: 'black',
    label: 'Ink',
    color: '#000000',
    heatmap: ['#EBEBEB', '#BDBDBD', '#888888', '#444444', '#000000'] as HeatmapPalette,
  },
  {
    id: 'indigo',
    label: 'Indigo',
    color: '#4F46E5',
    heatmap: ['#EBEBEB', '#C4C2F5', '#9290EC', '#6B67E8', '#4F46E5'] as HeatmapPalette,
  },
  {
    id: 'emerald',
    label: 'Emerald',
    color: '#059669',
    heatmap: ['#EBEBEB', '#A7EDD0', '#4EC9A3', '#15A875', '#059669'] as HeatmapPalette,
  },
  {
    id: 'rose',
    label: 'Rose',
    color: '#E11D48',
    heatmap: ['#EBEBEB', '#FECDD3', '#FB7185', '#F43F5E', '#E11D48'] as HeatmapPalette,
  },
  {
    id: 'amber',
    label: 'Amber',
    color: '#D97706',
    heatmap: ['#EBEBEB', '#FDE68A', '#FBBF24', '#F59E0B', '#D97706'] as HeatmapPalette,
  },
] as const;

export type PrimaryColorId = (typeof PRIMARY_COLORS)[number]['id'];
