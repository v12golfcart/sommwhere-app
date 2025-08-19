import { View, Image, TouchableOpacity, StyleSheet, StyleProp, ImageStyle } from 'react-native';
import { colors } from '../theme';

export interface AvatarProps {
  uri?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

export default function Avatar({ uri, style, size = 64, onPress }: AvatarProps) {
  const placeholder = require('../../assets/splash-icon.png');
  const radius = size / 2;
  const imgStyle: StyleProp<ImageStyle> = [
    { width: size, height: size, borderRadius: radius },
    styles.image,
    style,
  ];

  const image = <Image source={uri ? { uri } : placeholder} style={imgStyle} />;

  if (onPress) {
    return <TouchableOpacity onPress={onPress}>{image}</TouchableOpacity>;
  }
  return image;
}

const styles = StyleSheet.create({
  image: {
    borderColor: colors.border,
    borderWidth: 2,
    backgroundColor: colors.text,
  },
});
