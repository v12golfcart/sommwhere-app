import { StyleSheet, Text, View, TextInput as RNTextInput } from 'react-native';
import { colors } from '../../src/theme';
import { Page, Button, KeyboardAvoidingContainer, OnboardingIcon, TextInput } from '../../src/components';
import { router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';

export default function OtpScreen() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputs = useRef<(RNTextInput | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance to next input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }

    // Auto-submit when complete
    if (index === 5 && value) {
      const fullOtp = newOtp.join('');
      if (fullOtp.length === 6) {
        handleVerify();
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join('');
    console.log('Verifying OTP:', fullOtp);
    // Mock verification - in real app, verify with backend
    router.push('/onboarding/username');
  };

  const handleResend = () => {
    console.log('Resending OTP...');
    setTimer(60);
    setOtp(['', '', '', '', '', '']);
    inputs.current[0]?.focus();
  };

  const isComplete = otp.every((digit) => digit !== '');

  return (
    <Page style={styles.page}>
      <KeyboardAvoidingContainer
        footer={<Button text="Verify" onPress={handleVerify} disabled={!isComplete} />}
        bounces={false}
      >
        <View style={styles.content}>
          <OnboardingIcon name="key" />
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Verify your number</Text>
            <Text style={styles.subtitle}>Enter the code we sent to your phone</Text>
          </View>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
                value={digit}
                onChangeText={(value) => handleChange(value.slice(-1), index)}
                onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                keyboardType="number-pad"
                maxLength={1}
                autoFocus={index === 0}
              />
            ))}
          </View>

          <View style={styles.resendContainer}>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend code in {timer}s</Text>
            ) : (
              <Text style={styles.resendText} onPress={handleResend}>
                Resend code
              </Text>
            )}
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
    marginBottom: 40,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 8,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'PTSerif',
    color: colors.text,
    backgroundColor: colors.surface,
  },
  otpInputFilled: {
    borderColor: colors.primary,
    backgroundColor: colors.surface,
  },
  resendContainer: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 16,
    color: colors.textMuted,
    fontFamily: 'PTSerif',
  },
  resendText: {
    fontSize: 16,
    color: colors.primary,
    fontFamily: 'PTSerifBold',
    textDecorationLine: 'underline',
  },
});
