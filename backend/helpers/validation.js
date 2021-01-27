const { celebrate, Joi } = require('celebrate');

const addUserValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const updUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updAvatarValid = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
});

const addCardValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),
  }),
});

module.exports = {
  addUserValid, updUserValid, updAvatarValid, addCardValid,
};
