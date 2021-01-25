const jwt = require('jsonwebtoken');
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
    payload = jwt.verify(token, 'iuerteter87534hjkerbf3k4br43j5');
  } catch (err) {
    throw new ForbiddenError('Необходима авторизация');
  }

  req.user = payload;

  next();
};

