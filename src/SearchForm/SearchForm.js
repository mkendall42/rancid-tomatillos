import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ movies, setSearchedMovies }) {
	const [searchText, setSearchText] = useState('');

  //This function creates a searchedMovies subset of movies (to not modify movies directly) based on present searchText value
  //to pass to MoviesContainer (Note: the function name is in refrerence to an infinite refresh loop we accidentally created earlier)
	function weLikeFiniteLoops(event) {
		let input = event.target.value
		setSearchText(input)

		if (event.target.value === '') {
			setSearchedMovies(movies);
		}

		const filteredMovies = movies.filter(movie =>
			movie.title.toLowerCase().includes(input.toLowerCase())
		);
		setSearchedMovies(filteredMovies)
	}

	return (
		<form>
			<input
				type='text'
				placeholder='Enter search term here'
				name='title'
				value={searchText}
				onChange={event => weLikeFiniteLoops(event)}
			/>
		</form>
	)
}

export default SearchForm
