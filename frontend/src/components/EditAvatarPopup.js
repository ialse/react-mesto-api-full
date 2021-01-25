import React, { useState, useEffect, useContext, memo } from 'react';
import { InputEditAvatar } from './PopupHTML';
import PopupWithForm from './PopupWithForm';
import { StatePopup } from '../contexts/StatePopup';

const EditAvatarPopup = memo(({ isOpen, onClose, onUpdateAvatar, isLoading, onValidation }) => {

    // Использую контекст, чтобы понимать когда попап закрывают и очищать поля
    const { isEditAvatarPopupOpen } = useContext(StatePopup);
    const [avatar, setAvatar] = useState(''); // для корректной работы хука UseEffect для валидации

    // Стейты для валидации полей
    const [error, setError] = useState({});
    const [isInvalid, setIsInvalid] = useState(false);

    // Обработчик ввода данных в поля
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            link: avatar
        });

        // очищаю поле после нажатия Сохранить
        setAvatar('');
    }

    // Обработчик ввода данных в поля
    function handleChange(e) {
        setAvatar(e.target.value);
    }

    // Если попап закрыли, то очищаем поля, если открыли, устанавливаем
    useEffect(() => {
        if (isEditAvatarPopupOpen) {
            setAvatar('');
            setError({});
        }
    }, [isEditAvatarPopupOpen]);

    // Валидируем при каждом измении данных в полях
    useEffect(() => {
        // в res должен вернуться результат валидации и текст ошибки
        const { allErrors, isInvalid } = onValidation({ link: avatar });
        setError(() => { return allErrors });
        setIsInvalid(isInvalid);
        // eslint-disable-next-line
    }, [avatar]);

    return (
        <PopupWithForm
            name="edit-avatar"
            title="Обновить аватар"
            btnName="Сохранить"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            isInvalid={isInvalid}
        >
            <InputEditAvatar
                avatar={avatar}
                onChange={handleChange}
                error={error}
            />
        </PopupWithForm>
    );
}
);

export default EditAvatarPopup;