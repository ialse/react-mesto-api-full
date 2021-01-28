const router = require('express').Router();

// Импорт контроллеров
const getUsers = require('../controllers/users/getusers');
const getUser = require('../controllers/users/getuser');
const getCurUser = require('../controllers/users/getcuruser');
const logout = require('../controllers/users/logout');
const addUser = require('../controllers/users/adduser');
const updUser = require('../controllers/users/upduser');
const updAvatar = require('../controllers/users/updavatar');

const getCards = require('../controllers/cards/getcards');
const addCard = require('../controllers/cards/addcard');
const delCard = require('../controllers/cards/delcard');
const addLike = require('../controllers/cards/addlike');
const delLike = require('../controllers/cards/dellike');

const notFound = require('../controllers/notfound');
const {
  updUserValid, addUserValid, updAvatarValid, addCardValid, cardIdValid, userIdValid,
} = require('../helpers/validation');

// Устанавливаю обработчики роутеров
// Для пользователя
router.get('/users', getUsers);
router.get('/users/me', getCurUser);
router.get('/users/:userId', userIdValid, getUser);
router.get('/logout', logout);
router.post('/users', addUserValid, addUser);
router.patch('/users/me', updUserValid, updUser);
router.patch('/users/me/avatar', updAvatarValid, updAvatar);

// Для карточек
router.get('/cards', getCards);
router.post('/cards', addCardValid, addCard);
router.delete('/cards/:cardId', cardIdValid, delCard);
router.put('/cards/:cardId/likes', cardIdValid, addLike);
router.delete('/cards/:cardId/likes', cardIdValid, delLike);

router.all('*', notFound);

module.exports = router;
