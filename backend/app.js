const path = require('path');
const express = require('express');
const cors = require('cors');
const { celebrate, Joi, errors } = require('celebrate');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes/routes');
const login = require('./controllers/users/login');
const createUser = require('./controllers/users/adduser');
const auth = require('./middlewares/auth');
const finalErr = require('./errors/final-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const corsOptions = {
  origin: [
    'http://localhost:3001',
    'http://localhost:3000',
    'http://127.0.0.1:3001',
    'http://127.0.0.1:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
  ],
  credentials: true,
};

app.use('*', cors(corsOptions));

// Включаю бодипарсер
app.use(bodyParser.json());

// Включаю раздачу статичных файлов
app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger); // лог запросов

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

// остальные роуты защищаем миддлварой auth
app.use(auth);
app.use('/', router);

app.use(errorLogger); // лог ошибок
// обработчик ошибок централизованный
app.use(errors()); // Обработчик ошибок celebrate
app.use(finalErr);

app.listen(PORT, () => {
  console.log(`Сервер работает. Порт: ${PORT}`);
});
