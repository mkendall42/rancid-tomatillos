import './App.css';
import searchIcon from '../icons/search.png';
// testing 123...
// Example imports (for later):
import { useState, useEffect } from 'react';
import moviePosters from '../data/movie_posters';
// import movieDetails from '../data/movie_details';
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import MoviePoster from '../MoviePoster/MoviePoster'

function App() {
  const [movies, setMovies] = useState(moviePosters);
  const allMoviePosters = moviePosters.map(movie => {
    return (
      <MoviePoster 
      id={movie.id} 
      key={movie.id}
      title={movie.title} 
      posterPath={movie.poster_path} 
      voteCount={movie.vote_count}/>
    );
  })

  console.log("movies: ", movies)

  // return (
  //   <main className='App'>
  //     <header>
  //       <h1>rancid tomatillos</h1>
  //     </header>
  //       {allMoviePosters}
  //   </main>
  // );
  return (
    <main className='App'>
      <header>
        <h1>rancid tomatillos</h1>
      </header>
        <MoviesContainer movies={movies} />
    </main>
  )
}

export default App;
