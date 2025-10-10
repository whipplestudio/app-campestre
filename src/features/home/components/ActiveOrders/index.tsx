import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { COLORS } from '../../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { useReservationStore } from '../../../reservations/store/useReservationStore';
import styles from './Style';

const ActiveOrders: React.FC = () => {
  const { reservations } = useReservationStore();

  // Filtrar las reservaciones futuras (activas)
  const activeReservations = reservations.filter(res => {
    // Crear objeto de fecha para la reserva (usando el formato YYYY-MM-DD)
    const [year, month, day] = res.date.split('-').map(Number);
    const [hours, minutes] = res.time.split(':').map(Number);
    
    // Crear fecha completa de la reserva considerando la zona horaria local
    const reservationDate = new Date(year, month - 1, day, hours, minutes);
    
    // Comparar con la fecha y hora actual
    return reservationDate > new Date();
  });

  // Calcular minutos restantes para cada reserva
  const reservationsWithTimeLeft = activeReservations.map(res => {
    // Crear objeto de fecha para la reserva
    const [year, month, day] = res.date.split('-').map(Number);
    const [hours, minutes] = res.time.split(':').map(Number);
    
    // Crear fecha completa de la reserva considerando la zona horaria local
    const reservationDate = new Date(year, month - 1, day, hours, minutes);
    
    // Obtener la fecha y hora actual
    const currentDate = new Date();
    
    // Calcular la diferencia en milisegundos
    const timeDiff = reservationDate.getTime() - currentDate.getTime();
    
    // Convertir a minutos y redondear hacia arriba
    const minutesLeft = Math.ceil(timeDiff / (1000 * 60));
    
    // Asegurar que no haya valores negativos
    const calculatedMinutes = Math.max(0, minutesLeft);
    
    return { ...res, minutesLeft: calculatedMinutes };
  });

  // Función para formatear el tiempo restante de forma más legible
  const formatTimeLeft = (minutes: number) => {
    if (minutes <= 0) {
      return "Ahora";
    } else if (minutes < 60) {
      return `${minutes} min`;
    } else if (minutes < 1440) { // Menos de 24 horas
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    } else { // 24 horas o más
      const days = Math.floor(minutes / 1440);
      const hours = Math.floor((minutes % 1440) / 60);
      return `${days}d ${hours}h`;
    }
  };

  // Función para formatear la fecha de forma más amigable
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hoy";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Mañana";
    } else {
      return `${day}/${month}/${year}`;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="time-outline" size={20} color={COLORS.primary} />
        <Text style={styles.cardTitle}>Pedidos Activos</Text>
      </View>
      
      {activeReservations.length === 0 ? (
        <Text style={styles.noOrdersText}>Aún no hay pedidos activos</Text>
      ) : (
        <ScrollView style={styles.ordersList}>
          {reservationsWithTimeLeft.map((reservation) => (
            <View key={reservation.id} style={styles.orderItem}>
              <View style={styles.orderStatusIcon}>
                {reservation.status === 'confirmed' ? (
                  <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.success} />
                ) : (
                  <Ionicons name="warning-outline" size={20} color={COLORS.warning} />
                )}
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.orderName}>{reservation.serviceName}</Text>
                <Text style={styles.orderService}>
                  {reservation.details?.court || reservation.details?.table || 'Servicio'} 
                  {" · "} {formatDate(reservation.date)} a las {reservation.time}
                </Text>
              </View>
              <View style={[
                styles.timeBadge, 
                reservation.minutesLeft <= 30 ? styles.timeBadgeWarning : null
              ]}>
                <Text style={styles.timeText}>{formatTimeLeft(reservation.minutesLeft)}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ActiveOrders;