import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required,
  error,
  children,
  style,
}) => {
  return (
    <div style={{ marginBottom: '14px', ...style }}>
      <label
        style={{
          display: 'block',
          marginBottom: '4px',
          fontSize: '14px',
          color: '#444',
          fontWeight: 500,
        }}
      >
        {label}
        {required && (
          <span style={{ color: '#aaa', marginLeft: '2px', fontSize: '12px' }}>*</span>
        )}
      </label>
      {children}
      {error && (
        <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#e53935' }}>{error}</p>
      )}
    </div>
  );
};
