const fetch = require('node-fetch');
const { API_KEY, BASE_URL, OPTIONS_DEFAULT, LANG } = require('./movies-url');

const discover = async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&${LANG}&sort_by=popularity.desc&${OPTIONS_DEFAULT}&page=1`);
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
}

const findMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&${LANG}`);
    const data = await response.json();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
}

module.exports = {
  findMovie,
  discover
}