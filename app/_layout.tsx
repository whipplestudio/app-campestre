import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import MainNavigator from '../src/navigation';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n/i18n';

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <MainNavigator />
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </I18nextProvider>
  );
}
