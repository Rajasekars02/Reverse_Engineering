import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: '1px solid #1a73e8',
  },
  secondary: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: '2px solid #555',
  },
  danger: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#1a73e8',
    border: '1px solid #1a73e8',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#333',
    border: '1px dashed #999',
  },
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '4px 10px', fontSize: '12px' },
  md: { padding: '8px 18px', fontSize: '14px' },
  lg: { padding: '14px 28px', fontSize: '16px' },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  style,
  disabled,
  ...rest
}) => {
  return (
    <button
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        borderRadius: '3px',
        fontFamily: 'inherit',
        fontWeight: 600,
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? 'Please wait...' : children}
    </button>
  );
};
