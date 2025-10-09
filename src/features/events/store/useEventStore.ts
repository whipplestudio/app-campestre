import { create } from 'zustand';
import { EventState } from '../interfaces/eventInterface';
import { eventsService } from '../service/eventsService';

// Create the store
export const useEventStore = create<EventState>((set, get) => ({
  // Initial state
  events: [],
  loading: false,
  error: null,
  selectedEvent: null,
  reminders: [],

  // Actions
  fetchEvents: async () => {
    set({ loading: true, error: null });
    try {
      const events = await eventsService.fetchEvents();
      set({ events, loading: false });
    } catch (error) {
      set({ 
        error: 'Error al cargar los eventos', 
        loading: false 
      });
      throw error;
    }
  },

  getEventById: async (eventId: string) => {
    try {
      return await eventsService.getEventById(eventId);
    } catch (error) {
      console.error('Error al obtener el evento:', error);
      throw error;
    }
  },

  registerForEvent: async (eventId: string, userId: string) => {
    set({ loading: true, error: null });
    try {
      const updatedEvent = await eventsService.registerForEvent(eventId, userId);
      set(state => ({
        events: state.events.map(event => 
          event.id === eventId ? updatedEvent : event
        ),
        loading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrarse al evento';
      set({ 
        error: errorMessage,
        loading: false 
      });
      throw error;
    }
  },

  unregisterFromEvent: async (eventId: string, userId: string) => {
    set({ loading: true, error: null });
    try {
      const updatedEvent = await eventsService.unregisterFromEvent(eventId, userId);
      set(state => ({
        events: state.events.map(event => 
          event.id === eventId ? updatedEvent : event
        ),
        loading: false
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al cancelar el registro';
      set({ 
        error: errorMessage,
        loading: false 
      });
      throw error;
    }
  },

  toggleReminder: (eventId: string) => {
    const { reminders } = get();
    const isReminderSet = reminders.includes(eventId);
    
    set({
      reminders: isReminderSet 
        ? reminders.filter(id => id !== eventId)
        : [...reminders, eventId]
    });
  },

  isUserRegistered: async (eventId: string, userId: string) => {
    try {
      return await eventsService.isUserRegistered(eventId, userId);
    } catch (error) {
      console.error('Error al verificar registro:', error);
      return false;
    }
  }
}));

// Convenience hook
export const useEvents = () => {
  const {
    events,
    loading,
    error,
    selectedEvent,
    reminders,
    fetchEvents,
    getEventById,
    registerForEvent,
    unregisterFromEvent,
    toggleReminder,
    isUserRegistered
  } = useEventStore();

  return {
    events,
    loading,
    error,
    selectedEvent,
    reminders,
    fetchEvents,
    getEventById,
    registerForEvent,
    unregisterFromEvent,
    toggleReminder,
    isUserRegistered
  };
};
