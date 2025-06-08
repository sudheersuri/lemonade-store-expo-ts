import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetOrderByIdQuery } from '@/redux/services/orderApi';
import OrderConfirmation from '@/components/OrderConfirmation';
import { colors, typography, spacing } from '@/components/theme';

export default function ConfirmationScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const router = useRouter();
  
  const { data: order, isLoading, error } = useGetOrderByIdQuery(orderId || '');
  
  // Redirect if no orderId parameter
  useEffect(() => {
    if (!orderId) {
      router.replace('/');
    }
  }, [orderId, router]);
  
  const handleContinueShopping = () => {
    router.push('/');
  };
  
  const handleViewOrders = () => {
    router.push('/orders');
  };
  
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading order details...</Text>
      </View>
    );
  }
  
  if (error || !order) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Something went wrong</Text>
        <Text style={styles.errorMessage}>
          We couldn't load your order details. Please check your orders section.
        </Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView edges={['bottom']}  style={styles.container}>
      <OrderConfirmation
        order={order}
        onContinueShopping={handleContinueShopping}
        onViewOrders={handleViewOrders}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
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
    color: colors.neutral,
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
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  errorMessage: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    color: colors.onNeutral,
    textAlign: 'center',
  },
});