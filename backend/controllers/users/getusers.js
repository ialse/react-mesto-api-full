const User = require('../../models/user');

// Получаю данные пользователей из файла
function getUsers(req, res, next) {
  return User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
}

module.exports = getUsers;
