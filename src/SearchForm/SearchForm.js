import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ movies, setSearchedMovies }) {
	const [searchText, setSearchText] = useState('');

	function weLikeFiniteLoops(event) {
		let input = event.target.value
		setSearchText(input)

		if (event.target.value === '') {
			setSearchedMovies(movies);
			return;
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
				placeholder='Enter your search term here'
				name='title'
				value={searchText}
				onChange={event => weLikeFiniteLoops(event)}
			/>
		</form>
	)
}

export default SearchForm
