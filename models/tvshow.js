const mongoose = require('mongoose');

const tvshowSchema = new mongoose.Schema({
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
  seasons: {
    type: Number,
    required: [true, 'Number of seasons is required']
  },
  episodes: {
    type: Number,
    required: [true, 'Number of episodes is required']
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['Ongoing', 'Ended'],
  },
  network: {
    type: String,
    required: [true, 'Network is required'],
    trim: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [10, 'Rating cannot exceed 10']
  },
  language: {
    type: String,
    required: [true, 'Language is required'],
    trim: true
  }
});

module.exports = mongoose.model('Tvshow', tvshowSchema);