import React from 'react';
import PopupWithForm from './PopupWithForm';

const DelCardPopup = React.memo(({ isOpen, onClose, onDelCard, card, isLoading }) => {

    function handleSubmit(e) {
        e.preventDefault();
        onDelCard(card);
    }

    return (
        <PopupWithForm
            name="confirm-delete"
            title="Вы уверены?"
            btnName="Да"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        >
        </PopupWithForm>
    );
}
);

export default DelCardPopup;