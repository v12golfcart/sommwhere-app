import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors } from '../../../src/theme';
import { Page, Button } from '../../../src/components';
import { useAuthStore } from '../../../src/stores/authStore';

export default function OnboardingTasteProfile() {
  const [favoriteWine, setFavoriteWine] = useState('');
  const setTasteProfile = useAuthStore((state) => state.setTasteProfile);
  const user = useAuthStore((state) => state.user);

  const handleSetFavoriteWine = () => {
    setTasteProfile(favoriteWine);

    // TODO save favorite wine to DB
    router.navigate('/capture');
  };

  const isValid = favoriteWine.length >= 3 && favoriteWine.length <= 255;

  const flavorTextWineOptions = ['Heitz', 'Austin Hope', "Stag's Leap", 'Opus One'];

  return (
    <Page style={styles.onboardingPage}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoid}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Favorite type of wine?</Text>
          <Text style={styles.subtitle}>
            Whatever comes to mind! Don't worry...{'\n'} you'll change this often.
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={`Dry napa cabs...I LOVE ${flavorTextWineOptions[Math.floor(Math.random() * flavorTextWineOptions.length)]}`}
            value={favoriteWine}
            onChangeText={setFavoriteWine}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            multiline={true}
            numberOfLines={4}
          />
        </View>
        <View style={styles.validationContainer}>
          {favoriteWine.length > 100 && (
            <Text style={[styles.validationText, isValid ? {} : styles.validationTextError]}>
              {favoriteWine.length} / 255
            </Text>
          )}
        </View>
        <Button
          text="Set Favorite Wine"
          onPress={handleSetFavoriteWine}
          disabled={!isValid}
          style={styles.submitButton}
        />
      </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
    width: '100%',
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
  // validation
  validationContainer: {
    marginTop: 4,
    minHeight: 20, // Reserve space for up to 2 lines of validation text
  },
  validationText: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'PTSerif',
    marginBottom: 4,
    textAlign: 'right',
  },
  validationTextError: {
    color: colors.error,
  },
  // submit button
  submitButton: {
    marginTop: 20,
  },
});
