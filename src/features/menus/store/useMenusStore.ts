import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

interface Menu {
  id: string;
  name: string;
  date: string;
  type: 'daily' | 'weekly' | 'special';
  items: MenuItem[];
}

interface MenusState {
  menus: Menu[];
  setMenus: (menus: Menu[]) => void;
  addMenu: (menu: Omit<Menu, 'id'>) => void;
  updateMenu: (id: string, updates: Partial<Menu>) => void;
  deleteMenu: (id: string) => void;
}

// Datos de ejemplo para el menú
const sampleMenus: Menu[] = [
  {
    id: '1',
    name: 'Menú del Día - Lunes',
    date: new Date().toISOString(),
    type: 'daily',
    items: [
      {
        id: '1-1',
        name: 'Sopa del Día',
        description: 'Sopa casera preparada con ingredientes frescos',
        price: 45,
        category: 'Entrada'
      },
      {
        id: '1-2',
        name: 'Pollo a la Parrilla',
        description: 'Pechuga de pollo a la parrilla con vegetales al vapor',
        price: 120,
        category: 'Plato Fuerte'
      }
    ]
  },
  // Agrega más menús de ejemplo según sea necesario
];

export const useMenusStore = create<MenusState>()(
  devtools(
    (set) => ({
      menus: sampleMenus,
      setMenus: (menus) => set({ menus }),
      addMenu: (menu) => 
        set((state) => ({
          menus: [...state.menus, { ...menu, id: Date.now().toString() }]
        })),
      updateMenu: (id, updates) =>
        set((state) => ({
          menus: state.menus.map((menu) =>
            menu.id === id ? { ...menu, ...updates } : menu
          )
        })),
      deleteMenu: (id) =>
        set((state) => ({
          menus: state.menus.filter((menu) => menu.id !== id)
        }))
    }),
    { name: 'menus-store' }
  )
);
