import './App.css';
// import searchIcon from '../icons/search.png';
import homeButton from '../icons/home.png'
import { useState, useEffect } from 'react';
import moviePosters from '../data/movie_posters';
import movieDetailsData from '../data/movie_details';
import MovieDetails from '../MovieDetails/MovieDetails.js'
import MoviesContainer from '../MoviesContainer/MoviesContainer';

function App() {
  const [movies, setMovies] = useState(moviePosters);
  const [selectedMovie, setSelectedMovie] = useState(false);
  
  function movieClick() {
    setSelectedMovie(movieDetailsData);
  }
  
  function homeClick() {
    setSelectedMovie(false);
  }
  
  return (
    <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
        {selectedMovie && (<button onClick={homeClick}><img src={homeButton} alt="Home" /></button>
        )}
      </header>
      {!selectedMovie ? ( <MoviesContainer movies={movies} onMovieClick={movieClick} />) : (
        <MovieDetails
          posterPath={selectedMovie.backdrop_path}
          genreIds={selectedMovie.genres}
          overview={selectedMovie.overview}
          title={selectedMovie.title}
        />
      )}
    </main>
  );
}

export default App;
