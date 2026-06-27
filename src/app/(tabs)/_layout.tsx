import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

import { Colors } from '@/constants/theme';

function TabIcon({ source, focused }: { source: number; focused: boolean }) {
  return (
    <Image
      source={source}
      style={[styles.icon, { tintColor: focused ? Colors.light.text : '#A0A0A0' }]}
    />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.text,
        tabBarInactiveTintColor: '#A0A0A0',
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require('@/assets/images/tabIcons/home.png')} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require('@/assets/images/tabIcons/dashboard.png')} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon source={require('@/assets/images/tabIcons/profile.png')} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.light.background,
    borderTopColor: '#E0E0E0',
    borderTopWidth: StyleSheet.hairlineWidth,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
  icon: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
  },
});
