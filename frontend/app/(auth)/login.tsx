import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../src/theme';
import { Page } from '../../src/components';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';

const GoogleLoginButton = () => {
  const handlePress = () => {
    router.replace('/username');
  };

  return (
    <TouchableOpacity style={[styles.button, styles.buttonGoogle]} onPress={handlePress}>
      <Ionicons name="logo-google" size={20} color="white" />
      <Text style={styles.buttonText}>Continue with Google</Text>
    </TouchableOpacity>
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
    <TouchableOpacity style={[styles.button, styles.buttonApple]} onPress={handlePress}>
      <Ionicons name="logo-apple" size={20} color="white" />
      <Text style={styles.buttonText}>Continue with Apple</Text>
    </TouchableOpacity>
  );
};

export default function App() {
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
  // button
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 250,
  },
  buttonGoogle: {
    backgroundColor: '#4285F4',
  },
  buttonApple: {
    backgroundColor: '#000000',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 12,
    fontFamily: 'PTSerif',
  },
});
