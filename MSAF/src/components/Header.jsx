import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../assets/logo2.png'

const Header = ({ favoritesCount }) => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-10 bg-gradient-to-r from-primary-900 to-primary-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <i className="fa-solid fa-film h-[100px] w-[100px] group-hover:scale-110 transition-transform"><img src={logo}alt="" className='rounded-[50%]'/></i>
            <span className="text-2xl font-normal tracking-tight logo">FilmFinderPro</span>
          </Link>
          
          <nav className="flex items-center space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                location.pathname === '/'
                  ? 'bg-primary-50 text-primary-900'
                  : 'hover:bg-primary-900/50'
              }`}
            >
              <i className="fa-solid fa-search"></i>
              <span className="hidden sm:inline">Search</span>
            </Link>
            
            <Link
              to="/favorites"
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 relative ${
                location.pathname === '/favorites'
                  ? 'bg-primary-50 text-primary-900'
                  : 'hover:bg-primary-900/50'
              }`}
            >
              <i className="fa-solid fa-heart"></i>
              <span className="hidden sm:inline">Favorites</span>
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {favoritesCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  favoritesCount: PropTypes.number.isRequired,
};

export default Header;