import { View, Text, StyleSheet } from 'react-native';

export default function Header({ children }: { children: React.ReactNode }) {
  return <View style={styles.header}>{children}</View>;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 44,
    width: '100%',
  },
});
