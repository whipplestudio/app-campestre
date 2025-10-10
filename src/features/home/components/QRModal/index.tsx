import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import Modal from '../../../../shared/components/Modal/Modal';
import { COLORS } from '../../../../shared/theme/colors';

interface QRModalProps {
  visible: boolean;
  onClose: () => void;
  userName?: string;
  memberId?: string;
  memberSince?: string;
}

const QRModal: React.FC<QRModalProps> = ({ 
  visible, 
  onClose, 
  userName = 'Juan Pérez',
  memberId = '1',
  memberSince = '2020'
}) => {
  return (
    <Modal
      visible={visible}
      title="Mi código QR"
      onCancel={onClose}
      onConfirm={onClose}
      confirmText="Cerrar"
      showCancelButton={false}
      confirmButtonStyle={{
        width: '100%',
        paddingVertical: 14, 
        backgroundColor: COLORS.primary,
        borderRadius: 3,
        alignItems: 'center',
        marginHorizontal: -20, // Extiende el botón al borde del modal
        marginBottom: -20,     // Elimina espacio adicional
      }}
      confirmButtonTextStyle={{
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
      }}
      buttonsContainerStyle={{
        paddingHorizontal: 0,
        paddingVertical: 0,
        marginHorizontal: 20,
        marginBottom: 20,
      }}
      contentStyle={{ 
        alignItems: 'center', 
        padding: 20 
      }}
    >
      {/* Placeholder para el código QR */}
      <View 
        style={{ 
          width: 200, 
          height: 200, 
          backgroundColor: COLORS.gray100,
          justifyContent: 'center', 
          alignItems: 'center',
          borderRadius: 8,
          marginBottom: 20,
          borderWidth: 2,
          borderColor: COLORS.primaryLight,
          borderStyle: 'dashed',
        }}
      >
        <Ionicons name="qr-code-outline" size={100} color={COLORS.primary} />
      </View>
      
      {/* Nombre del socio en negrita */}
      <Text style={{ 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: COLORS.gray800,
        marginBottom: 5
      }}>
        {userName}
      </Text>
      
      {/* Tipo de socio y ID */}
      <Text style={{ 
        fontSize: 16, 
        color: COLORS.gray600,
        marginBottom: 5
      }}>
        Socio #{memberId}
      </Text>
      
      {/* Miembro desde */}
      <Text style={{ 
        fontSize: 14, 
        color: COLORS.gray500,
        marginBottom: 15
      }}>
        Socio desde {memberSince}
      </Text>
      
      {/* Leyenda */}
      <Text style={{ 
        fontSize: 14, 
        color: COLORS.gray700,
        textAlign: 'center',
        fontStyle: 'italic'
      }}>
        Presenta este código en recepción o cualquier área del club
      </Text>
    </Modal>
  );
};

export default QRModal;