import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal as RNModal } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import styles from './Style';
import Button from '../../../../shared/components/Button/Button';
import { useProfileStore } from '../../../profile/store/useProfileStore';

interface GuestManagementProps {
  onNewPassPress: () => void;
  onViewGuestsPress: () => void;
}

const GuestManagement: React.FC<GuestManagementProps> = ({ onNewPassPress, onViewGuestsPress }) => {
  const activeGuests = 2;  // Número de invitados activos
  const totalPasses = 5;   // Número total de pases temporales
  const { profile } = useProfileStore();
  const [showGuestRestrictionModal, setShowGuestRestrictionModal] = useState(false);

  console.log('el profile en guest es: ', profile);

  const handleNewPassPress = () => {
    if (profile?.type === 'SOCIO') {
      onNewPassPress();
    } else {
      setShowGuestRestrictionModal(true);
    }
  };
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="people-outline" size={24} color={COLORS.primary} />
        <Text style={styles.cardTitle}>Gestión de Invitados</Text>
      </View>

      <View style={styles.guestSection}>
        {/*<Text style={styles.sectionTitle}>Invitados Activos</Text>
        <View style={styles.pasesContainer}>
          <Text style={styles.pasesText}>{totalPasses} pases temporales vigentes</Text>
          <View style={styles.activeLabel}>
            <Text style={styles.activeLabelText}>{activeGuests} activos</Text>
          </View>
        </View>*/}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.filledButton}
            onPress={handleNewPassPress}
          >
            <Text style={styles.filledButtonText}>+ Nuevo Pase</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.outlineButton}
            onPress={onViewGuestsPress}
          >
            <Text style={styles.outlineButtonText}>Ver invitados</Text>
          </TouchableOpacity>
        </View>

        {/* Restriction Modal */}
        <RNModal
          animationType="none"
          transparent={true}
          visible={showGuestRestrictionModal}
          onRequestClose={() => setShowGuestRestrictionModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Acceso Restringido</Text>
              <Text style={styles.modalMessage}>Un invitado no puede generar nuevos pases. Solo los socios tienen este privilegio.</Text>
              <View style={styles.modalButtonContainer}>
                <Button
                  text="Aceptar"
                  onPress={() => setShowGuestRestrictionModal(false)}
                  variant="primary"
                  style={styles.modalButton}
                />
              </View>
            </View>
          </View>
        </RNModal>
      </View>

      {/*<View style={styles.infoLabel}>
        <Ionicons name="bulb-outline" size={18} color="#F59E0B" style={styles.infoIcon} />
        <Text style={styles.infoText}>Los pases temporales son válidos por 24 horas</Text>
      </View>*/}
    </View>
  );
};

export default GuestManagement;