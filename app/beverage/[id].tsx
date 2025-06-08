import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetBeverageByIdQuery } from '@/redux/services/beverageApi';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { addToCart } from '@/redux/slices/cartSlice';
import { BeverageSize } from '@/types/beverage';
import SizeSelector from '@/components/SizeSelector';
import QuantitySelector from '@/components/QuantitySelector';
import Button from '@/components/Button';
import { colors, typography, spacing, borderRadius, darkColors } from '@/components/theme';
import { ShoppingCart } from 'lucide-react-native';
import { formatCurrency } from '@/utils/validation';
import { selectTheme } from '@/redux/slices/uiSlice';

export default function BeverageDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { data: beverage, isLoading, error } = useGetBeverageByIdQuery(id || '');
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;
    
  const [selectedSize, setSelectedSize] = useState<BeverageSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const handleSizeSelect = (size: BeverageSize) => {
    setSelectedSize(size);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    if (beverage && selectedSize) {
      dispatch(
        addToCart({
          beverage,
          size: selectedSize,
          quantity,
        })
      );
      router.push('/cart');
    }
  };
  
  if (isLoading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: themeColors.white }]}>
        <ActivityIndicator size="large" color={themeColors.primary} />
        <Text style={[styles.loadingText, { color: themeColors.neutral }]}>
          Loading beverage details...
        </Text>
      </View>
    );
  }
  
  if (error || !beverage) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: themeColors.white }]}>
        <Text style={[styles.errorTitle, { color: themeColors.error }]}>
          Something went wrong
        </Text>
        <Text style={[styles.errorMessage, { color: themeColors.onNeutral }]}>
          We couldn't load the beverage details. Please try again.
        </Text>
        <Button
           textStyle={{
                      color:colors.black
          }}
          title="Go Back"
          onPress={() => router.back()}
          style={styles.errorButton}
        />
      </View>
    );
  }

  const totalPrice = selectedSize ? selectedSize.price * quantity : 0;
  
  return (
    <SafeAreaView edges={['bottom']}  style={[styles.container, { backgroundColor: themeColors.white }]}>
      <ScrollView>
        <Image source={{ uri: beverage.image }} style={styles.image} />
        
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: themeColors.onNeutral }]}>
              {beverage.name}
            </Text>
            <View style={styles.badgeContainer}>
              {beverage.new && (
                <View style={[styles.badge, styles.newBadge]}>
                  <Text style={styles.badgeText}>New</Text>
                </View>
              )}
            </View>
          </View>
          
          <Text style={[styles.description, { color: themeColors.onNeutral }]}>
            {beverage.description}
          </Text>
          
          <SizeSelector
            sizes={beverage.sizes}
            selectedSizeId={selectedSize?.id || null}
            onSelectSize={handleSizeSelect}
          />
          
          <QuantitySelector
            quantity={quantity}
            onChangeQuantity={handleQuantityChange}
          />
        </View>
      </ScrollView>
      
      <View style={[styles.footer, { 
        backgroundColor: themeColors.white,
        borderTopColor: themeColors.neutralContainer
      }]}>
        <View style={styles.priceContainer}>
          <Text style={[styles.priceLabel, { color: themeColors.neutral }]}>
            Total
          </Text>
          <Text style={[styles.price, { color: themeColors.onNeutral }]}>
            {selectedSize ? formatCurrency(totalPrice) : 'Select a size'}
          </Text>
        </View>
        
        <Button
          title="Add to Cart"
          onPress={handleAddToCart}
          disabled={!selectedSize}
          textStyle={{
            color: colors.black
          }}
          icon={<ShoppingCart size={18} color={colors.black} />}
        />
      </View>
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
    marginBottom: spacing.lg,
  },
  errorButton: {
    minWidth: 120,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: spacing.md,
  },
  headerContainer: {
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xxl,
    marginBottom: spacing.xs,
  },
  badgeContainer: {
    flexDirection: 'row',
    marginTop: spacing.xs,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.full,
    marginRight: spacing.sm,
  },
  newBadge: {
    backgroundColor: colors.error,
  },
  badgeText: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    color: colors.black,
  },
  description: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    lineHeight: typography.lineHeight.normal * typography.fontSize.md,
    marginBottom: spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderTopWidth: 1,
  },
  priceContainer: {
    flex: 1,
    marginRight: spacing.md,
  },
  priceLabel: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs / 2,
  },
  price: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.lg,
  },
});