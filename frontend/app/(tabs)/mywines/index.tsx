import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { colors } from '../../../src/theme';
import { Page } from '../../../src/components';
import { useRouter } from 'expo-router';
import { Header, Avatar } from '../../../src/components';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const router = useRouter();
  const dummyStats = {
    menus: 0,
    bottles: 0,
    sommScore: 0,
  };

  const profileStats = (value: number, label: string) => {
    return (
      <View style={styles.profileStatItem}>
        <Text style={styles.profileStatItemValue}>{value}</Text>
        <Text style={styles.profileStatItemLabel}>{label}</Text>
      </View>
    );
  };

  return (
    <Page>
      <Header>
        <Text style={styles.headerText}>@username</Text>
        <TouchableOpacity
          onPress={() => router.navigate('/mywines/settings')}
          style={styles.headerIconContainer}
        >
          <Ionicons name="settings" size={24} color={colors.text} />
        </TouchableOpacity>
      </Header>
      <View style={styles.profileHeaderContainer}>
        <Avatar size={96} />
        <View style={styles.profileInfoContainer}>
          <View style={styles.profileStatsContainer}>
            {profileStats(dummyStats.menus, '📷 Menus')}
            {profileStats(dummyStats.bottles, '🍾 Bottles')}
            {profileStats(dummyStats.sommScore, '🥇 Score')}
          </View>
        </View>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 28,
    color: colors.secondary,
    fontFamily: 'Marcellus',
  },
  headerIconContainer: {
    marginLeft: 'auto',
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHeaderContainer: {
    marginTop: 16,
    flexDirection: 'row',
  },
  profileInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  profileStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileStatItem: {
    flexDirection: 'column',
  },
  profileStatItemValue: {
    fontSize: 24,
    color: colors.text,
  },
  profileStatItemLabel: {
    fontSize: 12,
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'PTSerif',
  },
});
