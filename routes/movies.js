const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlTest = require('../utils/constants');

const {
  createMovie, getMovies, deleteMovie,
} = require('../controllers/movies');

// GET /movies - возвращает все сохранённые текущим пользователем фильмы
// POST /movies - создаёт фильм с переданными в теле параметрами
// DELETE /movies/_id - удаляет сохранённый фильм по id

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required().pattern(/^\d{4}$/),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(urlTest),
    trailerLink: Joi.string().required().pattern(urlTest),
    thumbnail: Joi.string().required().pattern(urlTest),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

router.get('/', getMovies);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().length(24).hex(),
  }),
}), deleteMovie);

module.exports = router;
