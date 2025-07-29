import { StyleSheet, Text } from 'react-native';
import { colors } from '../../src/theme';
import { Page } from '../../src/components';

export default function OtpScreen() {
  return (
    <Page>
      <Text style={styles.header}>Phone number</Text>
      <Text style={styles.subtitle}>enter your phone number</Text>
    </Page>
  );
}

const styles = StyleSheet.create({
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
