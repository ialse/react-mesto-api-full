import React, { memo } from 'react';
import Spinner from './Spinner';

const PopupWithForm = memo(({ name, title, btnName, isOpen, onClose, onSubmit, children, isLoading, isInvalid }) => {

  return (
    <div className={`popup  popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <form className="popup__form" name={`popup__form_${name}`} noValidate onSubmit={onSubmit} >
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" className={`popup__btn-submit ${isInvalid ? 'popup__btn-submit_disabled' : ''}`} disabled={isInvalid}>
          {isLoading
            ? <Spinner />
            : btnName
          }
        </button>
        <button type="button" className="popup__btn-close" onClick={onClose}></button>
      </form>
    </div>
  );
});

export default PopupWithForm;

