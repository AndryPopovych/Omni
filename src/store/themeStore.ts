import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'default' | 'white-min' | 'dark-min';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'default',
      setTheme: (theme) => {
        set({ theme });
        // Миттєво застосовуємо тему до всього документа
        document.documentElement.setAttribute('data-theme', theme);
      },
    }),
    {
      name: 'omni-theme-storage',
    }
  )
);