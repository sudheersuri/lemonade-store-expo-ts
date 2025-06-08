import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Trash2 } from 'lucide-react-native';
import { CartItem as CartItemType } from '@/types/beverage';
import { colors, darkColors, typography, spacing, borderRadius } from './theme';
import { formatCurrency } from '@/utils/validation';
import QuantitySelector from './QuantitySelector';
import { useAppSelector } from '@/redux/hooks';
import { selectTheme } from '@/redux/slices/uiSlice';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;
  const itemTotal = item.price * item.quantity;

  return (
    <View style={[
      styles.container,
      { 
        backgroundColor: themeColors.white,
        borderColor: themeColors.neutralContainer
      }
    ]}>
      <View style={styles.itemDetails}>
        <View style={styles.nameContainer}>
          <Text style={[styles.name, { color: themeColors.onNeutral }]}>
            {item.name}
          </Text>
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Trash2 size={16} color={themeColors.error} />
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.size, { color: themeColors.neutral }]}>
          {item.sizeName}
        </Text>
        <Text style={[styles.price, { color: themeColors.onNeutral }]}>
          {formatCurrency(item.price)} each
        </Text>
      </View>
      
      <View style={styles.quantityContainer}>
        <QuantitySelector
          quantity={item.quantity}
          onChangeQuantity={onUpdateQuantity}
        />
        <Text style={[styles.total, { color: themeColors.onNeutral }]}>
          {formatCurrency(itemTotal)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
  },
  itemDetails: {
    marginBottom: spacing.md,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  name: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
  },
  removeButton: {
    padding: spacing.xs,
  },
  size: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs,
  },
  price: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  total: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
  },
});

export default CartItem;