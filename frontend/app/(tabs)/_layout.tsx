import React from 'react';
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePathname } from 'expo-router';
import { colors } from '../../src/theme';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const tabBarStyle = StyleSheet.flatten([styles.tabBar, { paddingBottom: insets.bottom || 20 }]);

  const isViewingPreview = () => pathname.startsWith('/capture/preview');

  return (
    <Tabs>
      {/* This renders the current tab's content */}
      <TabSlot />

      {/* Custom tab bar at the bottom */}
      <TabList style={tabBarStyle}>
        {/* Analyze tab */}
        <TabTrigger
          name="capture"
          href="/capture"
          style={[styles.tabTrigger, isViewingPreview() && styles.tabTriggerHidden]}
        >
          <View style={styles.tabContent}>
            <Ionicons
              name="camera"
              color={pathname.startsWith('/capture') ? colors.secondary : colors.inactive}
              size={24}
            />
            <Text style={pathname.startsWith('/capture') ? styles.tabLabelActive : styles.tabLabel}>
              Analyze
            </Text>
          </View>
        </TabTrigger>

        {/* Settings tab */}
        <TabTrigger
          name="settings"
          href="/settings"
          style={[styles.tabTrigger, isViewingPreview() && styles.tabTriggerHidden]}
        >
          <View style={styles.tabContent}>
            <Ionicons
              name="settings"
              color={pathname.startsWith('/settings') ? colors.secondary : colors.inactive}
              size={24}
            />
            <Text
              style={pathname.startsWith('/settings') ? styles.tabLabelActive : styles.tabLabel}
            >
              Settings
            </Text>
          </View>
        </TabTrigger>

        {/* Preview action buttons */}
        <View
          style={[styles.customButtonContainer, !isViewingPreview() && styles.tabTriggerHidden]}
        >
          <TouchableOpacity
            style={styles.analyzeButton}
            onPress={() => console.log('Analyze pressed')}
            activeOpacity={0.7}
          >
            <Ionicons name="sparkles" color={colors.surface} size={20} />
            <Text style={styles.analyzeButtonText}>Analyze</Text>
          </TouchableOpacity>
        </View>
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
  tabTriggerHidden: {
    display: 'none',
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
  customButtonContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  analyzeButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 9, // matching tabs height
    paddingHorizontal: 24,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  analyzeButtonText: {
    color: colors.surface,
    fontSize: 14,
    fontWeight: '600',
  },
});
