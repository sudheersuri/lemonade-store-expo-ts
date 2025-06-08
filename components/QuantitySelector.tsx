import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Minus, Plus } from 'lucide-react-native';
import { colors, darkColors, typography, spacing, borderRadius } from './theme';
import { useAppSelector } from '@/redux/hooks';
import { selectTheme } from '@/redux/slices/uiSlice';

interface QuantitySelectorProps {
  quantity: number;
  onChangeQuantity: (newQuantity: number) => void;
  minQuantity?: number;
  maxQuantity?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChangeQuantity,
  minQuantity = 1,
  maxQuantity = 99,
}) => {
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;

  const decrementDisabled = quantity <= minQuantity;
  const incrementDisabled = quantity >= maxQuantity;

  const handleIncrement = () => {
    if (!incrementDisabled) {
      onChangeQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (!decrementDisabled) {
      onChangeQuantity(quantity - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: themeColors.onNeutral }]}>
        Quantity
      </Text>
      <View style={styles.quantityControls}>
        <TouchableOpacity
          style={[
            styles.button,
            { 
              borderColor: themeColors.neutralContainer,
              backgroundColor: decrementDisabled 
                ? themeColors.neutralContainer 
                : themeColors.background,
            },
          ]}
          onPress={handleDecrement}
          disabled={decrementDisabled}
          activeOpacity={decrementDisabled ? 1 : 0.7}
        >
          <Minus
            size={16}
            color={themeColors.onNeutral}
          />
        </TouchableOpacity>
        
        <View style={[
          styles.quantityContainer,
          { borderColor: themeColors.neutralContainer }
        ]}>
          <Text style={[styles.quantity, { color: themeColors.onNeutral }]}>
            {quantity}
          </Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.button,
            { 
              borderColor: themeColors.neutralContainer,
              backgroundColor: incrementDisabled 
                ? themeColors.neutralContainer 
                : themeColors.background,
            },
          ]}
          onPress={handleIncrement}
          disabled={incrementDisabled}
          activeOpacity={incrementDisabled ? 1 : 0.7}
        >
          <Plus
            size={16}
             color={themeColors.onNeutral}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    marginBottom: spacing.sm,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityContainer: {
    width: 60,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  quantity: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.lg,
  },
});

export default QuantitySelector;