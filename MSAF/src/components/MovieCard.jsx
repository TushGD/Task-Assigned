import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FavoritesContext } from '../App';

const MovieCard = ({ movie, showToast }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID);
  
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorite) {
      removeFromFavorites(movie.imdbID, movie.Title);
    } else {
      addToFavorites(movie);
    }
    
    if (showToast) {
      showToast(
        isFavorite ? 'Removed from favorites' : 'Added to favorites',
        isFavorite ? 'info' : 'success'
      );
    }
  };
  
  const posterUrl = !imageError && movie.Poster && movie.Poster !== 'N/A'
    ? movie.Poster
    : 'https://via.placeholder.com/300x450?text=No+Poster';
  
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-primary-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-t from-primary-900 via-primary-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-2xl`}></div>
      
      {/* Poster container */}
      <div className="relative aspect-[2/3] overflow-hidden bg-primary-50">
        <img
          src={posterUrl}
          alt={`${movie.Title} poster`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary-500/20 to-transparent"></div>
        
        {/* Year badge - moved to bottom left with new style */}
        <div className="absolute bottom-3 left-3 bg-primary-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-20 backdrop-blur-sm bg-opacity-90 border border-primary-500/30">
          <i className="fa-regular fa-calendar mr-1.5 text-primary-300"></i>
          {movie.Year}
        </div>
        
        {/* Rating badge (simulated) - new element */}
        <div className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg z-20 flex items-center space-x-1">
          <i className="fa-solid fa-star text-[10px]"></i>
          <span>{(Math.random() * 2 + 7).toFixed(1)}</span>
        </div>
        
        {/* Favorite button - redesigned */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 transform z-20 ${
            isFavorite
              ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg scale-110 hover:scale-125 rotate-12'
              : 'bg-white/90 backdrop-blur-md text-primary-900 shadow-md hover:shadow-xl hover:scale-110 hover:rotate-6 hover:bg-gradient-to-br hover:from-primary-500 hover:to-primary-900 hover:text-white'
          } ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 sm:opacity-0 group-hover:opacity-100 group-hover:translate-y-0'}`}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <i className={`fa-solid fa-heart text-lg ${isFavorite ? 'animate-pulse' : ''}`}></i>
        </button>
        
        {/* Movie type indicator - redesigned with pill shape */}
        <div className="absolute bottom-3 right-3 bg-primary-500/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full flex items-center space-x-1.5 shadow-lg z-20 border border-white/20">
          <i className="fa-solid fa-clapperboard text-[10px]"></i>
          <span className="capitalize">{movie.Type || 'Movie'}</span>
        </div>
        
        {/* Quick view button - new element on hover */}
        <div className={`absolute inset-x-0 bottom-16 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20`}>
          <a
            href={`https://www.imdb.com/title/${movie.imdbID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-primary-900 px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center space-x-2"
            onClick={(e) => e.stopPropagation()}
          >
            <i className="fa-brands fa-imdb"></i>
            <span>View on IMDb</span>
            <i className="fa-solid fa-arrow-right text-xs"></i>
          </a>
        </div>
      </div>
      
      {/* Content section - redesigned */}
      <div className="p-5 bg-white relative z-10">
        <h3 className="font-bold text-primary-900 text-lg mb-2 line-clamp-1 group-hover:text-primary-500 transition-colors duration-300" title={movie.Title}>
          {movie.Title}
        </h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-primary-900/60">
              <i className="fa-regular fa-clock mr-1"></i>
              {movie.Year}
            </span>
            <span className="w-1 h-1 bg-primary-300 rounded-full"></span>
            <span className="text-primary-900/60 capitalize">{movie.Type || 'Movie'}</span>
          </div>
          
          {/* Small favorite indicator */}
          {isFavorite && (
            <div className="text-red-500 text-sm" title="In your favorites">
              <i className="fa-solid fa-heart"></i>
            </div>
          )}
        </div>
        
        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-primary-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Poster: PropTypes.string,
    Type: PropTypes.string,
  }).isRequired,
  showToast: PropTypes.func,
};

export default MovieCard;