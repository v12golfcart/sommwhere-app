import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

interface Props {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  backgroundColor?: string;
}

export default function OnboardingIcon({ name, size = 32, backgroundColor = colors.tertiary }: Props) {
  return (
    <View style={[styles.iconBg, { backgroundColor }]}>
      <Ionicons name={name} size={size} color={colors.background} />
    </View>
  );
}

const styles = StyleSheet.create({
  iconBg: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginBottom: 16,
  },
});