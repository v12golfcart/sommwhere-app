import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../src/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Capture</Text>
      <Text style={styles.subtitle}>Take a photo of wine</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
