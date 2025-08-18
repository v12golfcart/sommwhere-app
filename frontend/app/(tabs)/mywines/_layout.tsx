import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '../../../src/theme';

export default function StackLayout() {
  return (
    <Stack screenOptions={{ animation: 'none' }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          headerTitle: 'Settings',
          headerBackButtonDisplayMode: 'minimal',
          headerStyle: {
            backgroundColor: colors.background,
          },
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  );
}
