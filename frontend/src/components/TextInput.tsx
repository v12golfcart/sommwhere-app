import { TextInput as RNTextInput, TextInputProps, StyleSheet } from 'react-native';
import { forwardRef } from 'react';
import { colors } from '../theme';

interface CustomTextInputProps extends TextInputProps {
  variant?: 'default' | 'multiline';
}

export const TextInput = forwardRef<RNTextInput, CustomTextInputProps>(
  ({ style, variant = 'default', multiline, ...props }, ref) => {
    const isMultiline = variant === 'multiline' || multiline;
    
    return (
      <RNTextInput
        ref={ref}
        style={[
          styles.input,
          isMultiline && styles.multilineInput,
          style
        ]}
        placeholderTextColor={colors.textMuted}
        multiline={isMultiline}
        textAlignVertical={isMultiline ? 'top' : 'center'}
        {...props}
      />
    );
  }
);

const styles = StyleSheet.create({
  input: {
    fontSize: 24,
    fontFamily: 'PTSerif',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  multilineInput: {
    fontSize: 18,
    minHeight: 100,
    lineHeight: 24,
  },
});