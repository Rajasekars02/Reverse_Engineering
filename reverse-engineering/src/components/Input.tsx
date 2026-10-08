import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, helpText, style, id, ...rest }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontSize: '13px',
            color: '#555',
            marginBottom: '3px',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        style={{
          width: '100%',
          padding: '7px 10px',
          border: error ? '1px solid red' : '1px solid #ccc',
          borderRadius: '3px',
          fontSize: '14px',
          boxSizing: 'border-box',
          outline: 'none',
          ...style,
        }}
        {...rest}
      />
      {helpText && !error && (
        <span style={{ fontSize: '11px', color: '#888' }}>{helpText}</span>
      )}
      {error && (
        <span style={{ fontSize: '11px', color: 'red', display: 'block' }}>{error}</span>
      )}
    </div>
  );
};
