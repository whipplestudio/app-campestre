import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../../../shared/components/Button/Button';
import styles from './Style';

const GuestManagement: React.FC = () => {
  const activeGuests = 2;  // Número de invitados activos
  const totalPasses = 5;   // Número total de pases temporales

  const handleNewPass = () => {
    // Mostrar alerta de funcionalidad no implementada
    alert('Funcionalidad en desarrollo: Nuevo Pase');
  };

  const handleViewGuests = () => {
    // Mostrar alerta de funcionalidad no implementada
    alert('Funcionalidad en desarrollo: Ver invitados');
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="people-outline" size={20} color={COLORS.primary} />
        <Text style={styles.cardTitle}>Gestión de Invitados</Text>
      </View>
      
      <View style={styles.guestSection}>
        <Text style={styles.sectionTitle}>Invitados Activos</Text>
        <View style={styles.pasesContainer}>
          <Text style={styles.pasesText}>{totalPasses} pases temporales vigentes</Text>
          <View style={styles.activeLabel}>
            <Text style={styles.activeLabelText}>{activeGuests} activos</Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            text="+ Nuevo Pase"
            variant="filled"
            onPress={handleNewPass}
            style={styles.button}
          />
          <Button
            text="Ver invitados"
            variant="outline"
            onPress={handleViewGuests}
            style={styles.button}
          />
        </View>
      </View>
      
      <View style={styles.infoLabel}>
        <Ionicons name="bulb-outline" size={16} color={COLORS.primary} style={styles.infoIcon} />
        <Text style={styles.infoText}>Los pases temporales son válidos por 24 horas</Text>
      </View>
    </View>
  );
};

export default GuestManagement;