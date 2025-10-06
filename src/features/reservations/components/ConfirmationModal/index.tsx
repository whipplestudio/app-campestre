import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import Modal from '../../../../shared/components/Modal/Modal';
import { COLORS } from '../../../../shared/theme/colors';
import useMessages from '../../hooks/useMessages';
import { ConfirmationModalProps } from '../../interfaces/reservationInterface';
import styles from './Style';

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, onClose }) => {
  const { messages } = useMessages();
  return (
    <Modal
      visible={visible}
      confirmText="Aceptar"
      onConfirm={onClose}
      onCancel={onClose}
      showCancelButton={false}
      containerStyle={ styles.modalConfirmation }
    >
      <View style={styles.viewContainer}>
        <View style={styles.ViewComponent}>
          <Ionicons name="checkmark-circle" size={50} color={COLORS.success} />
        </View>
        
        <Text style={styles.textTitle}>
          {messages.CONFIRMATIONMODAL.TITLE}
        </Text>
        
        <Text style={styles.textSubTitle}>
          {messages.CONFIRMATIONMODAL.MESSAGE}
        </Text>
      </View>
    </Modal>
  );
};