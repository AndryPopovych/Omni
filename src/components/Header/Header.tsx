import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export interface HeaderProps {
  title: string;
  showBack?: boolean;
  bgColor?: string;
  rightElement?: ReactNode;
}

export const Header: FC<HeaderProps> = ({ title, showBack = false, bgColor, rightElement }) => {
  const navigate = useNavigate();

  return (
    <header 
      className="omni-universal-header" 
      style={{ backgroundColor: bgColor || 'var(--bg-main)' }}
    >
      <div className="omni-header-left">
        {showBack && (
          <button className="neo-btn-back" onClick={() => navigate(-1)}>
            {'<'}
          </button>
        )}
        <h1 className="omni-header-title">{title}</h1>
      </div>
      <div className="omni-header-right">
        {rightElement}
      </div>
    </header>
  );
};