import React, { useEffect } from 'react';

type AlertType = 'success' | 'error' | 'info';

interface SoftAlertProps {
  message: string;
  type: AlertType;
  onClose: () => void;
}

const SoftAlert: React.FC<SoftAlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  const alertStyles: React.CSSProperties = {
    padding: '15px',
    borderRadius: '5px',
    margin: '10px 0',
    opacity: 0.9,
    transition: 'opacity 0.3s ease',
    position: 'fixed',
    top: '10px',
    right: '10px',
    zIndex: 9999,
    color: 'white',
  };

  const typeStyles: React.CSSProperties = {
    backgroundColor: type === 'success' ? '#4caf50' :
                    type === 'error'   ? '#f44336' :
                    type === 'info'    ? '#2196f3' :
                    '#2196f3', // Fallback color if type is invalid
  };

  const closeButtonStyles: React.CSSProperties = {
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    cursor: 'pointer',
    marginLeft: '15px',
  };

  return (
    <div style={{ ...alertStyles, ...typeStyles }}>
      {message}
      <button onClick={onClose} style={closeButtonStyles}>×</button>
    </div>
  );
};

export default SoftAlert;
