import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useGetOrdersQuery } from '@/redux/services/orderApi';
import { Order } from '@/types/order';
import EmptyState from '@/components/EmptyState';
import { colors, darkColors, typography, spacing, borderRadius } from '@/components/theme';
import { formatCurrency } from '@/utils/validation';
import { useAppSelector } from '@/redux/hooks';
import { selectTheme } from '@/redux/slices/uiSlice';

export default function OrdersScreen() {
  const router = useRouter();
  const { data: orders, isLoading, error, refetch } = useGetOrdersQuery();
  const [refreshing, setRefreshing] = useState(false);
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      style={[styles.orderCard, { 
        backgroundColor: themeColors.white,
        borderColor: themeColors.neutralContainer
      }]}
      activeOpacity={0.8}
    >
      <View style={[styles.orderHeader, { borderBottomColor: themeColors.neutralContainer }]}>
        <View>
          <Text style={[styles.orderNumber, { color: themeColors.onNeutral }]}>
            #{item.orderNumber}
          </Text>
          <Text style={[styles.orderDate, { color: themeColors.neutral }]}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor:
                  item.status === 'completed'
                    ? themeColors.success
                    : item.status === 'cancelled'
                    ? themeColors.error
                    : themeColors.primary,
              },
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
      </View>

      <View style={styles.orderItems}>
        <Text style={[styles.itemsTitle, { color: themeColors.onNeutral }]}>Items</Text>
        {item.items.map((orderItem, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={[styles.itemQuantity, { color: themeColors.neutral }]}>
              x{orderItem.quantity}
            </Text>
            <Text style={[styles.itemName, { color: themeColors.onNeutral }]}>
              {orderItem.name} ({orderItem.sizeName})
            </Text>
            <Text style={[styles.itemPrice, { color: themeColors.onNeutral }]}>
              {formatCurrency(orderItem.price * orderItem.quantity)}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.orderFooter, { borderTopColor: themeColors.neutralContainer }]}>
        <Text style={[styles.totalLabel, { color: themeColors.onNeutral }]}>Total:</Text>
        <Text style={[styles.totalValue, { color: themeColors.onNeutral }]}>
          {formatCurrency(item.totalAmount)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (isLoading && !refreshing) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: themeColors.white }]}>
        <ActivityIndicator size="large" color={themeColors.primary} />
        <Text style={[styles.loadingText, { color: themeColors.neutral }]}>
          Loading orders...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: themeColors.white }]}>
        <Text style={[styles.errorTitle, { color: themeColors.error }]}>
          Something went wrong
        </Text>
        <Text style={[styles.errorMessage, { color: themeColors.onNeutral }]}>
          We couldn't load your orders. Please try again.
        </Text>
      </View>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        message="Your order history will appear here"
        actionLabel="Start Ordering"
        onAction={handleContinueShopping}
      />
    );
  }

  return (
    <SafeAreaView edges={['bottom']}  style={[styles.container, { backgroundColor: themeColors.white }]}>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.ordersList}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.md,
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorTitle: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  errorMessage: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    textAlign: 'center',
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    margin: spacing.md,
  },
  ordersList: {
    padding: spacing.md,
  },
  orderCard: {
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    padding: spacing.md,
    borderWidth: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
  },
  orderNumber: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
  },
  orderDate: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs / 2,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.full,
  },
  statusText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.black,
    textTransform: 'capitalize',
  },
  orderItems: {
    marginBottom: spacing.md,
  },
  itemsTitle: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    marginBottom: spacing.xs,
  },
  itemQuantity: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    width: 30,
  },
  itemName: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    flex: 1,
  },
  itemPrice: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    width: 60,
    textAlign: 'right',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.sm,
    borderTopWidth: 1,
  },
  totalLabel: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
  },
  totalValue: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.md,
  },
});