import { View, StyleSheet, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  statusBarStyle?: 'auto' | 'light' | 'dark' | 'inverted';
  edges?: Array<'top' | 'right' | 'bottom' | 'left'>;
}

export default function Page({
  children,
  style,
  backgroundColor,
  statusBarStyle = 'auto',
  edges = ['top', 'bottom', 'left', 'right'],
}: Props) {
  return (
    <SafeAreaView style={[styles.safeArea, backgroundColor && { backgroundColor }]} edges={edges}>
      <View style={[styles.container, style]}>
        {children}
        <StatusBar style={statusBarStyle} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
  },
});
