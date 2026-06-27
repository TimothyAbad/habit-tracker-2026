import { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Colors } from '@/constants/theme';

type Props = {
  checked: boolean;
  onPress: () => void;
  size?: number;
};

export function HabitCheckbox({ checked, onPress, size = 28 }: Props) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(checked ? 1.1 : 1, { damping: 12, stiffness: 200 }, () => {
      scale.value = withSpring(1, { damping: 12, stiffness: 200 });
    });
  }, [checked, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable onPress={onPress} hitSlop={8}>
      <Animated.View
        style={[
          styles.circle,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: checked ? Colors.light.text : Colors.light.background,
            borderColor: checked ? Colors.light.text : '#C0C0C0',
          },
          animatedStyle,
        ]}>
        {checked && (
          <View
            style={{
              width: size * 0.38,
              height: size * 0.22,
              borderLeftWidth: 2,
              borderBottomWidth: 2,
              borderColor: Colors.light.background,
              transform: [{ rotate: '-45deg' }],
              marginTop: -(size * 0.04),
            }}
          />
        )}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
