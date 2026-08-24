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
  addCategory: (name: string, color: string) => void;
  saveToolToCategory: (categoryId: string, tool: ToolItem) => void;
  removeToolFromCategory: (categoryId: string, toolId: string) => void; // <--- НОВЕ
}

export const useSavedStore = create<SavedStore>()(
  persist(
    (set) => ({
      categories: [
        { id: '1', name: 'NEURAL NETWORKS', color: '#4DFFB8', items: [] },
        { id: '2', name: 'UI INSPIRATION', color: '#FFA64D', items: [] },
      ],
      addCategory: (name, color) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { id: crypto.randomUUID(), name, color, items: [] },
          ],
        })),
      saveToolToCategory: (categoryId, tool) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? { ...cat, items: [...cat.items, tool] }
              : cat
          ),
        })),
      // <--- НОВА ФУНКЦІЯ ВИДАЛЕННЯ
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