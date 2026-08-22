import { FC, useState } from 'react';
import './SavedPage.css';

export interface SavedItem {
  id: string;
  title: string;
  url?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  items: SavedItem[];
}

export const SavedPage: FC = () => {
  // Прибрали setCategories, залишили тільки categories
  const [categories] = useState<Category[]>([
    { id: '1', name: 'NEURAL NETWORKS', color: '#4DFFB8', items: [] },
    { id: '2', name: 'UI INSPIRATION', color: '#FFA64D', items: [] },
  ]);

  const handleAddCategory = () => {
    console.log('Add new category clicked');
  };

  return (
    <div className="saved-page">
      <header className="saved-header">
        <h1 className="saved-title">♪ SAVED</h1>
        <button className="neo-btn-icon" onClick={handleAddCategory}>
          +
        </button>
      </header>

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
    </div>
  );
};