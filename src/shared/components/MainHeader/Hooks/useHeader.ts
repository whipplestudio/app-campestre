import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
    Notifications: undefined;
    // Agrega otras rutas aquí según sea necesario
  };

export const useHeader = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const toggleDrawer = () => {
    navigation.dispatch(DrawerActions.toggleDrawer());
  };

  const handleNotifications = () => {
    // Navegar a la pantalla de notificaciones
    navigation.navigate('Notifications');
  };

  return {  
    toggleDrawer,
    handleNotifications
  }
}
