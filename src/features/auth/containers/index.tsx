import React from 'react';
import { SafeAreaView, Text } from 'react-native';

// Styles
import styles from './Style';

// Components
import { LoginForm } from '../components/Login';
import Logo from '../components/Logo';

// Hooks
import { useLogin } from '../hooks/useLogin';
import useMessages from '../hooks/useMessages';

const LoginContainer = () => {
  const { email, password, isLoading, emailError, setEmail, setPassword, handleLogin } = useLogin();
  const { messages } = useMessages();

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.title}>{messages.CONTAINER.TITLE}</Text>
      <LoginForm
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
        isLoading={isLoading}
        emailError={emailError}
      />
    </SafeAreaView>
  );
};
export default LoginContainer;