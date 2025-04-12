import './App.css';
// import searchIcon from '../icons/search.png';
import homeButton from '../icons/home.png'
import { useState, useEffect } from 'react';
import MovieDetails from '../MovieDetails/MovieDetails.js'
import ErrorPage from '../ErrorPage/ErrorPage.js'
import MoviesContainer from '../MoviesContainer/MoviesContainer';
import SearchForm from '../SearchForm/SearchForm'
import { Routes, Route, NavLink } from 'react-router-dom'

function App() {
	const [movies, setMovies] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState(null);
	const [error, setError] = useState('')
	const [searchedMovies, setSearchedMovies] = useState(null)


	useEffect(() => {
		fetch('https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies')
			.then(response => response.json())
			.then(data => setMovies([...movies, ...data]))
			.catch(error => {
				console.log(error)
				setError('Oops! Something went wrong! Please try again in a couple minutes.')
			})
	}, [])

	const getMovieDetails = (movie_id) => {
		console.log("I'm here!")

		const data = fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${movie_id}`)
			.then(response => response.json())
			.then(data => { setSelectedMovie(data) })
			.catch(error => {
				console.log(error)
				setError('Oops! Something went wrong! Please try again in a couple minutes.')
			})

		return data
	}

	const updateVoteCount = (moviePosterId, delta) => {
		//Is there a quicker way to do this?  Would prefer to do a .find, update the key/value of that element, then just set the array
		//NOTE: optional - ensure that vount count cannot be negative
		// let old_vote_count = 0
		// const updatedMovies = movies.reduce((acc, movie) => {
		// 	if (movie.id === moviePosterId) {
		// 		old_vote_count = movie.vote_count
		// 		movie.vote_count += delta
		// 	}

		// 	acc.push(movie)
		// 	return acc
		// }, [])

    // findMovieIndex(id)

		// setMovies(updatedMovies)
		setMovies(updateMovies(moviePosterId, delta))

		//Update the API and ensure vote count changed correctly
		//NOTE: in order for vote count to persist between refresh, moviePosters must be fetched from API first (perhaps only at mount?)
		let direction = ""
		if (delta > 0) {
			direction = "up"
		} else if (delta < 0) {
			direction = "down"
		} else {
			console.log("Error: client: invalid vote change.")
		}

		const parameters = {
			method: "PATCH",
			body: JSON.stringify({ vote_direction: direction }),
			headers: { "Content-Type": "application/json" }
		}
    let old_vote_count = 1
		fetch(`https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/${moviePosterId}`, parameters)
			.then(response => response.json())
			.then(data => verifyVoteCountChange(data, findMovie(moviePosterId)))
			.catch(error => console.log(error))
	}

  function updateMovies(id, delta) {
    let old_vote_count = 0
    return movies.reduce((acc, movie) => {
      if (movie.id === id) {
        old_vote_count = movie.vote_count
        movie.vote_count += delta
      }

      acc.push(movie)
      return acc
    }, [])
  }

  function findMovie(id) {
    return movies.find(movie => {
      return movie.id === id
    })
  }

	function verifyVoteCountChange(data, changedMovie) { //old_count, new_count, delta) {
    // debugger
    if (data.vote_count !== changedMovie.vote_count) {
      console.log("Error: server/client: vote count did not update correctly relative to the old value.")
    }
	}

	return (
		<main className='App'>
			<header>
				<h1>rancid tomatillos</h1>
				<NavLink to="/" className={({ isActive }) => !isActive ? "home-button" : "hidden"}><img src={homeButton} alt="Home" /></NavLink>
				<SearchForm movies={movies} setSearchedMovies={setSearchedMovies} />
			</header>
			<Routes>
				<Route path="/" element={<MoviesContainer movies={movies} searchedMovies={searchedMovies} getMovieDetails={getMovieDetails} updateVoteCount={updateVoteCount} />} />
				<Route path='/:movie_id' element={<MovieDetails selectedMovie={selectedMovie} getMovieDetails={getMovieDetails} />} />
				<Route path="*" element={<ErrorPage error={error} />} />
			</Routes>
		</main>
	)
}

export default App;
