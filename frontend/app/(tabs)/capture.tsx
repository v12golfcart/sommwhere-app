import { StyleSheet, Text, View } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { colors } from '../../src/theme';
import { Page, Button } from '../../src/components';

export default function CaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const renderPermissionScreen = () => {
    return (
      <View>
        <Text style={styles.header}>Enable Camera Access</Text>
        <Text style={styles.subtitle}>Grant access to your camera to take photos of wine.</Text>
        <Button onPress={requestPermission} text="Grant Access" />
      </View>
    );
  };

  const renderCameraScreen = () => {
    return (
      <View>
        <Text style={styles.header}>Capture</Text>
        <Text style={styles.subtitle}>Take a photo of wine</Text>
      </View>
    );
  };

  return (
    <Page>{permission?.granted ? renderCameraScreen() : renderPermissionScreen()}</Page>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    color: colors.secondary,
    fontFamily: 'Marcellus',
  },
  subtitle: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'PTSerif',
  },
});
