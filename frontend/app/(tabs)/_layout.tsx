import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="capture" options={{ headerShown: false }} />
      <Tabs.Screen name="settings" options={{ headerShown: false }} />
    </Tabs>
  );
}
