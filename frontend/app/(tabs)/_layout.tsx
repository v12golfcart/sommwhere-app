import React from 'react';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';
import { colors } from '../../src/theme';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const [showTabs, setShowTabs] = React.useState(false);

  const tabBarStyle = StyleSheet.flatten([styles.tabBar, { paddingBottom: insets.bottom || 20 }]);

  return (
    <Tabs>
      {/* This renders the current tab's content */}
      <TabSlot />

      {/* Custom tab bar at the bottom */}
      <TabList style={tabBarStyle}>
        <View style={styles.customButtonContainer}>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={() => setShowTabs(!showTabs)}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh" color={colors.surface} size={20} />
            <Text style={styles.refreshButtonText}>Refresh</Text>
          </TouchableOpacity>
        </View>
        <TabTrigger name="capture" href="/capture" style={[styles.tabTrigger, !showTabs && { display: 'none' }]}>
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

        <TabTrigger name="settings" href="/settings" style={[styles.tabTrigger, !showTabs && { display: 'none' }]}>
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
  tabBarContainer: {
    position: 'relative',
  },
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
  floatingButtonContainer: {
    position: 'absolute',
    top: -25,
    left: '50%',
    transform: [{ translateX: -25 }],
  },
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  customButtonContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  refreshButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  refreshButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
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
