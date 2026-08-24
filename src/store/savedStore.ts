import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Описуємо структуру одного інструменту (картки)
export interface ToolItem {
  id: string;
  title: string;
  url: string;
  description?: string;
}

// Описуємо структуру категорії (з масивом інструментів всередині)
export interface SavedCategory {
  id: string;
  name: string;
  color: string;
  items: ToolItem[];
}

// Описуємо всі дії, які можна робити з нашим сховищем
interface SavedStore {
  categories: SavedCategory[];
  addCategory: (name: string, color: string) => void;
  saveToolToCategory: (categoryId: string, tool: ToolItem) => void;
}

// Створюємо сам store
export const useSavedStore = create<SavedStore>()(
  persist(
    (set) => ({
      categories: [
        // Дефолтні категорії для прикладу
        { id: '1', name: 'NEURAL NETWORKS', color: '#4DFFB8', items: [] },
        { id: '2', name: 'UI INSPIRATION', color: '#FFA64D', items: [] },
      ],
      
      // Функція створення нової категорії
      addCategory: (name, color) =>
        set((state) => ({
          categories: [
            ...state.categories,
            { id: crypto.randomUUID(), name, color, items: [] },
          ],
        })),

      // Функція додавання інструменту у вибрану категорію
      saveToolToCategory: (categoryId, tool) =>
        set((state) => ({
          categories: state.categories.map((cat) =>
            cat.id === categoryId
              ? { ...cat, items: [...cat.items, tool] } // Додаємо інструмент, якщо id збігається
              : cat
          ),
        })),
    }),
    {
      name: 'omni-saved-storage', // Ця назва використовується для збереження в localStorage
    }
  )
);