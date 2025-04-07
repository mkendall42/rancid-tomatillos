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
  
  const updateVoteCount = (moviePosterId, delta) => {
    //Is there a quicker way to do this?  Would prefer to do a .find, update the key/value of that element, then just set the array
    //NOTE: optional - ensure that vount count cannot be negative
    const updatedMovies = movies.reduce((acc, movie) => {
      if (movie.id === moviePosterId) {
        movie.vote_count += delta
      }

      acc.push(movie)
      return acc
    }, [])

    setMovies(updatedMovies)
  }
  
  return (
    <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
        {selectedMovie && (<button onClick={homeClick}><img src={homeButton} alt="Home" /></button>
        )}
      </header>
      {!selectedMovie ? ( <MoviesContainer movies={movies} onMovieClick={movieClick} updateVoteCount={updateVoteCount} />) : (
        <MovieDetails
          posterPath={selectedMovie.backdrop_path}
          genreIds={selectedMovie.genres}
          overview={selectedMovie.overview}
          title={selectedMovie.title}
        />
      )}
    </main>
  )
}

export default App;
