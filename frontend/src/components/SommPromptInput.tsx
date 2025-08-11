import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  KeyboardTypeOptions,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';
import { useCaptureSessionStore, useAuthStore } from '../stores';

interface SommPromptInputProps {
  // Style customization
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  iconColor?: string;
  
  // Input customization
  placeholder?: string;
  placeholderTextColor?: string;
  maxLength?: number;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  onChangeText?: (text: string) => void;
  
  // Behavior
  onSubmit?: () => void;
  blurOnSubmit?: boolean;
}

export const SommPromptInput: React.FC<SommPromptInputProps> = ({
  containerStyle,
  inputStyle,
  iconColor = colors.textMuted,
  placeholder = "Tell me about this wine...",
  placeholderTextColor = "rgba(255,255,255,0.5)",
  maxLength = 500,
  keyboardType,
  value,
  onChangeText,
  onSubmit,
  blurOnSubmit = true,
}) => {
  const user = useAuthStore((state) => state.user);
  const { sommPrompt, setSommPrompt } = useCaptureSessionStore();
  // Use controlled value if provided, otherwise use store
  const [localValue, setLocalValue] = useState(value !== undefined ? value : sommPrompt);
  
  // Initialize with user's taste profile if sommPrompt is empty (only in uncontrolled mode)
  useEffect(() => {
    if (value === undefined) {
      // Uncontrolled mode - use store
      if (!sommPrompt && user?.tasteProfile) {
        const tasteProfile = user.tasteProfile;
        setSommPrompt(tasteProfile);
        setLocalValue(tasteProfile);
      } else {
        setLocalValue(sommPrompt);
      }
    } else {
      // Controlled mode - use prop value
      setLocalValue(value);
    }
  }, [sommPrompt, user?.tasteProfile, setSommPrompt, value]);

  const handleChangeText = (text: string) => {
    setLocalValue(text);
    // Call external handler if provided
    onChangeText?.(text);
  };

  const handleSubmit = () => {
    // Only update store in uncontrolled mode
    if (value === undefined) {
      setSommPrompt(localValue);
    }
    onSubmit?.();
    if (blurOnSubmit) {
      Keyboard.dismiss();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={styles.icon}>
        <Ionicons name="sparkles" size={24} color={iconColor} />
      </TouchableOpacity>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={localValue}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmit}
        multiline
        maxLength={maxLength}
        returnKeyType="done"
        blurOnSubmit={blurOnSubmit}
        keyboardType={keyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    maxHeight: 120,
  },
  icon: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: colors.surface,
    fontSize: 16,
    fontFamily: 'PTSerif',
    marginLeft: 4,
    paddingVertical: 0,
  },
});