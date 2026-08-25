import { FC, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { useSavedStore } from '../../store/savedStore';
import { ToolCard } from '../../components/ToolCard/ToolCard';
import './SavedPage.css';

export const SavedPage: FC = () => {
  const { categories, addCategory, removeToolFromCategory, removeCategory, saveToolToCategory } = useSavedStore();
  
  // Стейт для керування тим, яке саме вікно зараз відкрито
  const [modalView, setModalView] = useState<'none' | 'menu' | 'category' | 'item'>('none');
  
  // Стейт для нової категорії
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#2BD2FF');
  
  // Стейт для нового кастомного інструменту
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemUrl, setNewItemUrl] = useState('');
  const [newItemCategoryId, setNewItemCategoryId] = useState('');

  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const availableColors = ['#2BD2FF', '#FF4D4D', '#4DFFB8', '#7A4DFF', '#FFA64D', '#FFFF4D', '#FF4DF0'];

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.toUpperCase(), selectedColor);
      setNewCategoryName('');
      setModalView('none');
    }
  };

  const handleAddCustomItem = () => {
    if (newItemTitle.trim() && newItemUrl.trim() && newItemCategoryId) {
      const newTool = {
        id: crypto.randomUUID(),
        title: newItemTitle,
        description: newItemDesc,
        // Перевіряємо, чи є http/https, щоб посилання працювало коректно
        url: newItemUrl.startsWith('http') ? newItemUrl : `https://${newItemUrl}`
      };
      
      saveToolToCategory(newItemCategoryId, newTool);
      
      // Очищаємо форму та закриваємо модалку
      setNewItemTitle('');
      setNewItemDesc('');
      setNewItemUrl('');
      setModalView('none');
    }
  };

  const handleDeleteCategory = () => {
    if (activeCategoryId) {
      removeCategory(activeCategoryId);
      setIsDeleteConfirmOpen(false);
      setActiveCategoryId(null);
    }
  };

  const openAddItemModal = () => {
    if (categories.length > 0) {
      setNewItemCategoryId(categories[0].id); // За замовчуванням обираємо першу категорію
    }
    setModalView('item');
  };

  // ВІДМАЛЬОВКА: ЯКЩО ВІДКРИТА КОНКРЕТНА КАТЕГОРІЯ
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

        {isDeleteConfirmOpen && (
          <div className="neo-modal-overlay">
            <div className="neo-modal delete-modal">
              <h2 className="delete-modal-title">DELETE {currentCategory?.name}?</h2>
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

  // ВІДМАЛЬОВКА: ГОЛОВНИЙ ЕКРАН SAVED ТА МОДАЛКИ СТВОРЕННЯ
  return (
    <div className="saved-page">
      <Header 
        title="♪ SAVED" 
        showBack={true} 
        bgColor="#2BD2FF" 
        rightElement={
          <button className="neo-btn-icon" onClick={() => setModalView('menu')}>+</button>
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

      {modalView !== 'none' && (
        <div className="neo-modal-overlay">
          
          {/* ПРОМІЖНЕ МЕНЮ */}
          {modalView === 'menu' && (
            <div className="neo-modal">
              <h2>WHAT TO ADD?</h2>
              <div className="modal-inputs">
                <button className="neo-btn confirm" onClick={() => setModalView('category')}>NEW CATEGORY</button>
                <button className="neo-btn confirm" style={{ backgroundColor: '#FF4D4D' }} onClick={openAddItemModal}>NEW ITEM</button>
              </div>
              <button className="neo-btn cancel-full" onClick={() => setModalView('none')}>CANCEL</button>
            </div>
          )}

          {/* ФОРМА СТВОРЕННЯ КАТЕГОРІЇ */}
          {modalView === 'category' && (
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
                <button className="neo-btn cancel" onClick={() => setModalView('menu')}>BACK</button>
                <button className="neo-btn confirm" onClick={handleAddCategory}>ADD</button>
              </div>
            </div>
          )}

          {/* ФОРМА СТВОРЕННЯ КАСТОМНОГО ІНСТРУМЕНТУ */}
          {modalView === 'item' && (
            <div className="neo-modal">
              <h2>NEW ITEM</h2>
              {categories.length === 0 ? (
                <>
                  <p>You need to create a category first!</p>
                  <button className="neo-btn cancel-full" onClick={() => setModalView('menu')}>BACK</button>
                </>
              ) : (
                <>
                  <div className="modal-inputs">
                    <input 
                      type="text" 
                      className="neo-input" 
                      placeholder="TITLE (E.G. GOOGLE)" 
                      value={newItemTitle}
                      onChange={(e) => setNewItemTitle(e.target.value)}
                    />
                    <input 
                      type="text" 
                      className="neo-input" 
                      placeholder="DESCRIPTION (OPTIONAL)" 
                      value={newItemDesc}
                      onChange={(e) => setNewItemDesc(e.target.value)}
                    />
                    <input 
                      type="url" 
                      className="neo-input" 
                      placeholder="URL (HTTPS://...)" 
                      value={newItemUrl}
                      onChange={(e) => setNewItemUrl(e.target.value)}
                    />
                    
                    {/* Випадаючий список для вибору категорії */}
                    <select 
                      className="neo-select" 
                      value={newItemCategoryId} 
                      onChange={(e) => setNewItemCategoryId(e.target.value)}
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="neo-modal-actions">
                    <button className="neo-btn cancel" onClick={() => setModalView('menu')}>BACK</button>
                    <button className="neo-btn confirm" onClick={handleAddCustomItem}>ADD</button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      )}
    </div>
  );
};