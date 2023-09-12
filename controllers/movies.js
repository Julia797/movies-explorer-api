const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.deleteMovie = (req, res, next) => {
  if (req.params._id.match(/^[0-9a-fA-F]{24}$/)) {
    Movie.findById(req.params._id)
      .orFail(new Error('NotValidId'))
      .then((movie) => {
        if (!movie.owner.equals(req.user._id)) {
          throw new ForbiddenError('Нет прав для удаления фильма');
        }
        Movie.deleteOne(movie)
          .then(() => {
            res.status(200).send({ message: 'Фильм удален' });
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        if (err.message === 'NotValidId') {
          next(new NotFoundError('Фильм с таким id не найдена'));
        } else {
          next(err);
        }
      });
  } else {
    next(new BadRequestError('Не корректный Id фильма'));
  }
};
