import { StyleSheet, Text, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '../../../src/theme';
import { Page } from '../../../src/components';

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();

  return (
    <Page style={styles.page} edges={['top', 'left', 'right']} backgroundColor="black">
      <Image source={{ uri: photoUri }} style={styles.absoluteFillObject} />
    </Page>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  absoluteFillObject: {
    position: 'absolute',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
