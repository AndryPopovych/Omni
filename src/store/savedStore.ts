import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ToolItem {
  id: string;
  title: string;
  url: string;
  description?: string;
}

export interface SavedCategory {
  id: string;
  name: string;
  color: string;
  items: ToolItem[];
}

interface SavedStore {
  categories: SavedCategory[];
  addCategory: (name: string, color: string, id?: string) => void; // <--- Додали необов'язковий id
  removeCategory: (categoryId: string) => void; // <--- НОВА ФУНКЦІЯ
  saveToolToCategory: (categoryId: string, tool: ToolItem) => void;
  removeToolFromCategory: (categoryId: string, toolId: string) => void;
}

export const useSavedStore = create<SavedStore>()(
  persist(
    (set) => ({
      categories: [
        { id: '1', name: 'NEURAL NETWORKS', color: '#4DFFB8', items: [] },
        { id: '2', name: 'UI INSPIRATION', color: '#FFA64D', items: [] },
      ],
      // Якщо id передано - використовуємо його, інакше генеруємо новий
      addCategory: (name, color, id) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { id: id || crypto.randomUUID(), name, color, items: [] },
          ],
        })),
      // <--- ФУНКЦІЯ ВИДАЛЕННЯ КАТЕГОРІЇ
      removeCategory: (categoryId) =>
        set((state) => ({
          categories: state.categories.filter((cat) => cat.id !== categoryId),
        })),
      saveToolToCategory: (categoryId, tool) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? { ...cat, items: [...cat.items, tool] }
              : cat
          ),
        })),
      removeToolFromCategory: (categoryId, toolId) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? { ...cat, items: cat.items.filter((item) => item.id !== toolId) }
              : cat
          ),
        })),
    }),
    {
      name: 'omni-saved-storage',
    }
  )
);