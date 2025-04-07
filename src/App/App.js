import './App.css';
import searchIcon from '../icons/search.png';
// testing 123...
// Example imports (for later):
import { useState, useEffect } from 'react';
import moviePosters from '../data/movie_posters';
// import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
// import MoviePoster from '../MoviePoster/MoviePoster'

function App() {
  const [movies, setMovies] = useState(moviePosters);

  return (
    <main className='App'>
      <header>
        <h1>Rancid Tomatillos</h1>
      </header>
        <MoviesContainer movies={movies} />
    </main>
  )
}

export default App;
