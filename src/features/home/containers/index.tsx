import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, View } from 'react-native';
import styles from './Style';

// Components
import ActiveOrders from '../components/ActiveOrders';
import GuestManagement from '../components/GuestManagement';
import Header from '../components/Header';
import MyQRCode from '../components/MyQRCode';
import MyRewards from '../components/MyRewards';
import QuickActions from '../components/QuickActions';

// Modal from shared components
import Modal from '../../../shared/components/Modal/Modal';

const HomeScreen = () => {
  const { t } = useTranslation();
  
  // State for notification modal
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const showNotification = useCallback((title: string, message: string) => {
    setNotificationTitle(title);
    setNotificationMessage(message);
    setNotificationModalVisible(true);
  }, []);

  const hideNotification = useCallback(() => {
    setNotificationModalVisible(false);
  }, []);

  const handleVehicleSelect = useCallback((vehicleId: string, vehicleName: string) => {
    showNotification("Solicitud exitosa", `Auto "${vehicleName}" solicitado correctamente. Llega en 5 min`);
  }, [showNotification]);

  const handleCallWaiter = useCallback(() => {
    showNotification("Mesero llamado", "El mesero llegará en 7 min");
  }, [showNotification]);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          <QuickActions 
            onVehicleSelect={handleVehicleSelect}
            onWaiterCall={handleCallWaiter}
          />
          <ActiveOrders />
          <MyQRCode />
          <GuestManagement />
          <MyRewards />
        </View>
      </ScrollView>
      
      {/* Notification Modal */}
      <Modal
        visible={notificationModalVisible}
        title={notificationTitle}
        message={notificationMessage}
        onConfirm={hideNotification}
        confirmText="Aceptar"
        showCancelButton={false}
        confirmButtonStyle={{
          width: '100%',
          paddingVertical: 15,
        }}
        buttonsContainerStyle={{
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      />
    </View>
  );
};

export default HomeScreen;
