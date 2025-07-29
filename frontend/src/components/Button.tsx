import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { ReactNode } from 'react';
import { colors } from '../theme';

interface ButtonProps {
  onPress: () => void;
  text: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
  color?: string;
  textColor?: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export default function Button({
  onPress,
  text,
  style,
  textStyle,
  color = colors.secondary,
  textColor = 'white',
  icon,
  disabled = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, disabled && styles.disabled, style]}
      onPress={onPress}
      disabled={disabled}
    >
      {icon && <>{icon}</>}
      <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}

export function IconButton(props: ButtonProps) {
  return <Button {...props} style={[styles.iconButton, props.style]} />;
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'PTSerif',
    marginLeft: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  iconButton: {
    width: 'auto',
    minWidth: undefined,
    justifyContent: 'flex-start',
  },
});
