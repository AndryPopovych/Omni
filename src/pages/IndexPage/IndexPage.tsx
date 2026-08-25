import { FC, useMemo, useEffect } from 'react'; // <--- ДОДАЛИ useEffect
import { useNavigate } from 'react-router-dom';
import { MenuCard } from '../../components/MenuCard/MenuCard';
import { useThemeStore } from '../../store/themeStore'; // <--- ДОДАЛИ СТОР
import '../../theme.css'; // <--- ПІДКЛЮЧАЄМО НАШУ МАГІЮ CSS

const menuItems = [
  { title: 'SAVED', color: '#2BD2FF', icon: '♪' },
  { title: 'ALL', color: '#FF4D4D', icon: '◎' },
  { title: 'AI', color: '#4DFFB8', icon: '⊕' },
  { title: 'DEV', color: '#7A4DFF', icon: '©' },
  { title: 'DESIGN', color: '#FFA64D', icon: '▣' },
  { title: 'FILES', color: '#FFFF4D', icon: '⊞' },
  { title: 'GAMES', color: '#FF4DF0', icon: '◇' },
  { title: 'SETTINGS', color: '#A6FF4D', icon: '⊛' },
];

export const IndexPage: FC = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore(); // Дістаємо поточну тему

  // При завантаженні головної сторінки гарантовано застосовуємо тему до HTML
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const currentDate = useMemo(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: 'short',
    };
    return date.toLocaleDateString('en-US', options).replace(',', '');
  }, []);

  return (
    <div className="omni-home">
      <header className="omni-header">
        <span className="omni-date">{currentDate}</span>
        <h1 className="omni-logo">OMNI</h1>
      </header>

      <main className="omni-grid">
        {menuItems.map((item) => (
          <div key={item.title} className="omni-grid-cell">
            <MenuCard
              title={item.title}
              color={item.color}
              icon={item.icon}
              onClick={() => {
                if (item.title === 'SAVED') {
                  navigate('/saved');
                } else if (item.title === 'SETTINGS') {
                  navigate('/settings'); // <--- РОЗБЛОКУВАЛИ ПЕРЕХІД
                } else {
                  navigate(`/section/${item.title.toLowerCase()}`);
                }
              }}
            />
          </div>
        ))}
      </main>
    </div>
  );
};