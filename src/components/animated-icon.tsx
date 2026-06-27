import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';

const INITIAL_SCALE_FACTOR = Dimensions.get('screen').height / 90;
const DURATION = 600;

export function AnimatedSplashOverlay() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), DURATION + 100);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const splashKeyframe = new Keyframe({
    0: { transform: [{ scale: INITIAL_SCALE_FACTOR }], opacity: 1 },
    20: { opacity: 1 },
    70: { opacity: 0, easing: Easing.elastic(0.7) },
    100: { opacity: 0, transform: [{ scale: 1 }], easing: Easing.elastic(0.7) },
  });

  return (
    <Animated.View
      entering={splashKeyframe.duration(DURATION)}
      style={styles.backgroundSolidColor}
    />
  );
}

export function AnimatedIcon() {
  return (
    <View style={styles.iconContainer}>
      <View style={styles.background} />
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require('@/assets/images/expo-logo.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 128,
    zIndex: 100,
  },
  image: {
    position: 'absolute',
    width: 76,
    height: 71,
  },
  background: {
    borderRadius: 40,
    backgroundColor: '#0274DF',
    width: 128,
    height: 128,
    position: 'absolute',
  },
  backgroundSolidColor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#208AEF',
    zIndex: 1000,
  },
});
