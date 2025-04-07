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

    // debugger

    //Find the relevant poster, then update the vote_count by delta
    const currentMovie = movies.find((movie) => {
      return movie.id === moviePosterId
    })

    currentMovie.vote_count += delta        //Is this a reference or a copy?  This will affect the outcome significantly...

    console.log("votes: ", currentMovie.vote_count)

    setMovies(movies)
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
