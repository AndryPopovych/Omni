import { FC, useState } from 'react';
import { Header } from '../../components/Header/Header';
import { ToolCard, ToolItemProps } from '../../components/ToolCard/ToolCard';
import { useSavedStore } from '../../store/savedStore';
import './AiPage.css';

// Мокові дані для категорій та інструментів
const aiCategories = [
  { id: 'text', name: 'TEXT & WRITING', color: '#4DFFB8' },
  { id: 'image', name: 'IMAGE & PHOTO', color: '#FFA64D' },
  { id: 'video', name: 'VIDEO & ANIMATION', color: '#FF4DF0' },
];

const mockTools: Record<string, ToolItemProps[]> = {
  text: [
    { id: 't1', title: 'ChatGPT', description: 'The most popular conversational AI model by OpenAI.', url: 'https://chat.openai.com' },
    { id: 't2', title: 'Claude', description: 'Advanced AI assistant by Anthropic, great for large texts.', url: 'https://claude.ai' },
  ],
  image: [
    { id: 'i1', title: 'Midjourney', description: 'Incredible AI image generator accessible via Discord.', url: 'https://midjourney.com' },
  ],
  video: [],
};

export const AiPage: FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Zustand для збереження
  const { categories, saveToolToCategory } = useSavedStore();
  const [toolToSave, setToolToSave] = useState<ToolItemProps | null>(null);

  const handleSaveToCategory = (categoryId: string) => {
    if (toolToSave) {
      saveToolToCategory(categoryId, toolToSave);
      setToolToSave(null); // Закриваємо модалку після збереження
    }
  };

  // Якщо категорія обрана — показуємо список інструментів
  if (activeCategory) {
    const currentCategoryInfo = aiCategories.find(c => c.id === activeCategory);
    const toolsList = mockTools[activeCategory] || [];

    return (
      <div className="ai-page">
        {/* Кастомний Header, який замість повернення на головну, скидає категорію */}
        <header className="omni-universal-header" style={{ backgroundColor: currentCategoryInfo?.color }}>
          <div className="omni-header-left">
            <button className="neo-btn-back" onClick={() => setActiveCategory(null)}>{'<'}</button>
            <h1 className="omni-header-title">{currentCategoryInfo?.name}</h1>
          </div>
        </header>

        <main className="ai-content">
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

  // Дефолтний вигляд: Список категорій AI
  return (
    <div className="ai-page">
      <Header title="⊕ AI TOOLS" showBack={true} bgColor="#4DFFB8" />
      <main className="ai-content">
        <div className="ai-category-list">
          {aiCategories.map(cat => (
            <button 
              key={cat.id}
              className="ai-cat-btn"
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