import { FC } from 'react';
import { Header } from '../../components/Header/Header';
import { useThemeStore } from '../../store/themeStore';
import './SettingsPage.css';

export const SettingsPage: FC = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="settings-page">
      <Header title="⊛ SETTINGS" showBack={true} bgColor="#A6FF4D" />
      
      <main className="settings-content">
        <section className="settings-section">
          <h2>APP THEME</h2>
          <p className="settings-desc">Choose your visual style. Minimalistic themes remove all tile colors.</p>
          
          <div className="theme-options">
            <button 
              className={`theme-btn ${theme === 'default' ? 'active' : ''}`}
              onClick={() => setTheme('default')}
            >
              <div className="theme-preview default-preview"></div>
              <span>OMNI CLASSIC</span>
            </button>

            <button 
              className={`theme-btn ${theme === 'white-min' ? 'active' : ''}`}
              onClick={() => setTheme('white-min')}
            >
              <div className="theme-preview white-preview"></div>
              <span>WHITE MINIMALISM</span>
            </button>

            <button 
              className={`theme-btn ${theme === 'dark-min' ? 'active' : ''}`}
              onClick={() => setTheme('dark-min')}
            >
              <div className="theme-preview dark-preview"></div>
              <span>DARK MINIMALISM</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};