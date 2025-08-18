import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../../src/theme';
import { Page } from '../../../src/components';
import { useRouter } from 'expo-router';
import { Header } from '../../../src/components';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <Page style={styles.page}>
      <Header>
        <Text style={styles.headerText}>My Wines</Text>
        <TouchableOpacity
          onPress={() => router.navigate('/mywines/settings')}
          style={styles.headerIconContainer}
        >
          <Ionicons name="settings" size={24} color={colors.text} />
        </TouchableOpacity>
      </Header>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: {
    // paddingTop: 16,
  },
  headerText: {
    fontSize: 32,
    color: colors.secondary,
    fontFamily: 'Marcellus',
  },
  headerIconContainer: {
    marginLeft: 'auto',
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'PTSerif',
  },
});
