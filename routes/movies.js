const express = require('express');
const router = express.Router();
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movies');
const isAuthenticated = require('./middleware/isAuthenticated');

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.post('/', isAuthenticated, createMovie);
router.put('/:id', isAuthenticated, updateMovie);
router.delete('/:id', isAuthenticated, deleteMovie);

module.exports = router;