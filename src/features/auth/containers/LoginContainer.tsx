import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, SafeAreaView } from 'react-native';
import { useStore } from '../../../store';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const LoginContainer = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useStore();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(t('common.error'), 'Please enter both email and password');
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        // Navigate to main app after successful login
        // @ts-ignore - we'll handle navigation properly in the actual app
        navigation.navigate('MainTabs');
      } else {
        Alert.alert(t('common.error'), 'Invalid credentials');
      }
    } catch (error) {
      Alert.alert(t('common.error'), 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo/Branding */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Club Campestre</Text>
          <Text style={styles.subtitleText}>Tampico</Text>
        </View>

        <Text style={styles.title}>{t('login.title')}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('login.email')}</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="email@clubtampico.com"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t('login.password')}</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder={t('login.password')}
            secureTextEntry
          />
        </View>

        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? t('common.loading') : t('login.loginButton')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.forgotPasswordButton}>
          <Text style={styles.linkText}>{t('login.forgotPassword')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  subtitleText: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#1F2937',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#374151',
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  loginButton: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  linkText: {
    color: '#4A90E2',
    fontSize: 14,
  },
});

export default LoginContainer;