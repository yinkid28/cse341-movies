const express = require('express');
const router = express.Router();
const {
  getAllTvshows,
  getTvshowById,
  createTvshow,
  updateTvshow,
  deleteTvshow
} = require('../controllers/tvshows');

router.get('/', getAllTvshows);
router.get('/:id', getTvshowById);
router.post('/', createTvshow);
router.put('/:id', updateTvshow);
router.delete('/:id', deleteTvshow);

module.exports = router;