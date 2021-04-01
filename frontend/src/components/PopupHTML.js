import React, { memo } from 'react';

export const InputEditAvatar = memo(({ onChange, error, avatar }) => {
  return (
    <label className="popup__field">
      <input
        type="url"
        className="popup__input popup__input_link"
        id="link-input-avatar"
        name="link"
        placeholder="Ссылка на картинку для аватара"
        onChange={onChange}
        value={avatar}
      />
      <span className="popup__error popup__error_visible" id="link-input-error">
        {(!!Object.keys(error).length && error.link.required && 'Заполните это поле') ||
          (!!Object.keys(error).length && error.link.http && 'Введите URL')}
      </span>
    </label>
  );
});

export const InputEditProfile = memo(({ inputName, inputAbout, onChange, error }) => {
  return (
    <>
      <label className="popup__field">
        <input
          type="text"
          className="popup__input popup__input_name"
          id="name-input"
          placeholder="Имя"
          name="name"
          minLength="2"
          maxLength="40"
          value={inputName || ''}
          onChange={onChange}
        />
        <span className="popup__error popup__error_visible" id="name-input-error">
          {(Object.keys(error).length && error.name.required && 'Заполните это поле') ||
            (Object.keys(error).length && error.name.minLength && 'Текст должен быть не короче 2 символов')}
        </span>
      </label>
      <label className="popup__field">
        <input
          type="text"
          className="popup__input popup__input_work"
          id="work-input"
          placeholder="Работа"
          name="about"
          minLength="2"
          maxLength="200"
          value={inputAbout || ''}
          onChange={onChange}
        />
        <span className="popup__error popup__error_visible" id="work-input-error">
          {(Object.keys(error).length && error.about.required && 'Заполните это поле') ||
            (Object.keys(error).length && error.about.minLength && 'Текст должен быть не короче 2 символов')}
        </span>
      </label>
    </>
  );
});

export const InputAddCard = memo(({ onChange, error, place, link }) => {
  return (
    <>
      <label className="popup__field">
        <input
          type="text"
          className="popup__input popup__input_place"
          id="title-input"
          name="name"
          placeholder="Название"
          minLength="1"
          maxLength="30"
          onChange={onChange}
          value={place}
        />
        <span className="popup__error popup__error_visible" id="title-input-error">
          {(!!Object.keys(error).length && error.name.required && 'Заполните это поле') ||
            (!!Object.keys(error).length && error.name.minLength && 'Текст должен быть не короче 2 символов')}
        </span>
      </label>
      <label className="popup__field">
        <input
          type="url"
          className="popup__input popup__input_link"
          id="link-input-card"
          name="link"
          placeholder="Ссылка на картинку"
          onChange={onChange}
          value={link}
        />
        <span className="popup__error popup__error_visible" id="link-input-error">
          {(!!Object.keys(error).length && error.link.required && 'Заполните это поле') ||
            (!!Object.keys(error).length && error.link.http && 'Введите URL')}
        </span>
      </label>
    </>
  );
});
