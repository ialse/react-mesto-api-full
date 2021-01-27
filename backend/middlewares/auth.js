const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const ForbiddenError = require('../errors/forbidden-err');

// при каждом заходе пользователя проверяем его куку, корректный ли там jwt
module.exports = (req, res, next) => {
  const { cookie } = req.headers;

  if (!cookie) {
    throw new ForbiddenError('Необходима авторизация');
  }

  const token = cookie.replace('jwt=', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev');
  } catch (err) {
    throw new ForbiddenError('Необходима авторизация');
  }

  req.user = payload;

  next();
};

