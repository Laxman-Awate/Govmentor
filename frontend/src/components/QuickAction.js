// In components/QuickAction.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './QuickAction.css';

function QuickAction({ icon, label, primary = false, link, onClick }) {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else if (link) {
      navigate(link);
    }
  };

  return (
    <div 
      className={`quick-action ${primary ? 'primary' : ''}`}
      onClick={handleClick}
      style={{ 
        cursor: 'pointer',
        padding: '15px',
        borderRadius: '8px',
        background: primary ? '#4a6cf7' : '#f5f7ff',
        color: primary ? 'white' : '#333',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}
    >
      <FontAwesomeIcon 
        icon={icon} 
        style={{ 
          fontSize: '1.5rem',
          color: primary ? 'white' : '#4a6cf7'
        }} 
      />
      <span style={{ 
        fontWeight: 500,
        fontSize: '0.9rem'
      }}>
        {label}
      </span>
    </div>
  );
}

export default QuickAction;