const fetch = require('node-fetch');

const BASE_URL = 'https://api.themoviedb.org/3';

module.exports = {

  /** return lastest movies */
  async discover(req, res) {
    try {
      const response = await fetch(`${BASE_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`);
      const data = await response.json();
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send(error);
    }
  },

  /** find a specific movie */
  async findMovie(req, res) {
    const { id } = req.params;
    try {
      const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
      const data = await response.json();
      res.status(200).send(data);
    } catch (error) {
      res.status(404).send(error);
    }
  }
}