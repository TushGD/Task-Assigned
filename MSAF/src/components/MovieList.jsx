import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { searchMovies, getInitialMovies } from '../utils/api';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import LoadingSpinner from './LoadingSpinner';

const MovieList = ({ showToast }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Load initial movies
  useEffect(() => {
    const loadInitialMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getInitialMovies();
        setMovies(data.Search || []);
        setTotalResults(data.totalResults || 0);
      } catch (err) {
        setError(err.message || 'Failed to load movies');
        showToast?.(err.message || 'Failed to load movies', 'error');
      } finally {
        setLoading(false);
      }
    };
    
    loadInitialMovies();
  }, [showToast]);

  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      // If search is empty, load initial movies again
      setSearchQuery('');
      setMovies([]);
      setTotalResults(0);
      return;
    }
    
    setSearchQuery(query);
    setLoading(true);
    setError(null);
    
    try {
      const data = await searchMovies(query, 1);
      setMovies(data.Search || []);
      setTotalResults(data.totalResults || 0);
      setCurrentPage(1);
      
      if (data.Search?.length === 0) {
        showToast?.('No movies found', 'info');
      }
    } catch (err) {
      setError(err.message);
      setMovies([]);
      showToast?.(err.message, 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  const handleLoadMore = async () => {
    if (!searchQuery) return;
    
    const nextPage = currentPage + 1;
    setLoading(true);
    
    try {
      const data = await searchMovies(searchQuery, nextPage);
      setMovies(prev => [...prev, ...(data.Search || [])]);
      setCurrentPage(nextPage);
    } catch (err) {
      showToast?.(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} isLoading={loading} />
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl mb-8 flex items-center space-x-3">
          <i className="fa-solid fa-circle-exclamation text-xl"></i>
          <span>{error}</span>
        </div>
      )}
      
      {!loading && movies.length === 0 && !error && (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-primary-500 text-6xl mb-4">
            <i className="fa-regular fa-film"></i>
          </div>
          <h3 className="text-2xl font-bold text-primary-900 mb-2">No movies found</h3>
          <p className="text-primary-900/60">
            Try searching for something else or check back later
          </p>
        </div>
      )}
      
      {movies.length > 0 && (
        <>
          <div className="mb-4 text-primary-900/70 flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <i className="fa-solid fa-film"></i>
              <span>{totalResults} movies found</span>
            </span>
            {searchQuery && (
              <span className="text-sm">
                Showing {movies.length} of {totalResults}
              </span>
            )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} showToast={showToast} />
            ))}
          </div>
          
          {movies.length < totalResults && (
            <div className="mt-8 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="btn-primary px-8 py-3 text-lg inline-flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin"></i>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <span>Load More</span>
                    <i className="fa-solid fa-arrow-down"></i>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
      
      {loading && movies.length === 0 && <LoadingSpinner />}
    </div>
  );
};

MovieList.propTypes = {
  showToast: PropTypes.func,
};

export default MovieList;