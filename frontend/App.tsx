import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from './src/theme';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

// Keep splash screen visible while loading
SplashScreen.preventAutoHideAsync();

export default function App() {
  // load fonts
  const [fontsLoaded, fontsError] = useFonts({
    Marcellus: require('./assets/fonts/Marcellus-Regular.ttf'),
    PTSerif: require('./assets/fonts/PTSerif-Regular.ttf'),
    PTSerifBold: require('./assets/fonts/PTSerif-Bold.ttf'),
    PTSerifItalic: require('./assets/fonts/PTSerif-Italic.ttf'),
    PTSerifBoldItalic: require('./assets/fonts/PTSerif-BoldItalic.ttf'),
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
    <View style={styles.container}>
      <Text style={styles.header}>Hello Vishal!!</Text>
      <Text style={styles.subtitle}>What wine do you want to drink today?</Text>
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
