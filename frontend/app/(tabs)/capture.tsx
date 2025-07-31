import { useState, useRef } from 'react';
import { StyleSheet, Text, View, Linking, ActivityIndicator, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions, FlashMode } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import { colors } from '../../src/theme';
import { Page, Button } from '../../src/components';
import { Ionicons } from '@expo/vector-icons';

export default function CaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>('off');
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <Page backgroundColor="black">
        <ActivityIndicator color={colors.text} size="large" />
      </Page>
    );
  }

  if (!permission.granted) {
    return (
      <Page>
        <View style={styles.container}>
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
      </Page>
    );
  }

  const toggleFlash = () => {
    setFlash(flash === 'off' ? 'on' : 'off');
  };

  const takePhoto = async () => {
    // Add haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    console.log('takePhoto');
  };

  return (
    <Page style={styles.pageWithCamera} edges={['top', 'left', 'right']} backgroundColor="black">
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} ref={cameraRef} flash={flash}>
          {/* overlay */}
          <View style={styles.cameraOverlay}>
            {/* 
            top controls 
            */}
            <View style={styles.topControls}>
              {/* flash button */}
              <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
                {flash === 'off' ? (
                  <Ionicons name="flash-off" size={24} color={colors.surface} />
                ) : (
                  <Ionicons name="flash" size={24} color={colors.surface} />
                )}
              </TouchableOpacity>
            </View>
            {/* 
            bottom controls 
            */}
            <View style={styles.bottomControls}>
              {/* gallery button */}
              <TouchableOpacity style={styles.galleryButton}>
                <Ionicons name="images" size={32} color={colors.surface} />
              </TouchableOpacity>
              {/* capture button */}
              <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    </Page>
  );
}

const styles = StyleSheet.create({
  pageWithCamera: {
    paddingLeft: 0,
    paddingRight: 0,
  },
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
  // camera
  cameraContainer: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  // camera overlay
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraOverlayText: {
    fontSize: 20,
    color: colors.text,
    fontFamily: 'Marcellus',
    textAlign: 'center',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.surface,
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
  },
  galleryButton: {
    position: 'absolute',
    left: 32,
  },
  topControls: {
    position: 'absolute',
    top: 16,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flashButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
