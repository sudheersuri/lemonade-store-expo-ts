import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { CustomerInfo } from '@/types/order';
import { colors, darkColors, typography, spacing, borderRadius } from './theme';
import Button from './Button';
import { validateName, validateEmail, validatePhone } from '@/utils/validation';
import { useAppSelector } from '@/redux/hooks';
import { selectTheme } from '@/redux/slices/uiSlice';

interface CustomerFormProps {
  onSubmit: (customerInfo: CustomerInfo) => void;
  isLoading?: boolean;
}

const CustomerForm: React.FC<CustomerFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const theme = useAppSelector(selectTheme);
  const themeColors = theme === 'light' ? colors : darkColors;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const [errors, setErrors] = useState<{
    name: string | null;
    email: string | null;
    phone: string | null;
  }>({
    name: null,
    email: null,
    phone: null,
  });

  const validateForm = (): boolean => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneError = validatePhone(phone);

    setErrors({
      name: nameError,
      email: emailError,
      phone: phoneError,
    });

    return !nameError && !emailError && !phoneError;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.title, { color: themeColors.onNeutral }]}>
          Customer Information
        </Text>
        <Text style={[styles.subtitle, { color: themeColors.neutral }]}>
          Please provide your details for the order
        </Text>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: themeColors.onNeutral }]}>
            Name
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                borderColor: errors.name ? themeColors.error : themeColors.neutralContainer,
                backgroundColor: themeColors.white,
                color: themeColors.onNeutral
              }
            ]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
             placeholderTextColor={themeColors.neutral}
            autoCapitalize="words"
          />
          {errors.name && (
            <Text style={[styles.errorText, { color: themeColors.error }]}>
              {errors.name}
            </Text>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: themeColors.onNeutral }]}>
            Email
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                borderColor: errors.email ? themeColors.error : themeColors.neutralContainer,
                backgroundColor: themeColors.white,
                color: themeColors.onNeutral
              }
            ]}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address"
             placeholderTextColor={themeColors.neutral}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && (
            <Text style={[styles.errorText, { color: themeColors.error }]}>
              {errors.email}
            </Text>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: themeColors.onNeutral }]}>
            Phone
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                borderColor: errors.phone ? themeColors.error : themeColors.neutralContainer,
                backgroundColor: themeColors.white,
                color: themeColors.onNeutral
              }
            ]}
            value={phone}
            onChangeText={setPhone}
            placeholder="Enter your phone number"
             placeholderTextColor={themeColors.neutral}
            keyboardType="phone-pad"
          />
          {errors.phone && (
            <Text style={[styles.errorText, { color: themeColors.error }]}>
              {errors.phone}
            </Text>
          )}
        </View>
        
        <Button
          title="Continue to Review"
          onPress={handleSubmit}
          fullWidth
          textStyle={{
            color: colors.black
          }}
          loading={isLoading}
          style={styles.submitButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: spacing.md,
    flexGrow: 1,
  },
  title: {
    fontFamily: typography.fontFamily.bold,
    fontSize: typography.fontSize.xl,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
    marginBottom: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    fontFamily: typography.fontFamily.medium,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.md,
  },
  errorText: {
    fontFamily: typography.fontFamily.regular,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.xs,
  },
  submitButton: {
    marginTop: spacing.md,
  },
});

export default CustomerForm;