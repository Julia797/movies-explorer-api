const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateProfile, getMe,
} = require('../controllers/users');

// GET /users/me - возвращает информацию о пользователе (email и имя)
// PATCH /users/me - обновляет информацию о пользователе (email и имя)

router.get('/me', getMe);

/*router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUserId);*/

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    //about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateProfile);

/*router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/),
  }),
}), updateAvatar);*/

module.exports = router;
