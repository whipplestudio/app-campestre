import { create } from 'zustand';
import { MenusState } from '../interfaces/menuInterface';
import { menuService } from '../services/menuService';

export const useMenusStore = create<MenusState>()((set) => ({
      menus: menuService.getSampleMenus(),
      loading: false,
      error: null,
      setMenus: (menus) => set({ menus }),
      fetchMenus: async () => {
        set({ loading: true, error: null });
        try {
          const menus = menuService.getSampleMenus();
          set({ menus, loading: false });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Error loading menus', loading: false });
        }
      },
      getMenusByType: (type) => menuService.getSampleMenus().filter(menu => menu.type === type),
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
    })
);