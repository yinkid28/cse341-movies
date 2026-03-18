const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  genre: {
    type: String,
    required: [true, 'Genre is required'],
    trim: true
  },
  releaseYear: {
    type: Number,
    required: [true, 'Release year is required']
  },
  director: {
    type: String,
    required: [true, 'Director is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating cannot exceed 10']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required']
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    trim: true
  },
  synopsis: {
    type: String,
    required: [true, 'Synopsis is required'],
    trim: true
  }
});

module.exports = mongoose.model('Movie', movieSchema);