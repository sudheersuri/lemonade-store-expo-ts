import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Check } from 'lucide-react-native';
import { colors, darkColors, typography, spacing, borderRadius } from './theme';
import Button from './Button';
import { Order } from '@/types/order';
import { useAppSelector } from '@/redux/hooks';
import { selectTheme } from '@/redux/slices/uiSlice';

interface OrderConfirmationProps {
  order: Order;
  onContinueShopping: () => void;
  onViewOrders: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  order,
  onContinueShopping,
  onViewOrders,
}) => {
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: themeColors.white }]} 
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.successIconContainer}>
        <View style={[styles.successIcon, { backgroundColor: themeColors.success }]}>
          <Check size={40} color={colors.white} />
        </View>
      </View>
      
      <Text style={[styles.title, { color: themeColors.onNeutral }]}>
        Order Confirmed!
      </Text>
      <Text style={[styles.subtitle, { color: themeColors.neutral }]}>
        Thanks for your order
      </Text>
      
      <View style={[
        styles.orderInfoContainer,
        { 
          backgroundColor: themeColors.background,
          borderColor: themeColors.neutralContainer
        }
      ]}>
        <View style={styles.orderInfoRow}>
          <Text style={[styles.orderInfoLabel, { color: themeColors.onNeutral }]}>
            Order Number:
          </Text>
          <Text style={[styles.orderInfoValue, { color: themeColors.onNeutral }]}>
            {order.orderNumber}
          </Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={[styles.orderInfoLabel, { color: themeColors.onNeutral }]}>
            Date:
          </Text>
          <Text style={[styles.orderInfoValue, { color: themeColors.onNeutral }]}>
            {new Date(order.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.orderInfoRow}>
          <Text style={[styles.orderInfoLabel, { color: themeColors.onNeutral }]}>
            Status:
          </Text>
          <View style={[styles.statusBadge, { backgroundColor: themeColors.primary }]}>
            <Text style={[styles.statusText]}>
              {order.status}
            </Text>
          </View>
        </View>
      </View>
      
      <View style={[
        styles.summaryContainer,
        { 
          backgroundColor: themeColors.white,
          borderColor: themeColors.neutralContainer
        }
      ]}>
        <Text style={[styles.summaryTitle, { color: themeColors.onNeutral }]}>
          Order Summary
        </Text>
        
        {order.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <View style={styles.itemInfo}>
              <Text style={[styles.itemName, { color: themeColors.neutral }]}>
                {item.name} ({item.sizeName})
              </Text>
              <Text style={[styles.itemQuantity, { color: themeColors.neutral }]}>
                x{item.quantity}
              </Text>
            </View>
            <Text style={[styles.itemPrice, { color: themeColors.onNeutral }]}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        
        <View style={[styles.totalRow, { borderTopColor: themeColors.neutralContainer }]}>
          <Text style={[styles.totalLabel, { color: themeColors.onNeutral }]}>
            Total Amount
          </Text>
          <Text style={[styles.totalValue, { color: themeColors.onNeutral }]}>
            ${order.totalAmount.toFixed(2)}
          </Text>
        </View>
      </View>
      
      <View style={styles.buttonsContainer}>
        <Button
          title="Continue Shopping"
          textStyle={{
            color: colors.black
          }}
          onPress={onContinueShopping}
          style={styles.button}
          fullWidth
        />
        <Button
          title="View My Orders"
          onPress={onViewOrders}
          variant="outline"
          textStyle={{
            color: themeColors.onPrimary
          }}
          style={styles.button}
          fullWidth
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
    alignItems: 'center',
  },
  successIconContainer: {
    marginVertical: spacing.xl,
    alignItems: 'center',
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.lg,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  orderInfoContainer: {
    width: '100%',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
  },
  orderInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  orderInfoLabel: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
  },
  orderInfoValue: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.full,
  },
  statusText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    textTransform: 'capitalize',
  },
  summaryContainer: {
    width: '100%',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
  },
  summaryTitle: {
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
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: spacing.sm,
    marginTop: spacing.sm,
  },
  totalLabel: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
  },
  totalValue: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
  },
  buttonsContainer: {
    width: '100%',
  },
  button: {
    marginBottom: spacing.md,
  },
});

export default OrderConfirmation;