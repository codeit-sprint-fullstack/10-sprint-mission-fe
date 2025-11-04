import React from "react";
import '../styles/modal.css'

export default function ErrorModal({ open, message, onClose }) {
  if (!open) return null;

  return (
    <div 
    id="errorModal"
    className="modal"
    aria-hidden={open ? "false" : "true"}
    role="dialog"
    aria-modal="true"
    >
      <div className="modal-backdrop" data-close="true" onClick={onClose} />
      <div className="modal-panel" role="document">
        <p id="errorModalMessage" className="modal-message">
          {message}
        </p>
        <button id="errorModalCloseBtn" className="modal-close" onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
}