import React from 'react';

interface CardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, style, className, onClick }) => {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: '#fff',
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '16px',
        boxShadow: '1px 1px 3px rgba(0,0,0,0.08)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
