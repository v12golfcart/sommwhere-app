import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../src/theme';
import { Page } from '../../src/components';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthStore } from '../../src/stores/authStore';
import { Button } from '../../src/components';

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
    router.navigate('/onboarding/username');
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
    router.navigate('/onboarding/username');
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

export default function OnboardingLogin() {
  return (
    <Page style={styles.page}>
      <View style={styles.splashContainer}>
        <View style={styles.headerContainer}>
          <Ionicons name="wine" size={40} color={colors.secondary} style={styles.icon} />
          <Text style={styles.header}>Sommwhere</Text>
        </View>
        <Text style={styles.subtitle}>Your own wine Sommelier in your pocket</Text>
      </View>
      <View style={styles.buttonContainer}>
        <SignUpButton />
        <LogInButton />
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-between',
  },
  splashContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
    flex: 0.35,
    justifyContent: 'flex-end',
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
  // button container
  buttonContainer: {
    width: '100%',
    marginBottom: 48,
    gap: 16,
    flex: 0.65,
    justifyContent: 'flex-end',
  },
  secondaryButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
});
