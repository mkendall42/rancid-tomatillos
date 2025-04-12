import './MoviesContainer.css';
import MoviePoster from '../MoviePoster/MoviePoster';

function MoviesContainer({ movies, searchedMovies, getMovieDetails, updateVoteCount }) {
  const currentMovies = !searchedMovies ? movies : searchedMovies

  const moviePosters = currentMovies.map(movie => {
    return (
      <MoviePoster 
        id={movie.id} 
        key={movie.id}
        title={movie.title} 
        posterPath={movie.poster_path} 
        voteCount={movie.vote_count}
        updateVoteCount={updateVoteCount}
				getMovieDetails={() => getMovieDetails(movie.id)}
      />
    );
  });
  
  return (
    <section className='movie-container'>
        {moviePosters}
    </section>
  );
}
  
export default MoviesContainer;
