import React from 'react';
import { Tabs } from 'expo-router';
import { useAppSelector } from '@/redux/hooks';
import { selectTheme } from '@/redux/slices/uiSlice';
import { selectCartItemsCount } from '@/redux/slices/cartSlice';
import { ShoppingCart, ClipboardList, GlassWater } from 'lucide-react-native';
import { colors, darkColors } from '@/components/theme';
import { Platform } from 'react-native';
import ThemeToggle from '@/components/ThemeToggle';

export default function TabLayout() {
  const cartItemsCount = useAppSelector(selectCartItemsCount);
  const theme = useAppSelector(selectTheme);
  
  const themeColors = theme === 'light' ? colors : darkColors;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.onPrimary,
        tabBarInactiveTintColor: themeColors.neutral,
        tabBarStyle: {
          backgroundColor: themeColors.white,
          borderTopColor: themeColors.neutralContainer,
          height: 90,
          paddingBottom: Platform.OS === 'ios' ? 28 : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
        headerShown: true,
        headerStyle: {
          backgroundColor: themeColors.primary,
        },
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          fontSize: 18,
          color: themeColors.onNeutral,
        },
        headerTintColor: themeColors.white,
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu',
          headerTitleStyle:{
            color: colors.black
          },
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <GlassWater size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          headerTitleStyle:{
            color: colors.black
          },
          tabBarLabel: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart size={size} color={color} />
          ),
          tabBarBadge: cartItemsCount > 0 ? cartItemsCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: themeColors.error,
            fontFamily: 'Inter-Medium',
          },
        }}
      />
      
      <Tabs.Screen
        name="orders"
        options={{
          title: 'My Orders',
          headerTitleStyle:{
            color: colors.black
          },
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <ClipboardList size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}