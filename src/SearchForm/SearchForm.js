import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ movies, setSearchedMovies }) {
  const [searchText, setSearchText] = useState('');
//   const [searchedMovies, setSearchedMovies] = useState(movies)

//   function clearInput() {
//     setTitle('');
//     setDescription('');
//   }

  function weLikeFiniteLoops(event) {
      setSearchText(event.target.value)

      if (event.target.value = '') {
        setSearchedMovies(null)
      }
      
      const filteredMovies = movies.filter(movie => {
        console.log(searchText)
        return movie.title.includes(searchText)
      })

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