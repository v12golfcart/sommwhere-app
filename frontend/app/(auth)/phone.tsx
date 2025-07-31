import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../src/theme';
import {
  Page,
  Button,
  KeyboardAvoidingContainer,
  OnboardingIcon,
  TextInput,
} from '../../src/components';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function PhoneNumber() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');

  // Basic US phone validation (10 digits)
  const isValidPhone = phoneNumber.replace(/\D/g, '').length === 10;

  const handleContinue = () => {
    // Mock OTP send
    console.log('Sending OTP to:', phoneNumber);
    router.push('/otp');
  };

  return (
    <Page style={styles.page}>
      <KeyboardAvoidingContainer
        footer={<Button text="Continue" onPress={handleContinue} disabled={!isValidPhone} />}
        bounces={false}
      >
        <View style={styles.content}>
          <OnboardingIcon name="call" />
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Enter your phone number</Text>
            <Text style={styles.subtitle}>We'll text you a verification code</Text>
          </View>

          <TextInput
            placeholder="(555) 123-4567"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            // autoFocus
            maxLength={14}
          />
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
});
