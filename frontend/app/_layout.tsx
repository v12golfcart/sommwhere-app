import { Stack, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../src/stores/authStore';
import { useAppStore } from '../src/stores/appStore';
import { useCaptureSessionStore } from '../src/stores/captureSessionStore';
import { colors } from '../src/theme';

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
  const router = useRouter();
  const { setPhotoUri } = useCaptureSessionStore();

  // load fonts
  useEffect(() => {
    if (fontsLoaded || fontsError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontsError]);

  // Helper function to create store subscriptions with logging
  const createStoreSubscription = (store: any, storeName: string) => {
    let previousState = store.getState();

    const unsubscribe = store.subscribe((state: any) => {
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
        let logMessage = `\n[${Object.keys(changes).length} ${storeName} State Changes]\n`;
        Object.entries(changes).forEach(([key, change]) => {
          logMessage += `  ${key}:\n`;
          logMessage += `    from: ${JSON.stringify(change.from)}\n`;
          logMessage += `    to: ${JSON.stringify(change.to)}\n`;
        });
        console.log(logMessage);
      }

      previousState = state;
    });

    return unsubscribe;
  };

  // Subscribe to store changes
  useEffect(() => {
    const unsubscribeAuth = createStoreSubscription(useAuthStore, 'Auth');
    const unsubscribeApp = createStoreSubscription(useAppStore, 'App');
    const unsubscribeCaptureSession = createStoreSubscription(
      useCaptureSessionStore,
      'CaptureSession',
    );

    return () => {
      unsubscribeAuth();
      unsubscribeApp();
      unsubscribeCaptureSession();
    };
  }, []);

  if (!fontsLoaded && !fontsError) {
    return null;
  }

  const navReset = () => {
    setPhotoUri(null);
    router.back();
  };

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="analyze/index"
          options={{
            headerShown: true,
            headerTransparent: false,
            headerTitle: '',
            headerBackTitle: 'Cancel',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text, // Color of back button
            headerLeft: () => (
              <TouchableOpacity onPress={() => navReset()} style={styles.headerButton}>
                <View style={styles.backButtonContainer}>
                  <Ionicons
                    name="chevron-back"
                    size={28}
                    color={colors.primary}
                    style={styles.chevron}
                  />
                  <Text style={styles.headerButtonText}>Cancel</Text>
                </View>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
      <Toast />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 16,
    color: colors.text,
  },
  headerButton: {
    marginLeft: 0,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chevron: {
    marginRight: 5,
    marginLeft: -6,
  },
  headerButtonText: {
    fontSize: 17,
    color: colors.primary,
  },
});
