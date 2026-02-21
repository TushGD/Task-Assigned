import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Trigger search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = useCallback(() => {
    setQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-8 animate-slide-up">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies... (e.g., Inception, Marvel, Avatar)"
            className="w-full px-5 py-4 pl-14 pr-24 text-lg bg-white border-2 border-primary-100 rounded-2xl shadow-md focus:border-primary-500 focus:outline-none transition-all duration-200"
            disabled={isLoading}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-500">
            <i className="fa-solid fa-magnifying-glass text-xl"></i>
          </div>
          
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-2 text-gray-400 hover:text-primary-900 transition-colors"
                aria-label="Clear search"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            )}
            
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isLoading || !query.trim()
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-900 text-white shadow-md hover:shadow-lg'
              }`}
            >
              {isLoading ? (
                <i className="fa-solid fa-circle-notch fa-spin"></i>
              ) : (
                'Search'
              )}
            </button>
          </div>
        </div>
      </form>
      
      <div className="mt-2 text-sm text-primary-900/60 flex items-center justify-center space-x-4">
        <span className="flex items-center space-x-1">
          <i className="fa-solid fa-film text-xs"></i>
          <span>Movies only</span>
        </span>
        <span>•</span>
        <span>Press Enter to search</span>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

SearchBar.defaultProps = {
  isLoading: false,
};

export default SearchBar;