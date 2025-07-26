import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { colors } from '../src/theme';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function App() {
  const isAuthenticated = true;

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/capture');
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <Text style={styles.header}>H!!</Text>
  //     <Text style={styles.subtitle}>What wine do you want to drink today?</Text>
  //   </View>
  // );
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
