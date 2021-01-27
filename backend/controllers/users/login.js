const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;
const User = require('../../models/user');
const AuthorisationError = require('../../errors/authorisation-err');

function login(req, res, next) {
  const { email, password } = req.body;
  let userID;

  return User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthorisationError('Неправильные почта или пароль');
      }
      userID = user.id;

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new AuthorisationError('Неправильные почта или пароль');
      }

      // генерируем уникальный ключ и шифруем его
      const token = jwt.sign(
        { _id: userID },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev',
        { expiresIn: 3600 * 24 * 7 },
      );

      // отправляем пользователю ответ с куками
      res.cookie(
        'jwt',
        token,
        {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSite: true,
        },
      )
        .send({ message: 'Авторизация успешна!' });
    })
    .catch(next);
}

module.exports = login;
