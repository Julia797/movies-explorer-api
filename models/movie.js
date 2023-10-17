const mongoose = require('mongoose');
const urlTest = require('../utils/constants');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Необходимо заполнить поле "country"'],
    },
    director: {
      type: String,
      required: [true, 'Необходимо заполнить поле "director"'],
    },
    duration: {
      type: Number,
      required: [true, 'Необходимо заполнить поле "duration"'],
    },
    year: {
      type: String,
      required: [true, 'Необходимо заполнить поле "year"'],
      validate: {
        validator(v) {
          return /^\d{4}$/.test(v);
        },
        message: 'Введите год выпуска фильма',
      },
    },
    description: {
      type: String,
      required: [true, 'Необходимо заполнить поле "description"'],
    },
    image: {
      type: String,
      required: [true, 'Необходимо заполнить поле "image"'],
      validate: {
        validator(URL) {
          return urlTest.test(URL);
        },
        message: 'Введите URL',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Необходимо заполнить поле "trailerLink"'],
      validate: {
        validator(URL) {
          return urlTest.test(URL);
        },
        message: 'Введите URL',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Необходимо заполнить поле "thumbnail"'],
      validate: {
        validator(URL) {
          return urlTest.test(URL);
        },
        message: 'Введите URL',
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: [true, 'Необходимо заполнить поле "nameRU"'],
    },
    nameEN: {
      type: String,
      required: [true, 'Необходимо заполнить поле "nameEN"'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
