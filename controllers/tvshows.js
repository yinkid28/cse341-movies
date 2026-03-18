const Tvshow = require('../models/tvshow');

const getAllTvshows = async (req, res) => {
  try {
    const tvshows = await Tvshow.find();
    res.status(200).json(tvshows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTvshowById = async (req, res) => {
  try {
    const tvshow = await Tvshow.findById(req.params.id);
    if (!tvshow) return res.status(404).json({ error: 'TV show not found' });
    res.status(200).json(tvshow);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    res.status(500).json({ error: err.message });
  }
};

const createTvshow = async (req, res) => {
  try {
    const tvshow = new Tvshow(req.body);
    const saved = await tvshow.save();
    res.status(201).json({ id: saved._id });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

const updateTvshow = async (req, res) => {
  try {
    const result = await Tvshow.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!result) return res.status(404).json({ error: 'TV show not found' });
    res.status(204).send();
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

const deleteTvshow = async (req, res) => {
  try {
    const result = await Tvshow.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'TV show not found' });
    res.status(200).json({ message: 'TV show deleted successfully' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTvshows,
  getTvshowById,
  createTvshow,
  updateTvshow,
  deleteTvshow
};