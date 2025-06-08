import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { selectCartItems, selectCartTotal, clearCart } from '@/redux/slices/cartSlice';
import { selectTheme } from '@/redux/slices/uiSlice';
import { useCreateOrderMutation } from '@/redux/services/orderApi';
import { CustomerInfo } from '@/types/order';
import CustomerForm from '@/components/CustomerForm';
import OrderSummary from '@/components/OrderSummary';
import { colors, darkColors } from '@/components/theme';

export default function CheckoutScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;
  
  const [showSummary, setShowSummary] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
  });
  
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  
  const handleCustomerInfoSubmit = (info: CustomerInfo) => {
    setCustomerInfo(info);
    setShowSummary(true);
  };
  
  const handlePlaceOrder = async () => {
    try {
      const order = await createOrder({
        orderNumber: "ORD"+ String(Math.floor(Math.random() * 10000)).padStart(4, '0'),
        customer: customerInfo,
        items: cartItems,
        totalAmount: cartTotal,
        status: 'completed',
        createdAt: new Date().toISOString()
      }).unwrap();
      
      dispatch(clearCart());
      router.push({
        pathname: '/confirmation',
        params: { orderId: order.id },
      });
    } catch (error) {
      console.error('Failed to create order:', error);
      // Handle error (could add error state and display)
    }
  };
  
  const handleEditCustomerInfo = () => {
    setShowSummary(false);
  };
  
  return (
    <SafeAreaView edges={['bottom']} style={[styles.container, { backgroundColor: themeColors.background }]}>
      {!showSummary ? (
        <CustomerForm
          onSubmit={handleCustomerInfoSubmit}
          isLoading={isLoading}
        />
      ) : (
        <OrderSummary
          items={cartItems}
          customer={customerInfo}
          totalAmount={cartTotal}
          onPlaceOrder={handlePlaceOrder}
          onEditCustomerInfo={handleEditCustomerInfo}
          isLoading={isLoading}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});