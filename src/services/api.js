import axios from 'axios';

const API_KEY = 'e3bf602b472e2407062f1ad3c0b8d4a0';
const BASE_URL = 'https://api.themoviedb.org/3/movie/';
const BASE_URL_TV = 'https://api.themoviedb.org/3/tv/';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/';


export const getMoviesByCategory = async (category) => {
  try {
    const response = await axios.get(`${BASE_URL}${category}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error to get movies:', error);
    return [];
  }
};


export const getTvShows = async (category) => {
  try {
     const response = await axios.get(`${BASE_URL_TV}${category}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Error to get TV shows:', error);
    return [];
  }
}

export const getSearch = async (category = 'movie', query) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/${category}`, {
      params: {
        api_key: API_KEY,
        language: 'en-US',
        page: 1,
        query: query,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error(`Error searching ${type}s:`, error);
    return [];
  }
};
