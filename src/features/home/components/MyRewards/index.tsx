import React from 'react';
import { View, Text } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../../../shared/components/Button/Button';
import styles from './Style';

const MyRewards: React.FC = () => {
  // Simular datos de puntos del usuario - en una implementación real, estos vendrían de un store o API
  const points = 2450;
  const pointsExpiration = 'dic 2024';

  const handleViewCatalog = () => {
    // Mostrar alerta de funcionalidad no implementada
    alert('Funcionalidad en desarrollo: Catálogo de Recompensas');
  };

  // Función para determinar el color de los puntos según la cantidad
  const getPointsColor = () => {
    if (points > 5000) return COLORS.primary;
    if (points > 2000) return COLORS.success;
    return COLORS.warning;
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="gift-outline" size={20} color={COLORS.primary} />
        <Text style={styles.cardTitle}>Mis Recompensas</Text>
      </View>
      
      <View style={styles.rewardsContainer}>
        <View style={styles.rewardsHeader}>
          <Text style={styles.rewardsTitle}>Puntos Acumulados</Text>
          <Text style={styles.rewardsSubtitle}>Válidos hasta {pointsExpiration}</Text>
        </View>
        
        <View style={styles.pointsContainer}>
          <Ionicons name="star" size={24} color={getPointsColor()} style={styles.starIcon} />
          <Text style={[styles.pointsText, { color: getPointsColor() }]}>{points.toLocaleString()} pts</Text>
        </View>
        
        <Button
          text="Ver Catálogo de Recompensas"
          variant="filled"
          onPress={handleViewCatalog}
          style={styles.catalogButton}
        />
      </View>
      
      <View style={styles.infoLabel}>
        <Ionicons name="gift-outline" size={16} color={COLORS.primary} style={styles.infoIcon} />
        <Text style={styles.infoText}>Canjea tus puntos por servicios y productos del club</Text>
      </View>
    </View>
  );
};

export default MyRewards;