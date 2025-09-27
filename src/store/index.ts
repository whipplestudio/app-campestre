import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Define member type
export interface Member {
  id: string;
  name: string;
  email: string;
  memberSince: string; // ISO date string
  membershipType: string;
}

// Define event type
export interface Event {
  id: string;
  name: string;
  date: string; // ISO date string
  time: string; // HH:MM format
  availableSpots: number;
  description: string;
}

// Define reservation type
export interface Reservation {
  id: string;
  eventId: string;
  memberId: string;
  reservationDate: string; // ISO date string
}

// Define survey type
export interface SurveyResponse {
  id?: string;
  satisfaction: number; // 1-5 scale
  improvements: string;
  comments: string;
  submittedAt: string; // ISO date string
}

// Define menu type
export interface Menu {
  id: string;
  name: string;
  date: string; // ISO date string
  type: 'daily' | 'weekly' | 'special';
  items: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
}

// Define the store state interface
interface StoreState {
  // Authentication state
  isAuthenticated: boolean;
  currentUser: Member | null;
  
  // Language state
  language: 'en' | 'es';
  
  // Events and reservations state
  events: Event[];
  reservations: Reservation[];
  
  // Menus state
  menus: Menu[];
  
  // Surveys state
  surveyResponses: SurveyResponse[];
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setLanguage: (lang: 'en' | 'es') => void;
  addReservation: (eventId: string) => void;
  addSurveyResponse: (response: SurveyResponse) => void;
  updateProfile: (updates: Partial<Member>) => void;
}

// Mock data for the application
const mockMember: Member = {
  id: '1',
  name: 'Juan Pérez',
  email: 'juan.perez@clubtampico.com',
  memberSince: '2020-05-15',
  membershipType: 'Premium',
};

const mockEvents: Event[] = [
  {
    id: '1',
    name: 'Torneo de Golf',
    date: '2024-10-15',
    time: '08:00',
    availableSpots: 24,
    description: 'Torneo mensual de golf para socios',
  },
  {
    id: '2',
    name: 'Cena de Gala',
    date: '2024-10-20',
    time: '19:30',
    availableSpots: 120,
    description: 'Cena especial para celebrar el aniversario del club',
  },
  {
    id: '3',
    name: 'Clase de Yoga',
    date: '2024-10-18',
    time: '07:00',
    availableSpots: 15,
    description: 'Clase de yoga para principiantes',
  },
];

const mockMenus: Menu[] = [
  {
    id: '1',
    name: 'Menú Ejecutivo',
    date: '2024-10-15',
    type: 'daily',
    items: [
      {
        id: '1',
        name: 'Ensalada César',
        description: 'Lechuga romana, crutones, queso parmesano y aderezo César',
        category: 'Entrantes',
        price: 120,
      },
      {
        id: '2',
        name: 'Filete de res',
        description: 'Filete de res a la parrilla con puré de papas y verduras',
        category: 'Plato Fuerte',
        price: 350,
      },
    ],
  },
];

// Create the store
export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      isAuthenticated: false,
      currentUser: null,
      language: 'es',
      events: mockEvents,
      reservations: [],
      menus: mockMenus,
      surveyResponses: [],
      
      // Actions
      login: async (email: string, password: string): Promise<boolean> => {
        // Mock authentication - in real app, you'd call an API
        if (email && password) {
          set({
            isAuthenticated: true,
            currentUser: mockMember,
          });
          return true;
        }
        return false;
      },
      
      logout: () => {
        set({
          isAuthenticated: false,
          currentUser: null,
        });
      },
      
      setLanguage: (lang: 'en' | 'es') => {
        set({ language: lang });
      },
      
      addReservation: (eventId: string) => {
        const { currentUser, events } = get();
        if (!currentUser) return;
        
        // Find the event and check availability
        const event = events.find(e => e.id === eventId);
        if (!event || event.availableSpots <= 0) return;
        
        // Create new reservation
        const newReservation: Reservation = {
          id: `res-${Date.now()}`,
          eventId,
          memberId: currentUser.id,
          reservationDate: new Date().toISOString(),
        };
        
        // Update event availability
        const updatedEvents = events.map(e => 
          e.id === eventId 
            ? { ...e, availableSpots: e.availableSpots - 1 } 
            : e
        );
        
        set({
          reservations: [...get().reservations, newReservation],
          events: updatedEvents,
        });
      },
      
      addSurveyResponse: (response: SurveyResponse) => {
        const newResponse = {
          ...response,
          id: `survey-${Date.now()}`,
          submittedAt: new Date().toISOString(),
        };
        
        set({
          surveyResponses: [...get().surveyResponses, newResponse],
        });
      },
      
      updateProfile: (updates: Partial<Member>) => {
        if (get().currentUser) {
          const updatedUser = {
            ...get().currentUser,
            ...updates,
          } as Member;
          
          set({
            currentUser: updatedUser,
          });
        }
      },
    }),
    {
      name: 'club-campestre-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // Use localStorage as the storage engine
    }
  )
);