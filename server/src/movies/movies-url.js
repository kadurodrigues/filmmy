const API_KEY = process.env.TMDB_API_KEY;
const LANG = 'language=en-US';
const BASE_URL = 'https://api.themoviedb.org/3';
const OPTIONS_DEFAULT = 'include_adult=false&include_video=false';

module.exports = {
  API_KEY,
  BASE_URL,
  OPTIONS_DEFAULT,
  LANG
}