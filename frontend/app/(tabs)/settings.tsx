import { StyleSheet, Text } from 'react-native';
import { colors } from '../../src/theme';
import { Page } from '../../src/components';

export default function SettingsScreen() {
  return (
    <Page style={styles.page}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.subtitle}>Your settings page</Text>
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
});
