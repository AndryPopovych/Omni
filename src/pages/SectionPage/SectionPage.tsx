import { FC, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { ToolCard, ToolItemProps } from '../../components/ToolCard/ToolCard';
import { useSavedStore } from '../../store/savedStore';
import { appData } from '../../data/toolsData';
import './SectionPage.css';

export const SectionPage: FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const currentSection = sectionId ? appData[sectionId.toUpperCase()] : null;

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  const { categories, saveToolToCategory, addCategory } = useSavedStore();
  const [toolToSave, setToolToSave] = useState<ToolItemProps | null>(null);
  
  // Стейт для керування режимом модалки: 'select' (вибір) або 'create' (створення)
  const [modalMode, setModalMode] = useState<'select' | 'create'>('select');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#2BD2FF');
  const availableColors = ['#2BD2FF', '#FF4D4D', '#4DFFB8', '#7A4DFF', '#FFA64D', '#FFFF4D', '#FF4DF0'];

  if (!currentSection) {
    return <Navigate to="/" replace />;
  }

  const handleSaveToCategory = (categoryId: string) => {
    if (toolToSave) {
      saveToolToCategory(categoryId, toolToSave);
      setToolToSave(null);
      setModalMode('select'); // скидаємо стан модалки
    }
  };

  const handleCreateAndSave = () => {
    if (newCategoryName.trim() && toolToSave) {
      const newId = crypto.randomUUID();
      // Створюємо категорію зі згенерованим ID
      addCategory(newCategoryName.toUpperCase(), selectedColor, newId);
      // Одразу зберігаємо туди інструмент
      saveToolToCategory(newId, toolToSave);
      // Закриваємо модалку і очищаємо форму
      setToolToSave(null);
      setModalMode('select');
      setNewCategoryName('');
    }
  };

  const closeModal = () => {
    setToolToSave(null);
    setModalMode('select');
    setNewCategoryName('');
  };

  if (activeCategory) {
    const currentCategoryInfo = currentSection.categories.find(c => c.id === activeCategory);
    const toolsList = currentSection.tools[activeCategory] || [];

    return (
      <div className="section-page">
        <Header 
          title={currentCategoryInfo?.name || 'TOOLS'} 
          showBack={true} 
          onBackClick={() => setActiveCategory(null)}
          bgColor={currentCategoryInfo?.color} 
        />

        <main className="section-content">
          {toolsList.length > 0 ? (
            toolsList.map(tool => (
              <ToolCard key={tool.id} tool={tool} onSaveClick={setToolToSave} />
            ))
          ) : (
            <div className="empty-state">NO TOOLS IN THIS CATEGORY YET.</div>
          )}
        </main>

        {/* УНІВЕРСАЛЬНА МОДАЛКА ЗБЕРЕЖЕННЯ */}
        {toolToSave && (
          <div className="neo-modal-overlay" onClick={closeModal}>
            <div className="neo-modal save-modal" onClick={e => e.stopPropagation()}>
              
              {modalMode === 'select' ? (
                <>
                  <h2>SAVE TO CATEGORY</h2>
                  <p>Where do you want to save <strong>{toolToSave.title}</strong>?</p>
                  
                  <div className="save-options">
                    {categories.map(cat => (
                      <button 
                        key={cat.id} 
                        className="save-option-btn"
                        style={{ backgroundColor: cat.color }}
                        onClick={() => handleSaveToCategory(cat.id)}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                  
                  <button className="neo-btn confirm" style={{ marginTop: '10px' }} onClick={() => setModalMode('create')}>
                    + NEW CATEGORY
                  </button>
                  <button className="neo-btn cancel-full" onClick={closeModal}>CANCEL</button>
                </>
              ) : (
                <>
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
                    <button className="neo-btn cancel" onClick={() => setModalMode('select')}>BACK</button>
                    <button className="neo-btn confirm" onClick={handleCreateAndSave}>SAVE</button>
                  </div>
                </>
              )}

            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="section-page">
      <Header title={currentSection.title} showBack={true} bgColor={currentSection.bgColor} />
      <main className="section-content">
        <div className="section-category-list">
          {currentSection.categories.map(cat => (
            <button 
              key={cat.id}
              className="section-cat-btn"
              style={{ backgroundColor: cat.color }}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};