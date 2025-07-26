import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../src/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.secondary,
      }}
    >
      <Tabs.Screen
        name="capture"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="camera" color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => <Ionicons name="settings" color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}
