export const validateName = (name: string): string | null => {
  if (!name.trim()) {
    return 'Name is required';
  }
  if (name.trim().length < 2) {
    return 'Name must be at least 2 characters';
  }
  return null;
};

export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'Email is required';
  }
  
  //email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) {
    return 'Phone number is required';
  }
  
  // 10 digits
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 10) {
    return 'Please enter a valid phone number (at least 10 digits)';
  }
  
  return null;
};

export const validateQuantity = (quantity: number): string | null => {
  if (quantity <= 0) {
    return 'Quantity must be at least 1';
  }
  if (quantity > 99) {
    return 'Maximum quantity exceeded';
  }
  return null;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
  }).format(amount);
};