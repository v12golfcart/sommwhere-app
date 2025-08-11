import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useRouter, useRootNavigationState } from 'expo-router';
import { Page } from '../src/components';
import { colors } from '../src/theme';
import { useAuthStore } from '../src/stores/authStore';

export default function App() {
  const router = useRouter();
  const navigationState = useRootNavigationState();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    // if the navigation state is not loaded, don't do anything
    if (!navigationState?.key) {
      return;
    }

    // if the user is authenticated, redirect to the capture screen
    // if (true) {
    if (isAuthenticated) {
      router.replace('/capture');
    } else {
      router.replace('/login');
    }
  }, [isAuthenticated, navigationState?.key]);

  // show a loading indicator while the navigation state is loading
  return (
    <Page>
      <ActivityIndicator size="large" color={colors.secondary} />
    </Page>
  );
}
