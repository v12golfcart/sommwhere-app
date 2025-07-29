import { StyleSheet, Text, View, TextInput } from 'react-native';
import { colors } from '../../src/theme';
import { Page, Button, KeyboardAvoidingContainer } from '../../src/components';
import { router } from 'expo-router';
import { useState } from 'react';

export default function PhoneNumber() {
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
        footer={
          <Button 
            text="Continue" 
            onPress={handleContinue}
            disabled={!isValidPhone}
          />
        }
        bounces={false}
      >
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Enter your phone number</Text>
            <Text style={styles.subtitle}>We'll text you a verification code</Text>
          </View>
          
          <TextInput
            style={styles.input}
            placeholder="(555) 123-4567"
            placeholderTextColor={colors.textMuted}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoFocus
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
  input: {
    fontSize: 24,
    fontFamily: 'PTSerif',
    borderBottomWidth: 2,
    borderBottomColor: colors.border,
    paddingVertical: 12,
    color: colors.text,
  },
});
