import './MovieDetails.css';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function MovieDetails({ getMovieDetails, selectedMovie }) {
  const { movie_id } = useParams();

  useEffect(() => {
    getMovieDetails(movie_id)
  }, []);

	if (!selectedMovie) {
    return <p>Loading Page...</p>;
  }
  const movie = selectedMovie;

  return (
    <section className='MovieDetails'>
      <img className='backdrop' src={movie.backdrop_path} alt={`${movie.title} backdrop`} />
      <div className="details-card">
        <h2>{movie.title}</h2>
        <div className="genres">
          {(movie.genre_ids || []).map((genre) => (
            <div className="genre-tag">{genre}</div>
          ))}
        </div>
        <article>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
        </article>
      </div>
    </section>
  );
}

export default MovieDetails;
