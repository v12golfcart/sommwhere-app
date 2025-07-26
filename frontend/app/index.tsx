import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { colors } from '../src/theme';
import { router, useRootNavigationState } from 'expo-router';
import { useEffect } from 'react';

export default function App() {
  const isAuthenticated = true;
  const navigationState = useRootNavigationState();

  useEffect(() => {
    // if the navigation state is not loaded, don't do anything
    if (!navigationState?.key) {
      return;
    }

    // if the user is authenticated, redirect to the capture screen
    if (isAuthenticated) {
      router.replace('/capture');
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated, navigationState?.key]);

  // show a loading indicator while the navigation state is loading
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.secondary} />
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
