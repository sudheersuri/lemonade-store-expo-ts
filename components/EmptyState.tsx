import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, darkColors, typography, spacing } from './theme';
import Button from './Button';
import { useAppSelector } from '@/redux/hooks';
import { selectTheme } from '@/redux/slices/uiSlice';
import { ShoppingCart } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  message,
  actionLabel,
  onAction,
}) => {
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.white }]}>
      <ShoppingCart size={100} color={themeColors.primary} />
      <Text style={[styles.title, { color: themeColors.onNeutral }]}>
        {title}
      </Text>
      <Text style={[styles.message, { color: themeColors.neutral }]}>
        {message}
      </Text>
      
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          textStyle={{
            color:colors.black
          }}
          onPress={onAction}
          style={styles.actionButton}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: spacing.lg,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    textAlign: 'center',
    marginVertical: spacing.md,
  },
  message: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  actionButton: {
    minWidth: 180,
  },
});

export default EmptyState;