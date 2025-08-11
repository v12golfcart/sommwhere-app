import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../src/theme';
import { Page, Button } from '../../src/components';
import { useAuthStore } from '../../src/stores';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const handleLogout = () => {
    logout;
    router.replace('/login');
  };

  return (
    <Page style={styles.page}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.subtitle}>Your settings page</Text>

      <View style={styles.logoutContainer}>
        <Button
          onPress={handleLogout}
          text="Log Out"
          color={colors.error}
          textColor={colors.surface}
        />
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 16,
  },
  header: {
    fontSize: 20,
    color: colors.secondary,
    fontFamily: 'Marcellus',
  },
  subtitle: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'PTSerif',
  },
  logoutContainer: {
    marginTop: 40,
    // paddingHorizontal: 20,
  },
});
