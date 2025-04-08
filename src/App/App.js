import './App.css';
// import searchIcon from '../icons/search.png';
import homeButton from '../icons/home.png'
import { useState, useEffect } from 'react';
// import moviePosters from '../data/movie_posters';
// import movieDetailsData from '../data/movie_details';
import MovieDetails from '../MovieDetails/MovieDetails.js'
import MoviesContainer from '../MoviesContainer/MoviesContainer';


function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState('')
	
  useEffect(() => {
    getMovies();
  }, [])

  function movieClick(data) {
    setSelectedMovie(data);
  }
  
  function homeClick() {
    setSelectedMovie(false);
  }

  function getMovies() {
    fetch('https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies')
    .then(response => response.json())
    .then(data => setMovies([...movies, ...data]))
    .catch(error => {
      console.log(error)
      setError('Oops! Something went wrong! Please try again in a couple minutes.')
    })
  }

  function getMovieDetails(movie_id) {
    fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${movie_id}`)
    .then(response => response.json())
		.then(data => movieClick(data))
    .catch(error => {
      console.log(error)
      setError('Oops! Something went wrong! Please try again in a couple minutes.')
    })
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
      {!selectedMovie ? ( 
				<MoviesContainer 
					movies={movies} 
				  getMovieDetails={getMovieDetails}
					updateVoteCount={updateVoteCount} />
			) : (
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
