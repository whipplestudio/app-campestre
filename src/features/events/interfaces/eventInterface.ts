export interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // ISO string format
  time: string; // HH:MM format
  location: string;
  eventType: 'Deportivo' | 'Social' | 'Familiar' | 'Fitness' | 'Todos';
  availableSpots: number;
  totalSpots: number;
  registeredUsers: string[]; // Array of user IDs who registered
  image?: string;
}

export interface EventState {
  // State
  events: Event[];
  loading: boolean;
  error: string | null;
  selectedEvent: Event | null;
  reminders: string[];

  // Actions
  fetchEvents: () => Promise<void>;
  getEventById: (id: string) => Promise<Event | undefined>;
  registerForEvent: (eventId: string, userId: string) => Promise<void>;
  unregisterFromEvent: (eventId: string, userId: string) => Promise<void>;
  toggleReminder: (eventId: string) => void;
  isUserRegistered: (eventId: string, userId: string) => Promise<boolean>;
}

export interface EventCardProps {
  event: Event;
  isRegistered: boolean;
  onRegister: (eventId: string) => void;
  onUnregister: (eventId: string) => void;
  onToggleReminder: (eventId: string) => void;
}

export interface FilterSectionProps {
  selectedEventType: 'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness';
  onEventTypeChange: (type: 'Todos' | 'Deportivo' | 'Social' | 'Familiar' | 'Fitness') => void;
}