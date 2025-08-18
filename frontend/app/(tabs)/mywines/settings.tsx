import { View, StyleSheet } from 'react-native';
import { Page, Button } from '../../../src/components';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../../src/stores';
import { colors } from '../../../src/theme';

export default function Settings() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout;
    router.replace('/login');
  };

  return (
    <Page style={styles.page} edges={['left', 'right', 'bottom']}>
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
  page: {},
  logoutContainer: {
    marginTop: 40,
    // paddingHorizontal: 20,
  },
});
