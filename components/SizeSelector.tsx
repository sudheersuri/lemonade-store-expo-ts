import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BeverageSize } from '@/types/beverage';
import { colors, darkColors, typography, spacing, borderRadius } from './theme';
import { formatCurrency } from '@/utils/validation';
import { useAppSelector } from '@/redux/hooks';
import { selectTheme } from '@/redux/slices/uiSlice';

interface SizeSelectorProps {
  sizes: BeverageSize[];
  selectedSizeId: string | null;
  onSelectSize: (size: BeverageSize) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSizeId,
  onSelectSize,
}) => {
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: themeColors.onNeutral }]}>
        Select Size
      </Text>
      <View style={styles.sizesContainer}>
        {sizes.map((size) => (
          <TouchableOpacity
            key={size.id}
            style={[
              styles.sizeButton,
              { 
                borderColor: selectedSizeId === size.id 
                  ? themeColors.primary 
                  : themeColors.neutralContainer,
                backgroundColor: selectedSizeId === size.id 
                  ? themeColors.primaryContainer 
                  : themeColors.white,
              },
            ]}
            onPress={() => onSelectSize(size)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.sizeName,
                { 
                  color: selectedSizeId === size.id 
                    ? themeColors.onPrimaryContainer 
                    : themeColors.onNeutral 
                },
              ]}
            >
              {size.name} ({size.oz} oz)
            </Text>
            <Text
              style={[
                styles.sizePrice,
                { 
                  color: selectedSizeId === size.id 
                    ? themeColors.onPrimaryContainer 
                    : themeColors.onNeutral 
                },
              ]}
            >
              {formatCurrency(size.price)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  title: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
    marginBottom: spacing.sm,
  },
  sizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs / 2,
  },
  sizeButton: {
    flex: 1,
    minWidth: '30%',
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginHorizontal: spacing.xs / 2,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  sizeName: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.xs,
    marginBottom: spacing.xs,
  },
  sizePrice: {
    fontFamily: typography.fontFamily.semiBold,
    fontSize: typography.fontSize.md,
  },
});

export default SizeSelector;