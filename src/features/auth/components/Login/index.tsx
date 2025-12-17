import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

//Alert 

//Styles
import styles from './Style';

//Messages
import useMessages from '../../hooks/useMessages';

//Interfaces
import { LoginFormProps } from '../../interfaces';

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading,
  emailError,
}) => {
  const { messages } = useMessages();

  return (
    <View style={styles.content}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{messages.LOGIN.EMAIL}</Text>
        <TextInput
          style={ emailError && email !== '' ? styles.inputError : styles.input}
          value={email}
          onChangeText={onEmailChange}
          placeholder={messages.LOGIN.EXAMPLE_EMAIL}
          placeholderTextColor={styles.inputPlaceholder.color}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>{messages.LOGIN.PASSWORD}</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={onPasswordChange}
          placeholder={messages.LOGIN.EXAMPLE_PASSWORD}
          placeholderTextColor={styles.inputPlaceholder.color}
          secureTextEntry
        />
      </View>

      <Pressable 
        style={({ pressed }) => [
          styles.loginButton,
          pressed && !isLoading && { opacity: 0.7 }
        ]}
        onPress={() => onSubmit(email, password)}
        disabled={isLoading}
        role="button"
      >
        <Text style={styles.buttonText}>
          {isLoading ? messages.LOGIN.LOADING : messages.LOGIN.BUTTON}
        </Text>
      </Pressable>

      <Pressable 
        style={({ pressed }) => [
          styles.forgotPasswordButton,
          pressed && { opacity: 0.7 }
        ]}
        role="button"
      >
        <Text style={styles.linkText}>{messages.LOGIN.FORGOT_PASSWORD}</Text>
      </Pressable>
    </View>
  );
};


