import './MoviesContainer.css';
import MoviePoster from '../MoviePoster/MoviePoster';

function Movies({ movies }) {

  // debugger

  // const movieTitles = movies.map(movie => {
  //   // debugger;


  // })
  const moviePoster = movies.map(movie => {
    // debugger;

    return (
      <MoviePoster 
      id={movie.id} 
      key={movie.id}
      title={movie.title} 
      posterPath={movie.poster_path} 
      voteCount={movie.vote_count}/>
      // <MoviePoster movie={movie}/>
    );
    
  })

  return (
    <div className='movie-container'>
      {moviePoster}
    </div>
  )

}
  
export default Movies;