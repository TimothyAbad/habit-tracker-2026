const EMOJI_MAP: { keywords: string[]; emoji: string }[] = [
  { keywords: ['candy', 'sweets', 'chocolate', 'sugar'], emoji: '🍭' },
  { keywords: ['junk food', 'fast food', 'burger', 'chips', 'snack', 'pizza', 'fries'], emoji: '🍟' },
  { keywords: ['soda', 'pop', 'cola', 'soft drink', 'coke', 'sprite', 'pepsi'], emoji: '🥤' },
  { keywords: ['walk', 'walking', 'steps', 'step'], emoji: '🚶' },
  { keywords: ['run', 'running', 'jog', 'jogging', 'sprint'], emoji: '🏃' },
  { keywords: ['gym', 'lift', 'weights', 'strength', 'workout', 'exercise', 'train', 'training'], emoji: '💪' },
  { keywords: ['swim', 'swimming', 'pool'], emoji: '🏊' },
  { keywords: ['bike', 'cycling', 'bicycle', 'cycle'], emoji: '🚴' },
  { keywords: ['yoga', 'stretch', 'stretching', 'flexibility'], emoji: '🧘' },
  { keywords: ['meditat', 'mindful', 'breathe', 'breathing'], emoji: '🧘' },
  { keywords: ['read', 'reading', 'book', 'books'], emoji: '📚' },
  { keywords: ['write', 'writing', 'journal', 'journaling', 'diary'], emoji: '✍️' },
  { keywords: ['sleep', 'rest', 'bed', 'nap'], emoji: '😴' },
  { keywords: ['water', 'hydrat', 'drink'], emoji: '💧' },
  { keywords: ['eat', 'diet', 'nutrition', 'healthy eating', 'meal', 'food'], emoji: '🥗' },
  { keywords: ['vitamin', 'supplement', 'medicine', 'medication'], emoji: '💊' },
  { keywords: ['code', 'coding', 'program', 'develop'], emoji: '💻' },
  { keywords: ['study', 'studying', 'learn', 'learning', 'homework', 'class'], emoji: '📖' },
  { keywords: ['music', 'guitar', 'piano', 'sing', 'singing', 'instrument', 'practice'], emoji: '🎵' },
  { keywords: ['draw', 'drawing', 'sketch', 'paint', 'painting', 'art'], emoji: '🎨' },
  { keywords: ['cook', 'cooking', 'meal prep', 'bake', 'baking'], emoji: '🍳' },
  { keywords: ['clean', 'cleaning', 'tidy', 'organize', 'chores'], emoji: '🧹' },
  { keywords: ['gratitude', 'grateful', 'thankful'], emoji: '🙏' },
  { keywords: ['phone', 'call', 'family', 'friend'], emoji: '📞' },
  { keywords: ['saving', 'save', 'money', 'budget', 'finance'], emoji: '💰' },
  { keywords: ['outside', 'outdoors', 'nature', 'hike', 'hiking'], emoji: '🌿' },
  { keywords: ['social', 'network', 'connect'], emoji: '🤝' },
  { keywords: ['floss', 'teeth', 'dental'], emoji: '🦷' },
  { keywords: ['skin', 'skincare', 'moisturiz'], emoji: '✨' },
  { keywords: ['photo', 'photography', 'picture'], emoji: '📷' },
  { keywords: ['pray', 'prayer', 'church', 'faith', 'spiritual'], emoji: '🙏' },
  { keywords: ['no sugar', 'no alcohol', 'no smoking', 'quit', 'sober'], emoji: '🚫' },
  { keywords: ['sport', 'soccer', 'basketball', 'tennis', 'football'], emoji: '⚽' },
  { keywords: ['smoking', 'cigarette', 'smoke'], emoji: '🚭' },
  { keywords: ['dishes', 'washing dishes', 'wash dishes', 'dishwasher'], emoji: '🍽️' },
  { keywords: ['plant', 'plants', 'water plant', 'watering', 'garden', 'gardening', 'flower'], emoji: '🪴' },
  { keywords: ['laundry', 'washing clothes', 'wash clothes', 'clothes'], emoji: '🧺' },
  { keywords: ['youtube', 'video', 'watch'], emoji: '▶️' },
];

export function suggestEmoji(name: string): string {
  const lower = name.toLowerCase();
  for (const { keywords, emoji } of EMOJI_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return emoji;
    }
  }
  return '';
}
