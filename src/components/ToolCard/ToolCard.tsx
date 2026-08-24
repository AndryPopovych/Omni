import { FC } from 'react';
import './ToolCard.css';

export interface ToolItemProps {
  id: string;
  title: string;
  url: string;
  description: string;
}

interface Props {
  tool: ToolItemProps;
  onSaveClick: (tool: ToolItemProps) => void;
}

export const ToolCard: FC<Props> = ({ tool, onSaveClick }) => {
  return (
    <div className="neo-tool-card">
      <div className="neo-tool-header">
        <h3>{tool.title}</h3>
      </div>
      <p className="neo-tool-desc">{tool.description}</p>
      
      <div className="neo-tool-actions">
        <a 
          href={tool.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="neo-btn-tool link-btn"
        >
          OPEN
        </a>
        <button 
          className="neo-btn-tool save-btn" 
          onClick={() => onSaveClick(tool)}
        >
          SAVE
        </button>
      </div>
    </div>
  );
};