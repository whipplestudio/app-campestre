import React from 'react';
import { View, Text } from 'react-native';
import Modal from '../../../../shared/components/Modal/Modal';
import Button from '../../../../shared/components/Button/Button';
import { COLORS } from '../../../../shared/theme/colors';

interface WaiterModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const WaiterModal: React.FC<WaiterModalProps> = ({ visible, onClose, onConfirm }) => {
  const handleConfirm = () => {
    // Call the parent function to handle the waiter call with toast
    onConfirm?.();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Llamar Mesero"
      onCancel={onClose}
      onConfirm={handleConfirm}
      confirmText="Sí, llamar mesero"
      cancelText="Cancelar"
    >
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 16, color: COLORS.gray700, textAlign: 'center' }}>
          ¿Deseas que un mesero se acerque a tu ubicación actual?
        </Text>
      </View>
    </Modal>
  );
};

export default WaiterModal;