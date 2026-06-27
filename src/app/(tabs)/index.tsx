import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { AddHabitModal } from '@/components/habits/AddHabitModal';
import { EmptyState } from '@/components/habits/EmptyState';
import { HabitListItem } from '@/components/habits/HabitListItem';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Colors } from '@/constants/theme';
import { useHabitsContext } from '@/contexts/habits-context';
import { today as getToday } from '@/db/queries';

export default function HomeScreen() {
  const { habits, todayCompletions, toggleCompletion, addHabit } = useHabitsContext();
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  const todayStr = getToday();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Hello"
        onAdd={() => setModalVisible(true)}
      />

      <FlatList
        data={habits}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <HabitListItem
            habit={item}
            completed={todayCompletions.has(item.id)}
            onToggle={() => toggleCompletion(item.id, todayStr)}
            onPress={() => router.push({ pathname: '/habit/[id]', params: { id: item.id } })}
          />
        )}
        ListEmptyComponent={<EmptyState />}
        contentContainerStyle={habits.length === 0 ? styles.emptyContent : undefined}
        style={styles.list}
      />

      <AddHabitModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAdd={addHabit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  list: {
    flex: 1,
  },
  emptyContent: {
    flex: 1,
  },
});
