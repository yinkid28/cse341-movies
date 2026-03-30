const express = require('express');
const router = express.Router();
const {
  getAllTvshows,
  getTvshowById,
  createTvshow,
  updateTvshow,
  deleteTvshow
} = require('../controllers/tvshows');
const isAuthenticated = require('./middleware/isAuthenticated');

router.get('/', getAllTvshows);
router.get('/:id', getTvshowById);
router.post('/', isAuthenticated, createTvshow);
router.put('/:id', isAuthenticated, updateTvshow);
router.delete('/:id', isAuthenticated, deleteTvshow);

module.exports = router;