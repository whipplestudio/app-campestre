import { StatusBar } from 'expo-status-bar';
import { I18nextProvider } from 'react-i18next';
import { Platform, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import i18n from '../src/i18n/i18n';
import MainNavigator from '../src/navigation';

if (Platform.OS === 'web') {
  require('../global.css');
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <I18nextProvider i18n={i18n}>
        <SafeAreaProvider>
          <MainNavigator />
          <StatusBar style="auto" />
        </SafeAreaProvider>
      </I18nextProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
