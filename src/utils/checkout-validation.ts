interface CustomerInfo {
  email: string;
  firstName: string;
  lastName: string;
}

interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

// Email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Phone validation regex (supports various formats)
const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;

// Name validation regex (allows letters, spaces, hyphens, apostrophes)
const NAME_REGEX = /^[a-zA-Z\s\-']{2,50}$/;

/**
 * Validates email address format
 */
export const validateEmail = (email: string): string | null => {
  if (!email.trim()) {
    return 'Email address is required';
  }
  
  if (!EMAIL_REGEX.test(email.trim())) {
    return 'Please enter a valid email address';
  }
  
  if (email.length > 254) {
    return 'Email address is too long';
  }
  
  return null;
};

/**
 * Validates phone number format
 */
export const validatePhone = (phone: string): string | null => {
  if (!phone.trim()) {
    return 'Phone number is required';
  }
  
  // Remove all non-numeric characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  
  if (cleanPhone.length < 10) {
    return 'Phone number is too short';
  }
  
  if (cleanPhone.length > 17) {
    return 'Phone number is too long';
  }
  
  if (!PHONE_REGEX.test(cleanPhone)) {
    return 'Please enter a valid phone number';
  }
  
  return null;
};

/**
 * Validates name fields (first name, last name)
 */
export const validateName = (name: string, fieldName: string): string | null => {
  if (!name.trim()) {
    return `${fieldName} is required`;
  }
  
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters long`;
  }
  
  if (name.trim().length > 50) {
    return `${fieldName} must be less than 50 characters`;
  }
  
  if (!NAME_REGEX.test(name.trim())) {
    return `${fieldName} contains invalid characters`;
  }
  
  return null;
};

/**
 * Validates customer information for a specific checkout step
 */
export const validateCheckoutForm = (
  customerInfo: CustomerInfo, 
  step: number = 1
): ValidationResult => {
  const errors: { [key: string]: string } = {};
  
  if (step >= 1) {
    // Step 1: Contact information validation
    const emailError = validateEmail(customerInfo.email);
    if (emailError) errors.email = emailError;
    
    
    const firstNameError = validateName(customerInfo.firstName, 'First name');
    if (firstNameError) errors.firstName = firstNameError;
    
    const lastNameError = validateName(customerInfo.lastName, 'Last name');
    if (lastNameError) errors.lastName = lastNameError;
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates individual form fields for real-time validation
 */
export const validateField = (
  fieldName: keyof CustomerInfo, 
  value: string
): string | null => {
  switch (fieldName) {
    case 'email':
      return validateEmail(value);
    case 'firstName':
      return validateName(value, 'First name');
    case 'lastName':
      return validateName(value, 'Last name');
    default:
      return null;
  }
};

/**
 * Formats phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format US phone numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Format international numbers with country code
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  // Return original if can't format
  return phone;
};

/**
 * Sanitizes user input to prevent XSS and other security issues
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .substring(0, 255); // Limit length
};

/**
 * Validates promo code format
 */
export const validatePromoCode = (code: string): string | null => {
  if (!code.trim()) {
    return 'Promo code is required';
  }
  
  if (code.length < 3) {
    return 'Promo code is too short';
  }
  
  if (code.length > 20) {
    return 'Promo code is too long';
  }
  
  // Only allow alphanumeric characters and hyphens
  if (!/^[a-zA-Z0-9-]+$/.test(code)) {
    return 'Promo code contains invalid characters';
  }
  
  return null;
};

/**
 * Checks if all required checkout steps are complete
 */
export const isCheckoutComplete = (
  customerInfo: CustomerInfo,
  isAddressComplete: boolean = false,
  isPaymentComplete: boolean = false
): boolean => {
  const step1Valid = validateCheckoutForm(customerInfo, 1).isValid;
  return step1Valid && isAddressComplete && isPaymentComplete;
};

/**
 * Generates a formatted error message for display
 */
export const formatErrorMessage = (error: string): string => {
  return error.charAt(0).toUpperCase() + error.slice(1);
};

/**
 * Validates the entire checkout form before submission
 */
export const validateCompleteCheckout = (
  customerInfo: CustomerInfo,
  isAddressComplete: boolean,
  isPaymentComplete: boolean
): ValidationResult => {
  const formValidation = validateCheckoutForm(customerInfo, 1);
  const errors = { ...formValidation.errors };
  
  if (!isAddressComplete) {
    errors.address = 'Please complete your billing address';
  }
  
  if (!isPaymentComplete) {
    errors.payment = 'Please enter your payment information';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Export types for use in components
export type { CustomerInfo, ValidationResult };