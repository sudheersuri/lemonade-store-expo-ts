import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity  } from 'react-native';
import { useRouter } from 'expo-router';
import { Beverage } from '@/types/beverage';
import { colors, darkColors } from './theme';
import { formatCurrency } from '@/utils/validation';
import { useAppSelector } from '@/redux/hooks';
import { selectTheme } from '@/redux/slices/uiSlice';

interface BeverageCardProps {
  beverage: Beverage;
}

const BeverageCard: React.FC<BeverageCardProps> = ({ beverage }) => {
  const router = useRouter();
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;
  
  const lowestPrice = beverage.sizes.reduce(
    (min, size) => (size.price < min ? size.price : min),
    beverage.sizes[0].price
  );

  const handlePress = () => {
    router.push(`/beverage/${beverage.id}`);
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: themeColors.white }]}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <Image source={{ uri: beverage.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.nameContainer}>
          <Text style={[styles.name, { color: themeColors.onNeutral }]}>
            {beverage.name}
          </Text>
          {beverage.new && (
            <View style={styles.newBadge}>
              <Text style={styles.badgeText}>New</Text>
            </View>
          )}
        </View>
        <Text style={[styles.description, { color: themeColors.neutral }]} numberOfLines={2}>
          {beverage.description}
        </Text>
        <Text style={[styles.price, { color: themeColors.onNeutral }]}>
          From {formatCurrency(lowestPrice)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
    borderWidth:0.3,
    borderColor:colors.onNeutralContainer
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    marginRight: 8,
  },
  newBadge: {
    backgroundColor: colors.error,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
  },
  badgeText: {
    color: colors.black,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  price: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
});

export default BeverageCard;