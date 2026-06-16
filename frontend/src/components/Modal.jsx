import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, footer, testIdPrefix = 'modal' }) => {
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={handleOverlayClick}
      data-testid={`${testIdPrefix}-overlay`}
    >
      <div className="modal-content" data-testid={`${testIdPrefix}-content`}>
        <div className="modal-header">
          <h3 className="modal-title" data-testid={`${testIdPrefix}-title`}>{title}</h3>
          <button 
            className="modal-close" 
            onClick={onClose}
            data-testid={`${testIdPrefix}-close-btn`}
          >
            <X size={20} />
          </button>
        </div>
        <div className="modal-body" data-testid={`${testIdPrefix}-body`}>
          {children}
        </div>
        {footer && (
          <div className="modal-footer" data-testid={`${testIdPrefix}-footer`}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
