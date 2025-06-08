import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { useFonts } from 'expo-font';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { SplashScreen } from 'expo-router';
import { useAppSelector } from '@/redux/hooks';
import { selectTheme } from '@/redux/slices/uiSlice';
import { View } from 'react-native';
import { colors, darkColors } from '@/components/theme';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;

  return (
    <View style={{ flex: 1, backgroundColor: themeColors.white }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="beverage/[id]" options={{ 
          headerShown: true,
          title: 'Beverage Details',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: themeColors.primary,
          },
          headerTintColor: colors.black,
          headerTitleStyle: {
            fontFamily: 'Inter-SemiBold',
            color: colors.black,
          },
        }} />
        <Stack.Screen name="checkout" options={{ 
          headerShown: true,
          title: 'Checkout',
          headerBackTitle: 'Back',
          headerStyle: {
            backgroundColor: themeColors.primary,
          },
          headerTintColor: colors.black,
          headerTitleStyle: {
            fontFamily: 'Inter-SemiBold',
            color: colors.black,
          },
        }} />
        <Stack.Screen name="confirmation" options={{ 
          headerShown: true,
          title: 'Order Confirmation',
          headerBackTitle: 'Back',
          gestureEnabled: false,
          headerStyle: {
            backgroundColor: themeColors.primary,
          },
          headerTintColor: colors.black,
          headerTitleStyle: {
            fontFamily: 'Inter-SemiBold',
            color: colors.black,
          },
        }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style={'dark'} />
    </View>
  );
}

export default function RootLayout() {
  useFrameworkReady();
  
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after fonts have loaded (or an error was encountered)
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // If fonts haven't loaded and there is no error, return null to keep splash screen
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootLayoutNav />
    </Provider>
  );
}