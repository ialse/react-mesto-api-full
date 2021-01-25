import React, { memo } from 'react';

const ImagePopup = memo(({ card, onClose }) => {
  return (
    <div className={`popup popup_image ${Object.keys(card).length && 'popup_opened'}`}>
      <form className="popup__container popup__container_image" name="popup__image" noValidate>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__title popup__title_popup-image">{card.name}</h2>
        <button type="button" className="popup__btn-close" onClick={onClose}></button>
      </form>
    </div>
  );
});

export default ImagePopup;
