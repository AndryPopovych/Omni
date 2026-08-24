import { FC, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { useSavedStore } from '../../store/savedStore';
import './SavedPage.css';

export const SavedPage: FC = () => {
  // Дістаємо дані та функцію додавання з нашого Zustand стору
  const { categories, addCategory } = useSavedStore();
  
  // Локальний стейт для управління модальним вікном
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#2BD2FF');

  // Палітра кольорів для нових категорій
  const availableColors = ['#2BD2FF', '#FF4D4D', '#4DFFB8', '#7A4DFF', '#FFA64D', '#FFFF4D', '#FF4DF0'];

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.toUpperCase(), selectedColor);
      setNewCategoryName('');
      setIsModalOpen(false);
    }
  };

  return (
    <div className="saved-page">
      <Header 
        title="♪ SAVED" 
        showBack={true} 
        bgColor="#2BD2FF" 
        rightElement={
          <button className="neo-btn-icon" onClick={() => setIsModalOpen(true)}>
            +
          </button>
        }
      />

      <main className="saved-content">
        <div className="category-list">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              style={{ backgroundColor: category.color }}
            >
              <div className="category-card__header">
                <h2>{category.name}</h2>
                <span className="category-card__count">{category.items.length} ITEMS</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Модальне вікно Neo-Brutalism */}
      {isModalOpen && (
        <div className="neo-modal-overlay">
          <div className="neo-modal">
            <h2>NEW CATEGORY</h2>
            
            <input 
              type="text" 
              className="neo-input" 
              placeholder="CATEGORY NAME" 
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />

            <div className="color-picker">
              {availableColors.map(color => (
                <div 
                  key={color}
                  className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>

            <div className="neo-modal-actions">
              <button className="neo-btn cancel" onClick={() => setIsModalOpen(false)}>CANCEL</button>
              <button className="neo-btn confirm" onClick={handleAddCategory}>ADD</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};