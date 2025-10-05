import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface TimeSlotsProps {
  selectedTime: string;
  onTimeChange: (time: string) => void;
  availableTimes: string[];
  selectedDate?: string; // Fecha seleccionada para deshabilitar horarios pasados
  unavailableMessage?: string;
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({ 
  selectedTime, 
  onTimeChange, 
  availableTimes, 
  selectedDate,
  unavailableMessage = "No hay horarios disponibles" 
}) => {
  // Función para verificar si un horario ya pasó
  const isTimePassed = (time: string, selectedDate?: string): boolean => {
    if (!selectedDate) return false; // Si no hay fecha seleccionada, ningún horario ha pasado
    
    // Convertir la fecha seleccionada a un objeto Date
    const selectedDateObj = new Date(selectedDate);
    const today = new Date();
    
    // Comparar solo las fechas (día, mes, año) sin la hora
    const isToday = 
      selectedDateObj.getDate() === today.getDate() &&
      selectedDateObj.getMonth() === today.getMonth() &&
      selectedDateObj.getFullYear() === today.getFullYear();
    
    if (!isToday) return false; // Si la fecha seleccionada no es hoy, ningún horario ha pasado
    
    // Si es hoy, verificar si el horario ya pasó
    const [hours, minutes] = time.split(':').map(Number);
    const currentTime = new Date();
    const selectedTime = new Date();
    selectedTime.setHours(hours, minutes, 0, 0); // Establecer la hora seleccionada
    
    return selectedTime < currentTime; // Si el horario es anterior a la hora actual, ya pasó
  };

  // Convertir los horarios disponibles en el formato con disponibilidad
  const timeSlots = availableTimes.map(time => ({
    time,
    available: !isTimePassed(time, selectedDate)
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="time-outline" size={24} color={COLORS.primary} />
        <Text style={styles.label}>Horario</Text>
      </View>
      
      {timeSlots.length > 0 ? (
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                slot.available ? styles.availableSlot : styles.unavailableSlot,
                selectedTime === slot.time && styles.selectedSlot
              ]}
              onPress={() => slot.available && onTimeChange(slot.time)}
              disabled={!slot.available}
            >
              <Text style={[
                styles.timeText,
                selectedTime === slot.time && styles.selectedTimeText,
                !slot.available && styles.unavailableText
              ]}>
                {slot.time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.noAvailabilityContainer}>
          <Text style={styles.noAvailabilityText}>{unavailableMessage}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray700,
    marginLeft: 8,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    flex: 1,
    margin: 4,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10, // Menos radio
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    minWidth: 80,
    maxWidth: 100,
  },
  availableSlot: {
    backgroundColor: COLORS.gray50,
    borderColor: COLORS.gray300,
  },
  unavailableSlot: {
    backgroundColor: COLORS.gray100,
    borderColor: COLORS.gray300,
  },
  selectedSlot: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray700,
  },
  selectedTimeText: {
    color: COLORS.white,
  },
  unavailableText: {
    color: COLORS.gray400,
  },
  noAvailabilityContainer: {
    padding: 16,
    backgroundColor: COLORS.gray50,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  noAvailabilityText: {
    fontSize: 16,
    color: COLORS.gray600,
    textAlign: 'center',
  },
});