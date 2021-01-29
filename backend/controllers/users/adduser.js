/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const User = require('../../models/user'); // импортирую модель пользователя
const RegistrationError = require('../../errors/registration-err');

// Добавляю пользователя в базу
function addUser(req, res, next) {
  const { email, name, about, avatar } = req.body;

  // Проверяем, есть ли пользователь с такой почтой в базе
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new RegistrationError('Такой Email уже используется');
      }
      return bcrypt.hash(req.body.password, 10);
    })
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      // eslint-disable-next-line prefer-object-spread
      const objUser = Object.assign({}, user._doc);
      delete objUser.password;
      return res.status(200).send(objUser);
    })
    .catch(next);
}

module.exports = addUser;
