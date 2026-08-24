import { FC, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { useSavedStore } from '../../store/savedStore';
import { ToolCard } from '../../components/ToolCard/ToolCard';
import './SavedPage.css';

export const SavedPage: FC = () => {
  const { categories, addCategory, removeToolFromCategory, removeCategory } = useSavedStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#2BD2FF');
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  
  // Стейт для модалки підтвердження видалення категорії
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const availableColors = ['#2BD2FF', '#FF4D4D', '#4DFFB8', '#7A4DFF', '#FFA64D', '#FFFF4D', '#FF4DF0'];

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.toUpperCase(), selectedColor);
      setNewCategoryName('');
      setIsModalOpen(false);
    }
  };

  const handleDeleteCategory = () => {
    if (activeCategoryId) {
      removeCategory(activeCategoryId);
      setIsDeleteConfirmOpen(false);
      setActiveCategoryId(null); // Повертаємось на головну Saved
    }
  };

  if (activeCategoryId) {
    const currentCategory = categories.find(c => c.id === activeCategoryId);
    const toolsList = currentCategory?.items || [];

    return (
      <div className="saved-page">
        <Header 
          title={currentCategory?.name || 'CATEGORY'} 
          showBack={true} 
          onBackClick={() => setActiveCategoryId(null)}
          bgColor={currentCategory?.color}
          rightElement={
            // Кнопка видалення замість "+"
            <button className="neo-btn-icon delete-icon" onClick={() => setIsDeleteConfirmOpen(true)}>
              🗑
            </button>
          }
        />
        <main className="saved-content">
          {toolsList.length > 0 ? (
            toolsList.map(tool => (
              <ToolCard 
                key={tool.id} 
                tool={tool as any}
                onDeleteClick={(t) => removeToolFromCategory(currentCategory!.id, t.id)} 
              />
            ))
          ) : (
            <div className="empty-state">NO SAVED TOOLS HERE YET.</div>
          )}
        </main>

        {/* МОДАЛКА ПІДТВЕРДЖЕННЯ ВИДАЛЕННЯ */}
        {isDeleteConfirmOpen && (
          <div className="neo-modal-overlay">
            <div className="neo-modal">
              <h2>DELETE CATEGORY?</h2>
              <p>Are you sure you want to delete <strong>{currentCategory?.name}</strong> and all its saved tools? This cannot be undone.</p>
              <div className="neo-modal-actions">
                <button className="neo-btn cancel" onClick={() => setIsDeleteConfirmOpen(false)}>CANCEL</button>
                <button className="neo-btn delete-btn-confirm" onClick={handleDeleteCategory}>OK</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="saved-page">
      <Header 
        title="♪ SAVED" 
        showBack={true} 
        bgColor="#2BD2FF" 
        rightElement={
          <button className="neo-btn-icon" onClick={() => setIsModalOpen(true)}>+</button>
        }
      />

      <main className="saved-content">
        <div className="category-list">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="category-card"
              style={{ backgroundColor: category.color }}
              onClick={() => setActiveCategoryId(category.id)}
            >
              <div className="category-card__header">
                <h2>{category.name}</h2>
                <span className="category-card__count">{category.items.length} ITEMS</span>
              </div>
            </div>
          ))}
        </div>
      </main>

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