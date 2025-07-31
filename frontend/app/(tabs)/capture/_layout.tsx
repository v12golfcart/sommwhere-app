import { Stack, useRouter } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CaptureLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="preview"
        options={{
          animation: 'none',
          title: '',
          headerTransparent: true,
          headerBackVisible: false,
          headerLeft: ({ canGoBack }) =>
            canGoBack ? (
              <TouchableOpacity
                onPress={() => {
                  const router = useRouter();
                  router.back();
                }}
                style={styles.headerLeft}
              >
                <Ionicons name="close" size={32} color="white" />
              </TouchableOpacity>
            ) : null,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: -9, // space matching the camera flash button
    marginTop: 6, // space matching the camera flash button
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
