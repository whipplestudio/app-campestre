import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useStore } from '../store';
import { useTranslation } from 'react-i18next';

// Import feature containers
import LoginScreen from '../features/auth/containers/LoginContainer';
import ProfileScreen from '../features/profile/containers/ProfileContainer';
import MenusScreen from '../features/menus/containers/MenusContainer';
import EventsScreen from '../features/events/containers/EventsContainer';
import SurveysScreen from '../features/surveys/containers/SurveysContainer';

// Create stack navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Protected Tab Navigator (for authenticated users)
const ProtectedTabNavigator = () => {
  const { t } = useTranslation();
  
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#4A90E2',
        tabBarInactiveTintColor: '#9CA3AF',
      }}
    >
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ 
          title: t('profile.title'),
        }}
      />
      <Tab.Screen 
        name="Menus" 
        component={MenusScreen} 
        options={{ 
          title: t('menus.title'),
        }}
      />
      <Tab.Screen 
        name="Events" 
        component={EventsScreen} 
        options={{ 
          title: t('events.title'),
        }}
      />
      <Tab.Screen 
        name="Surveys" 
        component={SurveysScreen} 
        options={{ 
          title: t('surveys.title'),
        }}
      />
    </Tab.Navigator>
  );
};

// Main navigator (without NavigationContainer since Expo Router provides it)
const MainNavigator = () => {
  const { isAuthenticated } = useStore();
  const { t } = useTranslation();
  
  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? 'MainTabs' : 'Login'}
      screenOptions={{
        headerShown: false,
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: t('login.title') }}
        />
      ) : null}
      
      <Stack.Screen 
        name="MainTabs" 
        component={ProtectedTabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;