import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../src/theme';
import { Page } from '../../src/components';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/stores/authStore';
import { Button, KeyboardAvoidingContainer } from '../../src/components';

const SignUpButton = () => {
  const login = useAuthStore((state) => state.login);

  const mockUser = {
    userId: '123',
    username: '',
    tasteProfile: null,
  };

  const handlePress = () => {
    console.log('mockUser', mockUser);
    login(mockUser);
    router.navigate('/phone');
  };

  return <Button text="Sign Up" onPress={handlePress} />;
};

const LogInButton = () => {
  const login = useAuthStore((state) => state.login);

  const mockUser = {
    userId: '123',
    username: '',
    tasteProfile: null,
  };

  const handlePress = () => {
    console.log('mockUser', mockUser);
    login(mockUser);
    router.navigate('/phone');
  };

  return (
    <Button
      text="Log In"
      style={styles.secondaryButton}
      textColor={colors.secondary}
      onPress={handlePress}
    />
  );
};

const footer = () => {
  return (
    <View style={styles.buttonContainer}>
      <SignUpButton />
      <LogInButton />
    </View>
  );
};

export default function OnboardingLogin() {
  return (
    <Page style={styles.page}>
      <KeyboardAvoidingContainer footer={footer()} bounces={false}>
        <View style={styles.content}>
          <View style={styles.splashContainer}>
            <View style={styles.headerContainer}>
              <Ionicons name="wine" size={40} color={colors.secondary} style={styles.icon} />
              <Text style={styles.header}>Sommwhere</Text>
            </View>
            <Text style={styles.subtitle}>Your own wine Sommelier in your pocket</Text>
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
    flex: 1, // this makes the content area fill up the keyboard avoiding view
    justifyContent: 'center', // this centers the content on the page
  },
  splashContainer: {
    alignItems: 'center', // makes sure text is centered
    gap: 4, // space between header and subtitle
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  header: {
    fontSize: 40,
    color: colors.secondary,
    fontFamily: 'Marcellus',
  },
  subtitle: {
    color: colors.text,
    fontFamily: 'PTSerif',
  },
  buttonContainer: {
    width: '100%',
    gap: 8,
  },
  secondaryButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
});
