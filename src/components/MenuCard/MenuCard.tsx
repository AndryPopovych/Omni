import React, { ReactNode, FC } from 'react';
import './MenuCard.css';

export interface MenuCardProps {
  title: string;
  color: string;
  icon: ReactNode;
  onClick?: () => void;
}

export const MenuCard: FC<MenuCardProps> = ({ title, color, icon, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ backgroundColor: color }}
      className="menu-card"
    >
      <div className="menu-card__icon">{icon}</div>
      <span className="menu-card__title">{title}</span>
    </button>
  );
};