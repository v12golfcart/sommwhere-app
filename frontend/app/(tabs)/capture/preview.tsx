import { StyleSheet, Text, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Page } from '../../../src/components';

export default function PreviewScreen() {
  const { photoUri } = useLocalSearchParams<{ photoUri: string }>();
  const router = useRouter();

  if (!photoUri) {
    router.back();
    return null;
  }

  return (
    <Page style={styles.page} edges={['top', 'left', 'right']} backgroundColor="black">
      <Image source={{ uri: photoUri }} style={styles.absoluteFillObject} resizeMode="contain" />
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
