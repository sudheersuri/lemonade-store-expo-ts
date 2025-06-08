import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, darkColors, typography, spacing, borderRadius } from './theme';
import { formatCurrency } from '@/utils/validation';
import { CartItem } from '@/types/beverage';
import { CustomerInfo } from '@/types/order';
import Button from './Button';
import { useAppSelector } from '@/redux/hooks';
import { selectTheme } from '@/redux/slices/uiSlice';

interface OrderSummaryProps {
  items: CartItem[];
  customer: CustomerInfo;
  totalAmount: number;
  onPlaceOrder: () => void;
  onEditCustomerInfo: () => void;
  isLoading?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  customer,
  totalAmount,
  onPlaceOrder,
  onEditCustomerInfo,
  isLoading = false,
}) => {
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;

  const tax = totalAmount * 0.13; // 8% tax
  const finalTotal = totalAmount + tax;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={[styles.title, { color: themeColors.onNeutral }]}>
        Order Summary
      </Text>
      
      <View style={[
        styles.section,
        { 
          backgroundColor: themeColors.white,
          borderColor: themeColors.neutralContainer
        }
      ]}>
        <Text style={[styles.sectionTitle, { color: themeColors.onNeutral }]}>
          Items
        </Text>
        {items.map((item, index) => (
          <View key={`${item.beverageId}-${item.sizeId}`} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { color: themeColors.onNeutral }]}>
                {item.name} ({item.sizeName})
              </Text>
              <Text style={[styles.itemQuantity, { color: themeColors.neutral }]}>
                x{item.quantity}
              </Text>
            </View>
            <Text style={[styles.itemPrice, { color: themeColors.onNeutral }]}>
              {formatCurrency(item.price * item.quantity)}
            </Text>
          </View>
        ))}
      </View>
      
      <View style={[
        styles.section,
        { 
          backgroundColor: themeColors.white,
          borderColor: themeColors.neutralContainer
        }
      ]}>
        <Text style={[styles.sectionTitle, { color: themeColors.onNeutral }]}>
          Customer Information
        </Text>
        <View style={styles.customerInfoContainer}>
          <View style={styles.customerInfo}>
            <Text style={[styles.customerInfoLabel, { color: themeColors.onNeutral }]}>
              Name:
            </Text>
            <Text style={[styles.customerInfoValue, { color: themeColors.onNeutral }]}>
              {customer.name}
            </Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={[styles.customerInfoLabel, { color: themeColors.onNeutral }]}>
              Email:
            </Text>
            <Text style={[styles.customerInfoValue, { color: themeColors.onNeutral }]}>
              {customer.email}
            </Text>
          </View>
          <View style={styles.customerInfo}>
            <Text style={[styles.customerInfoLabel, { color: themeColors.onNeutral }]}>
              Phone:
            </Text>
            <Text style={[styles.customerInfoValue, { color: themeColors.onNeutral }]}>
              {customer.phone}
            </Text>
          </View>
        </View>
        <Button
          title="Edit Info"
          onPress={onEditCustomerInfo}
          variant="outline"
          size="sm"
          textStyle={{
            color: themeColors.onPrimary
          }}
          style={styles.editButton}
        />
      </View>
      
      <View style={[
        styles.section,
        { 
          backgroundColor: themeColors.white,
          borderColor: themeColors.neutralContainer
        }
      ]}>
        <Text style={[styles.sectionTitle, { color: themeColors.onNeutral }]}>
          Payment Summary
        </Text>
        <View style={styles.paymentRow}>
          <Text style={[styles.paymentLabel, { color: themeColors.neutral }]}>
            Subtotal
          </Text>
          <Text style={[styles.paymentValue, { color: themeColors.onNeutral }]}>
            {formatCurrency(totalAmount)}
          </Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={[styles.paymentLabel, { color: themeColors.neutral }]}>
            Tax (13%)
          </Text>
          <Text style={[styles.paymentValue, { color: themeColors.onNeutral }]}>
            {formatCurrency(tax)}
          </Text>
        </View>
        <View style={[styles.paymentRow, styles.totalRow, { borderTopColor: themeColors.neutralContainer }]}>
          <Text style={[styles.totalLabel, { color: themeColors.onNeutral }]}>
            Total
          </Text>
          <Text style={[styles.totalValue, { color: themeColors.onNeutral }]}>
            {formatCurrency(finalTotal)}
          </Text>
        </View>
      </View>
      
      <Button
        title="Place Order"
        onPress={onPlaceOrder}
        textStyle={{
          color: colors.black
        }}
        fullWidth
        loading={isLoading}
        style={styles.placeOrderButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
  },
  sectionTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    marginBottom: spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
  },
  itemQuantity: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
  },
  itemPrice: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
  },
  customerInfoContainer: {
    marginBottom: spacing.sm,
  },
  customerInfo: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  customerInfoLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
    width: 80,
  },
  customerInfoValue: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    flex: 1,
  },
  editButton: {
    alignSelf: 'flex-start',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  paymentLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
  },
  paymentValue: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
  },
  totalRow: {
    borderTopWidth: 1,
    paddingTop: spacing.sm,
    marginTop: spacing.sm,
  },
  totalLabel: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
  },
  totalValue: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
  },
  placeOrderButton: {
    marginTop: spacing.sm,
  },
});

export default OrderSummary;