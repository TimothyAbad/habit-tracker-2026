import { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { ColorPicker } from './ColorPicker';

import { ThemedText } from '@/components/themed-text';
import { Colors, Spacing } from '@/constants/theme';
import { suggestEmoji } from '@/utils/emoji-suggestions';

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, emoji: string, color: string) => Promise<void>;
};


export function AddHabitModal({ visible, onClose, onAdd }: Props) {
  const [emoji, setEmoji] = useState('');
  const [emojiEditedManually, setEmojiEditedManually] = useState(false);
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('black');
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<TextInput>(null);

  function handleEmojiChange(value: string) {
    const first = [...value][0] ?? '';
    setEmoji(first);
    setEmojiEditedManually(true);
  }

  function handleNameChange(value: string) {
    setName(value);
    if (!emojiEditedManually) {
      const suggested = suggestEmoji(value);
      if (suggested) setEmoji(suggested);
      else setEmoji('');
    }
  }

  async function handleAdd() {
    const trimmedName = name.trim();
    if (!trimmedName) {
      Alert.alert('Name required', 'Please enter a habit name.');
      return;
    }
    const finalEmoji = emoji || '⭐';
    setLoading(true);
    try {
      await onAdd(trimmedName, finalEmoji, selectedColor);
      setEmoji('');
      setName('');
      setSelectedColor('black');
      setEmojiEditedManually(false);
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.sheetWrapper}>
        <View style={styles.sheet}>
          <View style={styles.handle} />

          <ThemedText type="subtitle" style={styles.sheetTitle}>
            New Habit
          </ThemedText>

          <View style={styles.emojiRow}>
            <TextInput
              style={styles.emojiInput}
              value={emoji}
              onChangeText={handleEmojiChange}
              placeholder="⭐"
              maxLength={2}
              returnKeyType="next"
              onSubmitEditing={() => nameRef.current?.focus()}
            />
          </View>

          <TextInput
            ref={nameRef}
            style={styles.nameInput}
            value={name}
            onChangeText={handleNameChange}
            placeholder="e.g. Morning run"
            placeholderTextColor={Colors.light.textSecondary}
            returnKeyType="done"
            onSubmitEditing={handleAdd}
            autoFocus
          />

          <View style={styles.colorPickerRow}>
            <ColorPicker selected={selectedColor} onSelect={setSelectedColor} />
          </View>

          <Pressable
            onPress={handleAdd}
            disabled={loading}
            style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}>
            <ThemedText style={styles.addButtonText}>
              {loading ? 'Adding…' : 'Add Habit'}
            </ThemedText>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  sheetWrapper: {
    backgroundColor: Colors.light.background,
  },
  sheet: {
    paddingHorizontal: Spacing.four,
    paddingBottom: Spacing.six,
    paddingTop: Spacing.three,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D0D0D0',
    alignSelf: 'center',
    marginBottom: Spacing.four,
  },
  sheetTitle: {
    textAlign: 'center',
    marginBottom: Spacing.four,
  },
  emojiRow: {
    alignItems: 'center',
    marginBottom: Spacing.three,
  },
  emojiInput: {
    fontSize: 48,
    textAlign: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.backgroundElement,
  },
  nameInput: {
    borderWidth: 1,
    borderColor: Colors.light.backgroundElement,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: Spacing.three,
  },
  colorPickerRow: {
    marginBottom: Spacing.three,
  },
  addButton: {
    backgroundColor: Colors.light.text,
    borderRadius: Spacing.two,
    padding: Spacing.three,
    alignItems: 'center',
  },
  addButtonPressed: {
    opacity: 0.7,
  },
  addButtonText: {
    color: Colors.light.background,
    fontWeight: '600',
    fontSize: 16,
  },
});
