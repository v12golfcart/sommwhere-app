import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from '../src/stores/authStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // load fonts
  const [fontsLoaded, fontsError] = useFonts({
    Marcellus: require('../assets/fonts/Marcellus-Regular.ttf'),
    PTSerif: require('../assets/fonts/PTSerif-Regular.ttf'),
    PTSerifBold: require('../assets/fonts/PTSerif-Bold.ttf'),
    PTSerifItalic: require('../assets/fonts/PTSerif-Italic.ttf'),
    PTSerifBoldItalic: require('../assets/fonts/PTSerif-BoldItalic.ttf'),
  });

  // load fonts
  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  // subscribe to zustand state changes
  useEffect(() => {
    let previousState = useAuthStore.getState();

    const unsubscribe = useAuthStore.subscribe((state) => {
      const changes: Record<string, any> = {};

      // Compare each top-level property
      Object.keys(state).forEach((key) => {
        if (
          JSON.stringify(state[key as keyof typeof state]) !==
          JSON.stringify(previousState[key as keyof typeof previousState])
        ) {
          changes[key] = {
            from: previousState[key as keyof typeof previousState],
            to: state[key as keyof typeof state],
          };
        }
      });

      if (Object.keys(changes).length > 0) {
        let logMessage = `\n[${Object.keys(changes).length} Auth State Changes]\n`;
        Object.entries(changes).forEach(([key, change]) => {
          logMessage += `  ${key}:\n`;
          logMessage += `    from: ${JSON.stringify(change.from)}\n`;
          logMessage += `    to: ${JSON.stringify(change.to)}\n`;
        });
        console.log(logMessage);
      }

      previousState = state;
    });

    return () => unsubscribe();
  }, []);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toast />
    </SafeAreaProvider>
  );
}
