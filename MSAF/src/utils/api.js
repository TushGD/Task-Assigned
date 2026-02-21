import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || 'a18de79e';
const BASE_URL = 'https://www.omdbapi.com/';


const FALLBACK_KEY = 'a18de79e'; 
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY === 'a18de79e' ? FALLBACK_KEY : API_KEY,
  },
});

export const searchMovies = async (query, page = 1) => {
  if (!query.trim()) return { Search: [], totalResults: 0 };
  
  try {
    const response = await api.get('/', {
      params: { s: query, page, type: 'movie' }
    });
    
    if (response.data.Response === 'True') {
      return {
        Search: response.data.Search,
        totalResults: parseInt(response.data.totalResults) || 0,
      };
    } else {
      throw new Error(response.data.Error || 'No results found');
    }
  } catch (error) {
    if (error.response?.data?.Error) {
      throw new Error(error.response.data.Error);
    }
    throw error;
  }
};

export const getMovieDetails = async (imdbID) => {
  try {
    const response = await api.get('/', {
      params: { i: imdbID, plot: 'short' }
    });
    
    if (response.data.Response === 'True') {
      return response.data;
    } else {
      throw new Error(response.data.Error || 'Movie details not found');
    }
  } catch (error) {
    throw error;
  }
};

export const getInitialMovies = async () => {
  // Fetch popular movies (using some common search terms)
  const popularTerms = ['marvel', 'star wars', 'harry potter', 'inception', 'matrix'];
  const randomTerm = popularTerms[Math.floor(Math.random() * popularTerms.length)];
  
  try {
    return await searchMovies(randomTerm);
  } catch (error) {
    console.error('Failed to fetch initial movies:', error);
    return { Search: [], totalResults: 0 };
  }
};