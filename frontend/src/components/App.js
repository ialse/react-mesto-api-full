import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddCardPopup from './AddCardPopup';
import DelCardPopup from './DelCardPopup';
import InfoTooltip from './InfoTooltip';
import BlockAction from './BlockAction';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

import { api } from '../utils/api';
import { validators } from '../utils/validators';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { StatePopup } from '../contexts/StatePopup';

function App() {

  const history = useHistory();
  const location = useLocation();
  // Устанавливаем стэйты
  const [currentUser, setCurrentUser] = useState({}); // состояние пользователя
  const [userEmail, setUserEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [currURL, setCurrURL] = useState('');

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false); //состояния попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDelCardPopupOpen, setIsDelCardPopupOpen] = useState(false);
  const [isInfoTooltip, setIsInfoTooltip] = useState({
    isOpen: false,
    message: '',
    status: ''
  });

  const [cardToDel, setCardToDel] = useState({}); // состояние карточки, которую удаляют
  const [selectedCard, setSelectedCard] = useState({}); //состояние карточки, по которой кликнули
  const [isLoading, setIsLoading] = useState(false); // состояние спиннера
  const [isLoadingOpen, setIsLoadingOpen] = useState(false); /* состояние спиннера
    при открытии сайта, иначе спиннер дублируется на блоке и на кнопке*/

  const [cards, setCards] = useState([]); // состояние массива карточек

  // Общая валидация для полей
  function handleValidation(inputValues) {

    // Преобразовывем объект с полями в объект с булевыми значениями и возвращаем этот объект
    const formKeys = Object.keys(inputValues);
    const allErrors = formKeys.map((key) => {
      const valueByKey = inputValues[key];

      if (!validators[key]) return {};

      const errors = Object.entries(validators[key]).map(([errorKey, validatorFn]) => {

        return { [errorKey]: validatorFn(valueByKey) };
      }).reduce((acc, item) => ({ ...acc, ...item }), {});

      return { [key]: errors };
    }).reduce((acc, item) => ({ ...acc, ...item }), {});

    // Если хоть одна проверка возвращает true, то блокируем кнопку
    let isInvalid = false;
    for (const keyInput in allErrors) {
      for (const keyCheck in allErrors[keyInput]) {
        if (allErrors[keyInput][keyCheck]) {
          isInvalid = true;
          break;
        }
      }
    }

    return { allErrors, isInvalid };
  }

  // Используем хук для получения инфы о пользователе и карточек
  useEffect(() => {
    if (loggedIn) {
      setIsLoadingOpen(true);
      Promise.all([
        api.getUserInfoFromServer(), //получаем данные о пользователе
        api.getInitialCards() // Получаем массив карточек
      ])
        .then((data) => {
          const [userData, cardsData] = data;
          setCurrentUser(userData); //меняем состояния 
          setCards(cardsData);
          setIsLoadingOpen(false);
        })
        .catch((err) => { api.setErrorServer(err); })
    }
  }, [loggedIn]);

  // Обработчик клика по лайку
  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);  // Обновляем стейт
      })
      .catch((err) => { api.setErrorServer(err); });
  }

  // Обработчик кнопки удаления карточки
  function handleCardDelete(cardToDel) {
    setIsLoading(true); //ставим блок и спиннер
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCardToServer(cardToDel)
      .then(() => {
        // Формируем новый массив на основе имеющегося, если ИД совпадает с ИД 
        // удаляемой карточки, то она не должна попасть в новый массив
        const newCards = cards.filter((c) => c._id !== cardToDel._id && c);
        setCards(newCards);  // Обновляем стейт
      })
      .catch((err) => { api.setErrorServer(err); })
      .finally(() => {
        setIsLoading(false);  //убираем блок и спиннер
        closeAllPopups();
      });
  }

  // Обработчик кнопки Сохранить в попапе редактирования профиля
  function handleUpdateUser(inputValues) {
    setIsLoading(true);
    api.saveUserInfoToServer(inputValues)   // Сохраняем на сервере
      .then((userData) => { setCurrentUser(userData) }) // устанавливаем новый стэйт: новые данные пользователя
      .catch((err) => { api.setErrorServer(err); })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  // Обработчик кнопки Сохранить в попапе редактирования аватара
  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api.saveAvatarToServer(avatar)   // Сохраняем на сервере
      .then((userData) => { setCurrentUser(userData) }) // устанавливаем новый стэйт: новый аватар
      .catch((err) => { api.setErrorServer(err); })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  // Обработчик кнопки Создать в попапе добавления карточки
  function handleAddPlace(newCard) {
    setIsLoading(true);
    api.saveCardToServer(newCard)   // Сохраняем на сервере
      .then((newCard) => { setCards([newCard, ...cards]) }) // Обновляем массив с карточками, добавляем загруженную
      .catch((err) => { api.setErrorServer(err); })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      });
  }

  function handleAuthRegister(email, password) {
    auth.register(email, password)
      .then((res) => {
        if (res.email) {
          onInfoTooltip('Вы успешно зарегистрировались!', 'ok')
          history.push('/sign-in');
          changeCurrUrl('/sign-in');
          return;
        }
        onInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.', 'error')
        return res;
      })
      .catch((err) => {
        onInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.', 'error');
        console.log(err)
      });
  }

  function handleAuthLogin(email, password) {
    return auth.authorize(email, password)
      .then((data) => {
        if (data) {
          handleLogin(email);
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }

  // Обработчики открытия попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleDelCardPopup(card) {
    setIsDelCardPopupOpen(true);
    setCardToDel(card);
  }

  function onInfoTooltip(message, status) {
    setIsInfoTooltip({
      isOpen: true,
      message: message,
      status: status
    });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Обработчик клика по оверлею при открытом попапе
  function handleClickOverlay(e) {
    if (e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  // Обработчик закрытия попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDelCardPopupOpen(false);
    setIsInfoTooltip(false);
    setSelectedCard({});
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setUserEmail(email);
  }

  function tokenCheck() {
    auth.getContent()
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(res.email);
        history.push('/');
      })
      .catch(err => console.log(err));
  }

  function signOut() {
    auth.logout();
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function changeCurrUrl(url) {
    setCurrURL(url);
  }

  useEffect(() => {
    tokenCheck();
    // eslint-disable-next-line
  }, []);

  // Сохраняю в стейт текущий URL, чтобы в Header правильно 
  // подставлять ссылку, так как использую одну форму на логин и регистрацию
  useEffect(() => {
    setCurrURL(location.pathname);
  }, [location.pathname, currURL]);

  // Обработчик нажатия Esc
  useEffect(() => {
    document.body.addEventListener('keyup', function (e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    })

  }, []);

  // Объект с состояниями попапов
  const popupStateContext = {
    isEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    isAddPlacePopupOpen
  }

  return (
    <StatePopup.Provider value={popupStateContext}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page" onMouseDown={handleClickOverlay} >
          <Header
            email={userEmail}
            signOut={signOut}
            loggedIn={loggedIn}
            currURL={currURL}
            changeCurrUrl={changeCurrUrl} />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn} component={() => (<Main
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick} // Обработчик клика по карточке
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleDelCardPopup}
              isLoading={isLoading}
            />)
            } />
            <Route path="/sign-up">
              <Register
                changeCurrUrl={changeCurrUrl}
                authRegister={handleAuthRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                handleLogin={handleLogin}
                authLogin={handleAuthLogin}
              />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch >

          <Footer />
          {/*Создаем попап для аватара и передаем пропсы и обработчики*/}
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
            onValidation={handleValidation}
          />

          {/*Создаем попап для профиля и передаем пропсы и обработчики*/}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            onValidation={handleValidation}
          />

          {/*Создаем попап для новой карточки и передаем пропсы и обработчики*/}
          <AddCardPopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlace}
            isLoading={isLoading}
            onValidation={handleValidation}
          />

          {/*Создаем попап для подтверждения удаления карточки и передаем пропсы и обработчики*/}
          <DelCardPopup
            isOpen={isDelCardPopupOpen}
            onClose={closeAllPopups}
            onDelCard={handleCardDelete}
            card={cardToDel}
            isLoading={isLoading}
          >
          </DelCardPopup>

          {/*Создаем попап с картинкой и передаем пропсы и обработчики*/}
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />

          {/*Попап с сообщением*/}
          {<InfoTooltip
            isOpen={isInfoTooltip}
            onClose={closeAllPopups}
          />}

          {/*Если isLoading=true, то ставим блок, чтобы пользователь не мог что то поменять*/}
          {(isLoadingOpen || isLoading) && <BlockAction isLoadingOpen={isLoadingOpen} />}

        </div>
      </CurrentUserContext.Provider>
    </StatePopup.Provider>
  );
}

export default App;