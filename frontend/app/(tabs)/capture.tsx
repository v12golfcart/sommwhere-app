// React & React Native
import { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';

// Expo packages
import { CameraView, useCameraPermissions, FlashMode } from 'expo-camera';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Icons
import { Ionicons } from '@expo/vector-icons';

// Local imports
import { Page, Button, SommPromptInput } from '../../src/components';
import { colors } from '../../src/theme';
import { useCaptureSessionStore } from '../../src/stores';

export default function CaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>('off');
  const cameraRef = useRef<CameraView>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const { photoUri, setPhotoUri } = useCaptureSessionStore();
  const insets = useSafeAreaInsets();

  // Helper function to initialize photo session
  const initializePhotoSession = (uri: string) => {
    setPhotoUri(uri);
  };

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
    if (isCapturing) return;
    setIsCapturing(true);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          // Quality: Balance between file size and detail
          quality: 0.8, // 80% quality - good balance for wine analysis

          // Format: JPEG is preferred for photos (smaller files)
          // PNG would be larger but potentially better for text/labels
          // Default is JPEG which is perfect

          // Skip processing for faster capture
          skipProcessing: false, // Keep as false for proper orientation

          // Don't include base64 in the response (saves memory)
          base64: false,

          // Include EXIF data (might be useful for wine context)
          exif: false, // Set to true if you want camera settings/location

          // Don't mirror front camera images
          mirror: false,
        });

        setIsCapturing(false);
        initializePhotoSession(photo.uri);
      } catch (error) {
        console.error('Error taking photo:', error);
        setIsCapturing(false);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      initializePhotoSession(result.assets[0].uri);
    }
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} ref={cameraRef} flash={flash}>
          <View style={styles.cameraOverlay}>
            {/* Top controls */}
            <View style={styles.topControls}>
              <TouchableOpacity style={styles.buttonHeaderLeft} onPress={toggleFlash}>
                {flash === 'off' ? (
                  <Ionicons name="flash-off" size={24} color={colors.surface} />
                ) : (
                  <Ionicons name="flash" size={24} color={colors.surface} />
                )}
              </TouchableOpacity>
            </View>
            {/* Bottom controls */}
            <View style={styles.bottomControls}>
              <TouchableOpacity style={styles.galleryButton} onPress={pickImage}>
                <Ionicons name="images" size={32} color={colors.surface} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
    );
  };

  const renderPreview = () => {
    return (
      <>
        <Pressable style={styles.absoluteFillObject} onPress={Keyboard.dismiss}>
          <Image
            source={{ uri: photoUri || '' }}
            style={styles.absoluteFillObject}
            resizeMode="contain"
          />
        </Pressable>

        <View style={styles.cameraOverlay} pointerEvents="box-none">
          {/* Top controls */}
          <View style={styles.topControls}>
            <TouchableOpacity style={styles.buttonHeaderLeft} onPress={() => setPhotoUri(null)}>
              <Ionicons name="close" size={32} color={colors.surface} />
            </TouchableOpacity>
          </View>
          {/* Bottom controls */}
          <KeyboardAvoidingView
            style={styles.keyboardAvoid}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? insets.bottom + 25 : 0}
          >
            <SommPromptInput />
          </KeyboardAvoidingView>
        </View>
      </>
    );
  };

  return (
    <Page style={styles.page} edges={['top', 'left', 'right']} backgroundColor="black">
      {photoUri ? renderPreview() : renderCamera()}
    </Page>
  );
}

const styles = StyleSheet.create({
  // Layout styles
  page: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  // Permission screen styles
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

  // Camera styles
  cameraContainer: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Control styles
  topControls: {
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
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
  buttonHeaderLeft: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },

  // Camera controls
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

  // Preview styles
  absoluteFillObject: {
    position: 'absolute',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  keyboardAvoid: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
