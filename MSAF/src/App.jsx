import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import Header from './components/Header';
import MovieList from './components/MovieList';
import FavoritesList from './components/FavoritesList';
import Toast from './components/Toast';

export const FavoritesContext = createContext();

function App() {
  const [favorites, setFavorites] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const savedFavorites = localStorage.getItem('filmflow_favorites');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
  }, []);

  // Save favorites to localStorage whenever change
  useEffect(() => {
    localStorage.setItem('filmflow_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie) => {
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
      showToast(`${movie.Title} added to favorites`, 'success');
    }
  };

  const removeFromFavorites = (movieId, movieTitle) => {
    setFavorites(favorites.filter(movie => movie.imdbID !== movieId));
    showToast(`${movieTitle} removed from favorites`, 'info');
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      <Router>
        <div className="min-h-screen flex flex-col bg-primary-50">
          <Header favoritesCount={favorites.length} />
          <main className="flex-1 container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<MovieList showToast={showToast} />} />
              <Route path="/favorites" element={<FavoritesList />} />
            </Routes>
          </main>
          <footer className="bg-white border-t border-primary-100 py-4 text-center text-primary-900 text-sm">
            <p>🎬 FilmFlow · Movie discovery · OMDB API</p>
          </footer>
          {toast.show && <Toast message={toast.message} type={toast.type} />}
        </div>
      </Router>
    </FavoritesContext.Provider>
  );
}

export default App;