import { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../../src/theme';
import { Page, Button, KeyboardAvoidingContainer, OnboardingIcon, TextInput } from '../../../src/components';
import { useAuthStore } from '../../../src/stores/authStore';

export default function OnboardingUsername() {
  const router = useRouter();
  const [usernameText, setUsernameText] = useState('');

  const isValid = usernameText.length >= 3 && /^[a-z0-9_]+$/.test(usernameText);

  // Check for validation errors
  const hasCapitalLetters = /[A-Z]/.test(usernameText);
  const hasSpecialChars = usernameText.length > 0 && !/^[a-zA-Z0-9_]*$/.test(usernameText);

  const setUsername = useAuthStore((state) => state.setUsername);
  const user = useAuthStore((state) => state.user);

  const handleSetUsername = () => {
    if (isValid) {
      setUsername(usernameText);

      // TODO save username to DB
      router.navigate('/onboarding/tasteProfile');
    }
  };

  return (
    <Page style={styles.page}>
      <KeyboardAvoidingContainer
        footer={
          <Button
            text="Continue"
            onPress={handleSetUsername}
            disabled={!isValid}
          />
        }
        bounces={false}
      >
        <View style={styles.content}>
          <OnboardingIcon name="person" />
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Choose a username</Text>
            <Text style={styles.subtitle}>
              This will appear on your profile. You can change it later.
            </Text>
          </View>
          
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="username"
              value={usernameText}
              onChangeText={setUsernameText}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              autoFocus
            />
            <View style={styles.validationContainer}>
              {hasCapitalLetters && (
                <Text style={styles.validationText}>• No capital letters allowed</Text>
              )}
              {hasSpecialChars && (
                <Text style={styles.validationText}>
                  • Only letters, numbers, and underscores allowed
                </Text>
              )}
              {usernameText.length > 0 && usernameText.length < 3 && (
                <Text style={styles.validationText}>• Must be at least 3 characters</Text>
              )}
            </View>
          </View>
        </View>
      </KeyboardAvoidingContainer>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  headerContainer: {
    marginBottom: 32,
  },
  header: {
    fontSize: 28,
    color: colors.text,
    fontFamily: 'Marcellus',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textMuted,
    fontFamily: 'PTSerif',
  },
  inputContainer: {
    width: '100%',
  },
  validationContainer: {
    marginTop: 12,
    minHeight: 60, // Reserve space for validation messages
  },
  validationText: {
    fontSize: 14,
    color: colors.error,
    fontFamily: 'PTSerif',
    marginBottom: 4,
  },
});
