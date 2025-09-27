import { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { authService } from '../services/authService';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      Alert.alert(t('common.error'), 'Please enter both email and password');
      return false;
    }

    setIsLoading(true);
    try {
      const success = await authService.login(email, password);
      if (success) {
        // @ts-ignore - we'll handle navigation properly in the actual app
        navigation.navigate('MainTabs');
        return true;
      } else {
        Alert.alert(t('common.error'), 'Invalid credentials');
        return false;
      }
    } catch (error) {
      Alert.alert(t('common.error'), 'An error occurred during login');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogin,
  };
};
