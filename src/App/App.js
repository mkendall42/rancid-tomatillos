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
        <h1>Rancid Tomatillos</h1>
      </header>
        <MoviesContainer movies={movies} updateVoteCount={updateVoteCount} />
    </main>
  )
}

export default App;
