import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../src/theme';
import { Page, IconButton } from '../../src/components';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useAuthStore } from '../../src/stores/authStore';

const GoogleLoginButton = () => {
  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

  const handlePress = () => {
    // MOCK LOGIN
    const mockUser = {
      userId: '123',
      username: '',
      tasteProfile: null,
    };
    login(mockUser);

    // TODO, switch to replace to avoid going "back"
    router.navigate('/onboarding/username');
  };

  return (
    <IconButton
      text="Continue with Google"
      onPress={handlePress}
      color="#4285F4"
      icon={<Ionicons name="logo-google" size={20} color="white" />}
    />
  );
};

const AppleLoginButton = () => {
  const handlePress = () => {
    Toast.show({
      type: 'info',
      text1: 'Coming soon',
      text2: "I haven't implemented this yet.",
      position: 'bottom',
      visibilityTime: 2000,
    });
  };

  return (
    <IconButton
      text="Continue with Apple"
      onPress={handlePress}
      color="#000000"
      icon={<Ionicons name="logo-apple" size={20} color="white" />}
    />
  );
};

export default function OnboardingLogin() {
  return (
    <Page>
      <View style={styles.splashContainer}>
        <View style={styles.headerContainer}>
          <Ionicons name="wine" size={40} color={colors.secondary} style={styles.icon} />
          <Text style={styles.header}>Sommwhere</Text>
        </View>
        <Text style={styles.subtitle}>Your own wine Sommelier in your pocket</Text>
      </View>
      <View style={styles.buttonContainer}>
        <GoogleLoginButton />
        <AppleLoginButton />
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 4,
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
    marginTop: 40,
    gap: 12,
  },
});
