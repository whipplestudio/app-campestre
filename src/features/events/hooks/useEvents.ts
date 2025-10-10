import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEventStore } from '../store/useEventStore';
import { useAuthStore } from '../../auth/store/useAuthStore';

export const useEvents = () => {
  const { userId } = useAuthStore();
  const { 
    events, 
    loading,
    error,
    fetchEvents, 
    registerForEvent, 
    unregisterFromEvent, 
    toggleReminder,
    isUserRegistered
  } = useEventStore();
  
  const { t } = useTranslation();
  
  // Current month and year state
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  
  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEventType, setSelectedEventType] = useState<'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness'>('Todos');
  
  // Event types filter options
  const eventTypes = ['Todos', 'Deportivo', 'Social', 'Familiar', 'Fitness'] as const;
  
  // Format month and year display
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ] as const;
  
  const displayMonth = `${monthNames[currentMonth]} de ${currentYear}`;
  
  // Filter and sort events by date
  const filteredEvents = events
    .filter(event => {
      const eventDate = new Date(event.date);
      const eventMonth = eventDate.getMonth();
      const eventYear = eventDate.getFullYear();
      
      // Filter by month and year
      const isCurrentMonth = eventMonth === currentMonth && eventYear === currentYear;
      
      // Filter by search query
      const matchesSearch = 
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter by event type
      const matchesType = 
        selectedEventType === 'Todos' || event.eventType === selectedEventType;
      
      // Filter out past events (events that occurred before today)
      const isNotPast = eventDate >= new Date();
      
      return isCurrentMonth && matchesSearch && matchesType && isNotPast;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Check if there are events for the current month
  const hasEventsThisMonth = events.some(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  // Check if there are events after current month
  const hasFutureMonths = events.some(event => {
    const eventDate = new Date(event.date);
    return (eventDate.getFullYear() > currentYear) || 
           (eventDate.getFullYear() === currentYear && eventDate.getMonth() > currentMonth);
  });

  // Check if current displayed month is after the actual current month
  const isAfterCurrentMonth = (currentYear > new Date().getFullYear()) || 
                             (currentYear === new Date().getFullYear() && currentMonth > new Date().getMonth());

  // Navigation functions
  const goToPreviousMonth = () => {
    const prevDate = new Date(currentYear, currentMonth - 1, 1);
    setCurrentMonth(prevDate.getMonth());
    setCurrentYear(prevDate.getFullYear());
  };

  const goToNextMonth = () => {
    const nextDate = new Date(currentYear, currentMonth + 1, 1);
    setCurrentMonth(nextDate.getMonth());
    setCurrentYear(nextDate.getFullYear());
  };

  // Handler functions for registration
  const handleRegister = async (eventId: string) => {
    if (!userId) return;
    await registerForEvent(eventId, userId);
  };

  const handleUnregister = async (eventId: string) => {
    if (!userId) return;
    await unregisterFromEvent(eventId, userId);
  };

  const handleToggleReminder = (eventId: string) => {
    toggleReminder(eventId);
  };
  
  // Check if user is registered for an event
  const checkIfRegistered = (eventId: string): boolean => {
    if (!userId) return false;
    const event = events.find(e => e.id === eventId);
    return event ? event.registeredUsers.includes(userId) : false;
  };
  // Effect to fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    loading,
    error,
    isRegistered: checkIfRegistered,
    fetchEvents,
    registerForEvent: handleRegister,
    unregisterFromEvent: handleUnregister,
    toggleReminder: handleToggleReminder,
    currentMonth,
    currentYear,
    goToPreviousMonth,
    goToNextMonth,
    handleRegister,
    handleUnregister,
    handleToggleReminder,
    filteredEvents,
    hasEventsThisMonth,
    hasFutureMonths,
    isAfterCurrentMonth,
    searchQuery,
    setSearchQuery,
    selectedEventType,
    setSelectedEventType,
    eventTypes,
    monthNames,
    displayMonth,
  };
};