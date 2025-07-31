import {
  StyleSheet,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../src/components';
import { colors } from '../../../src/theme';
import { useAuthStore } from '../../../src/stores/authStore';

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const user = useAuthStore((state) => state.user);
  const tasteProfile = user?.tasteProfile || '';

  if (!photoUri) {
    router.back();
    return null;
  }

  return (
    <Page style={styles.page} edges={['top', 'left', 'right']} backgroundColor="black">
      <Image source={{ uri: photoUri }} style={styles.absoluteFillObject} resizeMode="contain" />

      {/* Input Bar */}
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? insets.bottom + 25 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.icon}>
            <Ionicons name="sparkles" size={24} color={colors.textMuted} />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Tell me about this wine..."
            placeholderTextColor="rgba(255,255,255,0.5)"
            defaultValue={tasteProfile}
            multiline
            maxLength={500}
          />
        </View>
      </KeyboardAvoidingView>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  absoluteFillObject: {
    position: 'absolute',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  keyboardAvoid: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 120,
  },
  input: {
    flex: 1,
    color: colors.surface,
    fontSize: 16,
    fontFamily: 'PTSerif',
    marginLeft: 4,
  },
  icon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
