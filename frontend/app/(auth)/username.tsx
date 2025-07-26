import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { colors } from '../../src/theme';
import { Page, Button } from '../../src/components';

export default function App() {
  const [usernameText, setUsernameText] = useState('');

  const isValid = usernameText.length >= 3 && /^[a-z0-9_]+$/.test(usernameText);

  // Check for validation errors
  const hasCapitalLetters = /[A-Z]/.test(usernameText);
  const hasSpecialChars = usernameText.length > 0 && !/^[a-zA-Z0-9_]*$/.test(usernameText);

  const handleSetUsername = () => {
    if (isValid) {
      // TODO save username to DB
      router.navigate('/tasteProfile');
    }
  };

  return (
    <Page style={styles.onboardingPage}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Choose a Username</Text>
        <Text style={styles.subtitle}>
          This will appear on your profile. You can change it later.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={usernameText}
          onChangeText={setUsernameText}
          autoCapitalize="none"
          autoCorrect={false}
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
        </View>
      </View>
      <Button
        text="Set Username"
        onPress={handleSetUsername}
        disabled={!isValid}
        style={styles.submitButton}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  onboardingPage: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 32,
    paddingRight: 32,
  },
  headerContainer: {
    marginTop: 200,
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    color: colors.secondary,
    fontFamily: 'Marcellus',
  },
  subtitle: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'PTSerif',
    textAlign: 'center',
  },
  // text input
  inputContainer: {
    marginTop: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    fontFamily: 'PTSerif',
    color: colors.text,
  },
  // submit button
  submitButton: {
    marginTop: 4,
  },
  // validation
  validationContainer: {
    marginTop: 4,
    minHeight: 40, // Reserve space for up to 2 lines of validation text
  },
  validationText: {
    fontSize: 12,
    color: colors.secondary,
    fontFamily: 'PTSerif',
    marginBottom: 4,
  },
});
