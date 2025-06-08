import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  selectCartItems,
  selectCartTotal,
  updateQuantity,
  removeFromCart,
} from '@/redux/slices/cartSlice';
import { selectTheme } from '@/redux/slices/uiSlice';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import EmptyState from '@/components/EmptyState';
import { colors, darkColors, spacing, typography } from '@/components/theme';
import { formatCurrency } from '@/utils/validation';

export default function CartScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;
  
  const handleUpdateQuantity = (beverageId: string, sizeId: string, quantity: number) => {
    dispatch(updateQuantity({ beverageId, sizeId, quantity }));
  };
  
  const handleRemoveItem = (beverageId: string, sizeId: string) => {
    dispatch(removeFromCart({ beverageId, sizeId }));
  };
  
  const handleCheckout = () => {
    router.push('/checkout');
  };
  
  const handleContinueShopping = () => {
    router.push('/');
  };
  
  if (cartItems.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        message="Add some delicious beverages to get started"
        actionLabel="Browse Menu"
        onAction={handleContinueShopping}
      />
    );
  }
  
  return (
    <SafeAreaView edges={['bottom']}  style={[styles.container, { backgroundColor: themeColors.white }]}>
      <ScrollView style={{ backgroundColor: themeColors.background }}>
        <Text style={[styles.title, { color: themeColors.onNeutral }]}>Your Cart</Text>
        <View style={styles.itemsContainer}>
          {cartItems.map((item) => (
            <CartItem
              key={`${item.beverageId}-${item.sizeId}`}
              item={item}
              onUpdateQuantity={(quantity) =>
                handleUpdateQuantity(item.beverageId, item.sizeId, quantity)
              }
              onRemove={() => handleRemoveItem(item.beverageId, item.sizeId)}
            />
          ))}
        </View>
      </ScrollView>
      
      <View style={[
        styles.summaryContainer, 
        { 
          backgroundColor: themeColors.white, 
          borderTopColor: themeColors.neutralContainer 
        }
      ]}>
        <View style={styles.row}>
          <Text style={[styles.summaryLabel, { color: themeColors.onNeutral }]}>
            Subtotal
          </Text>
          <Text style={[styles.summaryValue, { color: themeColors.onNeutral }]}>
            {formatCurrency(cartTotal)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={[styles.summaryLabel, { color: themeColors.onNeutral }]}>
            Tax (13%)
          </Text>
          <Text style={[styles.summaryValue, { color: themeColors.onNeutral }]}>
            {formatCurrency(cartTotal * 0.08)}
          </Text>
        </View>
        <View style={[styles.row, styles.totalRow, { borderTopColor: themeColors.neutralContainer }]}>
          <Text style={[styles.totalLabel, { color: themeColors.onNeutral }]}>
            Total
          </Text>
          <Text style={[styles.totalValue, { color: themeColors.onNeutral }]}>
            {formatCurrency(cartTotal * 1.08)}
          </Text>
        </View>
        
        <Button
          title="Proceed to Checkout"
          textStyle={{
            color:colors.black
          }}
          onPress={handleCheckout}
          fullWidth
          style={styles.checkoutButton}
        />
        <Button
          title="Continue Shopping"
          textStyle={{
            color:themeColors.onPrimary
          }}
          onPress={handleContinueShopping}
          variant="outline"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    margin: spacing.md,
  },
  itemsContainer: {
    padding: spacing.md,
  },
  summaryContainer: {
    padding: spacing.md,
    borderTopWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  summaryLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
  },
  summaryValue: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
  },
  totalRow: {
    marginBottom: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
  },
  totalLabel: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
  },
  totalValue: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
  },
  checkoutButton: {
    marginBottom: spacing.sm,
  },
});