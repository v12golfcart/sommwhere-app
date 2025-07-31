import { StyleSheet, Text, View, Linking } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { colors } from '../../src/theme';
import { Page, Button } from '../../src/components';

export default function CaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const renderPermissionScreen = () => {
    return (
      <View>
        <Text style={styles.header}>Enable Camera Access</Text>
        <Text style={styles.subtitle}>
          {permission?.status === 'denied'
            ? 'Please enable camera access in your device settings -- the Analyze feature will not work without it.'
            : 'Grant access to your camera to take photos of wine.'}
        </Text>
        <Button
          onPress={permission?.status === 'denied' ? Linking.openSettings : requestPermission}
          text={permission?.status === 'denied' ? 'Open Settings' : 'Grant Access'}
          style={styles.permissionButton}
        />
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
    <Page>
      <View style={styles.container}>
        {permission?.granted ? renderCameraScreen() : renderPermissionScreen()}
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    fontSize: 20,
    color: colors.secondary,
    fontFamily: 'Marcellus',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: colors.text,
    fontFamily: 'PTSerif',
    textAlign: 'center',
  },
  permissionButton: {
    marginTop: 16,
  },
});
