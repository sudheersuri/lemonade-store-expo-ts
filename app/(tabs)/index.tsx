import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetBeveragesQuery } from '@/redux/services/beverageApi';
import BeverageCard from '@/components/BeverageCard';
import { colors, darkColors, spacing, typography } from '@/components/theme';
import { useAppSelector } from '@/redux/hooks';
import { selectTheme } from '@/redux/slices/uiSlice';


export default function MenuScreen() {
  const { data: beverages, isLoading, error, refetch } = useGetBeveragesQuery();
  const [refreshing, setRefreshing] = useState(false);
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };


  if (isLoading && !refreshing) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: themeColors.white }]}>
        <ActivityIndicator size="large" color={themeColors.primary} />
        <Text style={[styles.loadingText, { color: themeColors.neutral }]}>
          Loading beverages...
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
          We couldn't load the menu. Please try again.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView edges={['bottom']}  style={[styles.container, { backgroundColor: themeColors.white }]}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.sectionContainer}>
          <View style={styles.beverageGrid}>
            {beverages?.map((beverage) => (
              <View 
                key={beverage.id} 
                style={[
                  styles.beverageItem,
                  isTablet && { width: '48%' }
                ]}
              >
                <BeverageCard beverage={beverage} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
    fontFamily: 'Inter-Medium',
    fontSize: typography.fontSize.md
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: typography.fontSize.xl,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  errorMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: typography.fontSize.md,
    textAlign: 'center',
  },
  headerContainer: {
    padding: spacing.md,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: typography.fontSize.xxl,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: typography.fontSize.md,
    marginBottom: spacing.sm,
  },
  sectionContainer: {
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: typography.fontSize.lg,
    marginBottom: spacing.md,
  },
  beverageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  beverageItem: {
    width: '100%',
    marginBottom: spacing.md,
  },
});