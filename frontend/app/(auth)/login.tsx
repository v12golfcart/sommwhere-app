import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../src/theme';
import { Page } from '../../src/components';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  return (
    <Page>
      <View style={styles.headerContainer}>
        <Ionicons name="wine" size={40} color={colors.secondary} style={styles.icon} />
        <Text style={styles.header}>Sommwhere</Text>
      </View>
      <Text style={styles.subtitle}>Your own wine Sommelier in your pocket</Text>
    </Page>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 10,
  },
  header: {
    fontSize: 36,
    color: colors.secondary,
    fontFamily: 'Marcellus',
  },
  subtitle: {
    color: colors.text,
    fontFamily: 'PTSerif',
  },
});
