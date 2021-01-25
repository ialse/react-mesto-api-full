import React, { useState, useEffect, useContext } from 'react';
import { InputAddCard } from './PopupHTML';
import PopupWithForm from './PopupWithForm';
import { StatePopup } from '../contexts/StatePopup';

const AddCardPopup = React.memo(({ isOpen, onClose, onAddPlace, isLoading, onValidation }) => {

    // Использую контекст, чтобы понимать когда попап закрывают и очищать поля
    const { isAddPlacePopupOpen } = useContext(StatePopup);

    const [place, setPlace] = useState('');
    const [link, setLink] = useState('');

    // Стейты для валидации полей
    const [error, setError] = useState({});
    const [isInvalid, setIsInvalid] = useState(true);

    // Обработчик нажатия кнопки Создать
    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: place,
            link
        });
    }

    // Обработчик ввода данных в поля
    function handleChange(e) {
        const { name, value } = e.target;
        // если аттрибут name имеет значение name, то устанавливаем setPlace
        // иначе setLink
        name === "name" ?
            setPlace(value) :
            setLink(value);
    }

    // Если попап закрыли, то очищаем поля, если открыли, устанавливаем
    useEffect(() => {
        if (isAddPlacePopupOpen) {
            setPlace('');
            setLink('');
            setError({});
        }
    }, [isAddPlacePopupOpen]);

    // Вызов валидации полей при каждом изменении полей
    useEffect(() => {
        const { allErrors, isInvalid } = onValidation({ name: place, link });
        setError(() => { return allErrors });
        setIsInvalid(isInvalid);
        // eslint-disable-next-line
    }, [place, link]);

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            btnName="Создать"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
            isLoading={isLoading}
            isInvalid={isInvalid}
        >
            <InputAddCard
                onChange={handleChange}
                error={error}
                place={place}
                link={link}
            />
        </PopupWithForm>
    );
});

export default AddCardPopup;