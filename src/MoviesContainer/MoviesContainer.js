import './MoviesContainer.css';
import MoviePoster from '../MoviePoster/MoviePoster';

function Movies({ movies, updateVoteCount }) {
  const moviePoster = movies.map(movie => {
    return (
      <MoviePoster 
        id={movie.id} 
        key={movie.id}
        title={movie.title} 
        posterPath={movie.poster_path} 
        voteCount={movie.vote_count}
        updateVoteCount={updateVoteCount}
      />
    );
  })

  return (
    <div className='movie-container'>
      {moviePoster}
    </div>
  )
}
  
export default Movies;