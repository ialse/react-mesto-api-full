const mongoose = require('mongoose');
const validatorLib = require('validator');
const httpValid = require('../helpers/regexp');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Минимальная длина 2 символа'],
    maxlength: [30, 'Максимальная длина 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(link) {
        return httpValid(link);
      },
      message: 'Ссылка на аватар некорректная',
    },
  },
  email: {
    type: String,
    required: [true, 'Поле Email обязательно!'],
    unique: true,
    validate: {
      validator(email) {
        return validatorLib.isEmail(email);
      },
      message: 'Указанный Email некорректный',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле Пароль обязательно!'],
    minlength: [8, 'Минимальная длина 8 символов'],
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
