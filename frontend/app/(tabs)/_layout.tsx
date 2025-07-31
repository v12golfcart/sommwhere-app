import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';
import { colors } from '../../src/theme';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const tabBarStyle = StyleSheet.flatten([
    styles.tabBar,
    { paddingBottom: insets.bottom || 20 }
  ]);

  return (
    <Tabs>
      {/* This renders the current tab's content */}
      <TabSlot />

      {/* Custom tab bar at the bottom */}
      <TabList style={tabBarStyle}>
        <TabTrigger name="capture" href="/capture" style={styles.tabTrigger}>
          <View style={styles.tabContent}>
            <Ionicons
              name="camera"
              color={pathname === '/capture' ? colors.secondary : colors.inactive}
              size={24}
            />
            <Text style={pathname === '/capture' ? styles.tabLabelActive : styles.tabLabel}>
              Analyze
            </Text>
          </View>
        </TabTrigger>

        <TabTrigger name="settings" href="/settings" style={styles.tabTrigger}>
          <View style={styles.tabContent}>
            <Ionicons
              name="settings"
              color={pathname === '/settings' ? colors.secondary : colors.inactive}
              size={24}
            />
            <Text style={pathname === '/settings' ? styles.tabLabelActive : styles.tabLabel}>
              Settings
            </Text>
          </View>
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.surface,
    flexDirection: 'row',
    paddingTop: 8,
    borderTopWidth: 0.5,
    borderTopColor: colors.border,
  },
  tabTrigger: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500',
    color: colors.inactive,
  },
  tabLabelActive: {
    fontSize: 10,
    marginTop: 2,
    fontWeight: '500',
    color: colors.secondary,
  },
});

// export default function TabsLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: colors.secondary,
//         tabBarStyle: {
//           backgroundColor: colors.surface,
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="capture"
//         options={{
//           title: 'Analyze',
//           headerShown: false,
//           tabBarIcon: ({ color }) => <Ionicons name="camera" color={color} size={24} />,
//         }}
//       />
//       <Tabs.Screen
//         name="settings"
//         options={{
//           title: 'Settings',
//           headerShown: false,
//           tabBarIcon: ({ color }) => <Ionicons name="settings" color={color} size={24} />,
//         }}
//       />
//     </Tabs>
//   );
// }
