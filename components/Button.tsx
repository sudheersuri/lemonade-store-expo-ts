import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from './theme';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
}) => {
  // Get the styles based on variant and size
  const buttonStyle = getButtonStyle(variant, size, fullWidth, disabled);
  const textStyleByVariant = getTextStyle(variant, size);

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? colors.primary : colors.white}
          size="small"
        />
      ) : (
        <View style={styles.buttonContent}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[textStyleByVariant, textStyle]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const getButtonStyle = (
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  disabled: boolean
): StyleProp<ViewStyle> => {
  const baseStyle: ViewStyle = {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto',
  };

  // Set size-specific styles
  switch (size) {
    case 'sm':
      baseStyle.paddingVertical = spacing.xs;
      baseStyle.minHeight = 32;
      break;
    case 'lg':
      baseStyle.paddingVertical = spacing.md;
      baseStyle.minHeight = 52;
      break;
    case 'md':
    default:
      baseStyle.paddingVertical = spacing.sm;
      baseStyle.minHeight = 44;
      break;
  }

  // Set variant-specific styles
  switch (variant) {
    case 'outline':
      return {
        ...baseStyle,
        backgroundColor: colors.transparent,
        borderWidth: 1,
        borderColor: colors.primary,
      };
    case 'ghost':
      return {
        ...baseStyle,
        backgroundColor: colors.transparent,
      };
    case 'danger':
      return {
        ...baseStyle,
        backgroundColor: colors.error,
      };
    case 'primary':
    default:
      return {
        ...baseStyle,
        backgroundColor: colors.primary,
      };
  }
};

const getTextStyle = (variant: ButtonVariant, size: ButtonSize): TextStyle => {
  const baseTextStyle: TextStyle = {
    fontFamily: typography.fontFamily.medium,
    textAlign: 'center',
  };

  // Set size-specific text styles
  switch (size) {
    case 'sm':
      baseTextStyle.fontSize = typography.fontSize.sm;
      break;
    case 'lg':
      baseTextStyle.fontSize = typography.fontSize.lg;
      break;
    case 'md':
    default:
      baseTextStyle.fontSize = typography.fontSize.md;
      break;
  }

  // Set variant-specific text styles
  switch (variant) {
    case 'outline':
    case 'ghost':
      baseTextStyle.color = colors.onPrimaryContainer;
      break;
    case 'primary':
    case 'danger':
    default:
      baseTextStyle.color = colors.white;
      break;
  }

  return baseTextStyle;
};

const styles = StyleSheet.create({
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: spacing.sm,
  },
});

export default Button;