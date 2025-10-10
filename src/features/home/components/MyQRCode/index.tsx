import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import QRModal from '../QRModal';
import { useProfileStore } from '../../../profile/store/useProfileStore';
import styles from './Style';

const MyQRCode: React.FC = () => {
  const { profile } = useProfileStore();
  const [qrModalVisible, setQrModalVisible] = useState(false);

  const memberSinceYear = profile?.memberSince 
    ? new Date(profile.memberSince.toString()).getFullYear()
    : '2020';

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="qr-code-outline" size={20} color={COLORS.primary} />
        <Text style={styles.cardTitle}>Mi código QR</Text>
      </View>
      
      <View style={styles.qrContainer}>
        {/* Placeholder para el código QR */}
        <View 
          style={{ 
            width: 100, 
            height: 100, 
            backgroundColor: COLORS.gray200, 
            justifyContent: 'center', 
            alignItems: 'center',
            borderRadius: 8,
            marginBottom: 15
          }}
        >
          <Ionicons name="qr-code-outline" size={40} color={COLORS.gray500} />
        </View>
        
        <Text style={styles.userName}>{profile?.name || 'Nombre del Socio'}</Text>
        <Text style={styles.memberText}>Socio desde {memberSinceYear}</Text>
        
        <TouchableOpacity 
          style={styles.showQrButton}
          onPress={() => setQrModalVisible(true)}
        >
          <Text style={styles.showQrButtonText}>Mostrar QR completo</Text>
        </TouchableOpacity>
      </View>
      
      <QRModal 
        visible={qrModalVisible} 
        onClose={() => setQrModalVisible(false)}
        userName={profile?.name}
        memberId={profile?.id}
        memberSince={memberSinceYear.toString()}
      />
    </View>
  );
};

export default MyQRCode;