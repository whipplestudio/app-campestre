import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../../../shared/theme/colors';
import { Ionicons } from '@expo/vector-icons';

interface CalendarComponentProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export const CalendarComponent: React.FC<CalendarComponentProps> = ({ selectedDate, onDateChange }) => {
  // Estado para manejar el mes y año actual mostrado en el calendario
  const [displayedMonth, setDisplayedMonth] = useState(new Date().getMonth());
  const [displayedYear, setDisplayedYear] = useState(new Date().getFullYear());

  // Fecha actual
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  // Obtener días del mes
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Obtener día de la semana del primer día del mes
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Obtener nombre del mes
  const getMonthName = (month: number) => {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    return months[month];
  };

  // Navegar al mes anterior
  const goToPreviousMonth = () => {
    if (displayedMonth === 0) {
      setDisplayedMonth(11);
      setDisplayedYear(displayedYear - 1);
    } else {
      setDisplayedMonth(displayedMonth - 1);
    }
  };

  // Navegar al mes siguiente
  const goToNextMonth = () => {
    if (displayedMonth === 11) {
      setDisplayedMonth(0);
      setDisplayedYear(displayedYear + 1);
    } else {
      setDisplayedMonth(displayedMonth + 1);
    }
  };

  // Generar días del calendario
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(displayedYear, displayedMonth);
    const firstDayOfMonth = getFirstDayOfMonth(displayedYear, displayedMonth);
    const days = [];

    // Agregar días vacíos antes del primer día del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }

    // Agregar días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  // Formatear fecha para mostrar
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return 'Selecciona una fecha';
    
    const date = new Date(dateString);
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const dayName = dayNames[date.getDay()];
    const day = date.getDate();
    const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const monthName = monthNames[date.getMonth()];
    
    return `${dayName}, ${day} de ${monthName}`;
  };

  // Seleccionar día
  const selectDay = (day: number | null) => {
    if (day === null) return;
    
    const date = new Date(displayedYear, displayedMonth, day + 1);
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    onDateChange(formattedDate);
  };

  // Verificar si la fecha está en el pasado
  const isPastDay = (day: number | null) => {
    if (day === null) return false;
    
    const date = new Date(displayedYear, displayedMonth, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Establecer horas a 0 para comparación precisa
    
    return date < today;
  };

  // Verificar si un día está seleccionado
  const isDaySelected = (day: number | null) => {
    if (!selectedDate || day === null) return false;
    
    const selectedDateObj = new Date(selectedDate);
    return (
      selectedDateObj.getDate() === day && 
      selectedDateObj.getMonth() === displayedMonth && 
      selectedDateObj.getFullYear() === displayedYear
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
        <Text style={styles.label}>Fecha</Text>
      </View>
      
      <View style={styles.calendarContainer}>
        <View style={styles.monthYearHeader}>
          <TouchableOpacity onPress={goToPreviousMonth} style={styles.navButton}>
            <Ionicons name="chevron-back" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.monthYearText}>{getMonthName(displayedMonth)} {displayedYear}</Text>
          <TouchableOpacity onPress={goToNextMonth} style={styles.navButton}>
            <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
        
        <View style={styles.weekDaysHeader}>
          <Text style={styles.weekDayText}>Dom</Text>
          <Text style={styles.weekDayText}>Lun</Text>
          <Text style={styles.weekDayText}>Mar</Text>
          <Text style={styles.weekDayText}>Mié</Text>
          <Text style={styles.weekDayText}>Jue</Text>
          <Text style={styles.weekDayText}>Vie</Text>
          <Text style={styles.weekDayText}>Sáb</Text>
        </View>
        
        <View style={styles.calendarGrid}>
          {generateCalendarDays().map((day, index) => (
            <TouchableOpacity
              key={`${displayedYear}-${displayedMonth}-${index}-${day || 'empty'}`}
              style={[
                styles.dayButton,
                day === null && styles.emptyDay,
                day === currentDay && 
                displayedMonth === currentMonth && 
                displayedYear === currentYear && 
                styles.todayButton,
                day !== null && isDaySelected(day) && styles.selectedDayButton,
                day !== null && isPastDay(day) && styles.pastDayButton
              ]}
              onPress={() => selectDay(day)}
              disabled={day === null || isPastDay(day)}
            >
              <Text style={[
                styles.dayText,
                day === currentDay && 
                displayedMonth === currentMonth && 
                displayedYear === currentYear && 
                styles.todayText,
                day !== null && isDaySelected(day) && styles.selectedDayText,
                day !== null && isPastDay(day) && styles.pastDayText
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
  calendarContainer: {
    backgroundColor: COLORS.gray50,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
  monthYearHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.gray800,
    flex: 1,
    textAlign: 'center',
  },
  navButton: {
    padding: 4,
  },
  weekDaysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  weekDayText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.gray600,
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayButton: {
    width: '14.28%', // 100% / 7 days
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDay: {
    backgroundColor: 'transparent',
  },
  todayButton: {
    borderColor: 'transparent',
  },
  selectedDayButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 5,
  },
  pastDayButton: {
    opacity: 0.4,
  },
  dayText: {
    fontSize: 16,
    color: COLORS.gray700,
  },
  todayText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  selectedDayText: {
    color: COLORS.white,
    fontWeight: '600',
  },
  pastDayText: {
    color: COLORS.gray400,
  },
});