require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const login = require('./controllers/users/login');
const createUser = require('./controllers/users/adduser');
const auth = require('./middlewares/auth');
const finalErr = require('./errors/final-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { addUserValid } = require('./helpers/validation');
const { corsOptions } = require('./helpers/cors-options');

const { PORT = 3000, DB_CONN } = process.env;
const app = express();

mongoose.connect(DB_CONN, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('*', cors(corsOptions));
app.use(bodyParser.json()); // Включаю бодипарсер
app.use(requestLogger); // Лог запросов

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', addUserValid, login);
app.post('/signup', addUserValid, createUser);

// остальные роуты защищаем миддлварой auth
app.use(auth);
app.use('/', router);

app.use(errorLogger); // лог ошибок
// обработчик ошибок централизованный
app.use(errors()); // Обработчик ошибок celebrate
app.use(finalErr);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер работает. Порт: ${PORT}`);
});
