import { View, StyleSheet, ViewStyle } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../theme';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  statusBarStyle?: 'auto' | 'light' | 'dark' | 'inverted';
}

export default function Page({ children, style, backgroundColor, statusBarStyle = 'auto' }: Props) {
  return (
    <View style={[styles.container, backgroundColor && { backgroundColor }, style]}>
      {children}
      <StatusBar style={statusBarStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
