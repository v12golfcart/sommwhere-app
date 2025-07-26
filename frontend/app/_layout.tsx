import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

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

  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
