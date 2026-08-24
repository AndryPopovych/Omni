import { FC, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import { ToolCard, ToolItemProps } from '../../components/ToolCard/ToolCard';
import { useSavedStore } from '../../store/savedStore';
import { appData } from '../../data/toolsData';
import './SectionPage.css';

export const SectionPage: FC = () => {
  // Дістаємо назву розділу з URL (наприклад, 'ai', 'dev', 'design')
  const { sectionId } = useParams<{ sectionId: string }>();
  
  // Знаходимо дані для цього розділу в нашій базі
  const currentSection = sectionId ? appData[sectionId.toUpperCase()] : null;

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { categories, saveToolToCategory } = useSavedStore();
  const [toolToSave, setToolToSave] = useState<ToolItemProps | null>(null);

  // Якщо хтось ввів неправильний URL — повертаємо на головну
  if (!currentSection) {
    return <Navigate to="/" replace />;
  }

  const handleSaveToCategory = (categoryId: string) => {
    if (toolToSave) {
      saveToolToCategory(categoryId, toolToSave);
      setToolToSave(null);
    }
  };

  // 1. ВІДМАЛЬОВКА СПИСКУ ІНСТРУМЕНТІВ (ЯКЩО ОБРАНА КАТЕГОРІЯ)
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

        {/* Модалка збереження */}
        {toolToSave && (
          <div className="neo-modal-overlay" onClick={() => setToolToSave(null)}>
            <div className="neo-modal save-modal" onClick={e => e.stopPropagation()}>
              <h2>SAVE TO CATEGORY</h2>
              <p>Where do you want to save <strong>{toolToSave.title}</strong>?</p>
              
              <div className="save-options">
                {categories.length > 0 ? categories.map(cat => (
                  <button 
                    key={cat.id} 
                    className="save-option-btn"
                    style={{ backgroundColor: cat.color }}
                    onClick={() => handleSaveToCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                )) : (
                  <p>You don't have any categories. Create one in the SAVED tab first!</p>
                )}
              </div>
              <button className="neo-btn cancel-full" onClick={() => setToolToSave(null)}>CANCEL</button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. ВІДМАЛЬОВКА СПИСКУ КАТЕГОРІЙ (ГОЛОВНИЙ ЕКРАН РОЗДІЛУ)
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