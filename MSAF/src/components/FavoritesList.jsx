import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../App';
import MovieCard from './MovieCard';

const FavoritesList = () => {
  const { favorites, removeFromFavorites } = useContext(FavoritesContext);
  const [showConfirm, setShowConfirm] = useState(null);

  const handleRemoveAll = () => {
    if (window.confirm('Are you sure you want to remove all favorites?')) {
      favorites.forEach(movie => {
        removeFromFavorites(movie.imdbID, movie.Title);
      });
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-primary-900 flex items-center space-x-3">
            <i className="fa-solid fa-heart text-red-500"></i>
            <span>Your Favorites</span>
          </h1>
          <p className="text-primary-900/60 mt-1">
            {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
          </p>
        </div>
        
        {favorites.length > 0 && (
          <button
            onClick={handleRemoveAll}
            className="px-4 py-2 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all duration-200 flex items-center space-x-2"
          >
            <i className="fa-solid fa-trash-can"></i>
            <span className="hidden sm:inline">Remove All</span>
          </button>
        )}
      </div>
      
      {favorites.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <div className="text-primary-500 text-7xl mb-4">
            <i className="fa-regular fa-heart"></i>
          </div>
          <h3 className="text-2xl font-bold text-primary-900 mb-2">No favorites yet</h3>
          <p className="text-primary-900/60 mb-6">
            Start adding movies to your favorites collection
          </p>
          <Link to="/" className="btn-primary inline-flex items-center space-x-2 px-6 py-3">
            <i className="fa-solid fa-search"></i>
            <span>Browse Movies</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <div key={movie.imdbID} className="relative group">
              <MovieCard movie={movie} />
              <button
                onClick={() => {
                  if (window.confirm(`Remove "${movie.Title}" from favorites?`)) {
                    removeFromFavorites(movie.imdbID, movie.Title);
                  }
                }}
                className="absolute top-2 right-2 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600 z-10"
                aria-label="Remove from favorites"
              >
                <i className="fa-solid fa-times"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;