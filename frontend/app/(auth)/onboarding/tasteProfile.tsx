import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { colors } from '../../../src/theme';
import { Page, Button, KeyboardAvoidingContainer, OnboardingIcon } from '../../../src/components';
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
  const randomWine =
    flavorTextWineOptions[Math.floor(Math.random() * flavorTextWineOptions.length)];

  return (
    <Page style={styles.page}>
      <KeyboardAvoidingContainer
        footer={<Button text="Continue" onPress={handleSetFavoriteWine} disabled={!isValid} />}
        bounces={false}
      >
        <View style={styles.content}>
          <OnboardingIcon name="wine" />
          <View style={styles.headerContainer}>
            <Text style={styles.header}>What wines do you enjoy?</Text>
            <Text style={styles.subtitle}>
              Whatever comes to mind! Don't worry, you can change this anytime.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={`e.g., "Dry Napa cabs... I love ${randomWine}"`}
              placeholderTextColor={colors.textMuted}
              value={favoriteWine}
              onChangeText={setFavoriteWine}
              autoCorrect={true}
              keyboardType="default"
              multiline={true}
              numberOfLines={3}
              autoFocus
              textAlignVertical="top"
            />
            <View style={styles.validationContainer}>
              {favoriteWine.length > 0 && (
                <Text style={[styles.characterCount, !isValid && styles.characterCountError]}>
                  {favoriteWine.length} / 255
                </Text>
              )}
              {favoriteWine.length > 0 && favoriteWine.length < 3 && (
                <Text style={styles.validationText}>Must be at least 3 characters</Text>
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
  input: {
    fontSize: 18,
    fontFamily: 'PTSerif',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    paddingVertical: 12,
    color: colors.text,
    // minHeight: 100,
    lineHeight: 24,
  },
  validationContainer: {
    marginTop: 12,
    minHeight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  characterCount: {
    fontSize: 14,
    color: colors.textMuted,
    fontFamily: 'PTSerif',
    marginLeft: 'auto',
  },
  characterCountError: {
    color: colors.error,
  },
  validationText: {
    fontSize: 14,
    color: colors.error,
    fontFamily: 'PTSerif',
  },
});
