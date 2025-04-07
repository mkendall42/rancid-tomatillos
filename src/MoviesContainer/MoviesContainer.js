import './MoviesContainer.css';
import MoviePoster from '../MoviePoster/MoviePoster';

function MoviesContainer({ movies, onMovieClick, updateVoteCount }) {
  const moviePosters = movies.map(movie => {
    return (
      <MoviePoster 
        id={movie.id} 
        key={movie.id}
        title={movie.title} 
        posterPath={movie.poster_path} 
        voteCount={movie.vote_count}
        onClick={() => onMovieClick(movie.id)}
        updateVoteCount={updateVoteCount}
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
