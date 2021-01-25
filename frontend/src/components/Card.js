import React, { useContext, memo } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = memo(({ card, onCardClick, onCardLike, onCardDelete }) => {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = currentUser._id === card.owner._id;
    const cardButtonRemoveClassName = `element__button-remove ${isOwn && 'element__button-remove_active'}`;

    const isLiked = card.likes.some(like => like._id === currentUser._id);
    const cardButtonLikeClassName = `element__button-like ${isLiked && 'element__button-like_active'}`;

    return (
        <article className="element">
            <img
                className="element__image"
                src={card.link}
                alt={card.name}
                onClick={() => onCardClick(card)}
            />
            <h2 className="element__title">{card.name}</h2>
            <div className="element__likes">
                <button
                    type="button"
                    className={cardButtonLikeClassName}
                    onClick={() => onCardLike(card)}
                ></button>

                <span className="element__likes-count">{card.likes.length}</span>
            </div>
            <button
                type="button"
                className={cardButtonRemoveClassName}
                onClick={() => onCardDelete(card)}
            ></button>
        </article>
    );
});

export default Card;