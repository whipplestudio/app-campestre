import { useTranslation } from 'react-i18next';

const useMessages = () => {
    const { t } = useTranslation();
    const messages = {
      CONTAINER: {
        TITLE: t('auth.container.title'),
      },
      LOGO: {
        TITLE: t('auth.logo.name'),
        SUBTITLE: t('auth.logo.place'),
      },
      LOGIN: {
        EMAIL: t('auth.login.email'),
        PASSWORD: t('auth.login.password'),
        BUTTON: t('auth.login.loginButton'),
        FORGOT_PASSWORD: t('auth.login.forgotPassword'),
        LOADING: t('auth.login.loading'),
        EXAMPLE_EMAIL: t('auth.common.exampleEmail'),
        EXAMPLE_PASSWORD: t('auth.common.examplePassword'),
      }
    };
  
    return { messages };
  };
  
  export default useMessages;