import './MovieDetails.css';
import ErrorPage from '../ErrorPage/ErrorPage'
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

  if (!movie.backdrop_path) {
    return <ErrorPage />
  }

	return (
		<section className='MovieDetails'>
			<img className='backdrop' src={movie.backdrop_path} alt={`${movie.title} backdrop`} />

			<div className="details-card">
				<h2 className="movie-title">{movie.title}</h2>

				<div className="genres">
					{(movie.genre_ids || []).map((genre, index) => (
						<span key={index} className="genre-tag">{genre}</span>
					))}
				</div>

				<p className="overview">{movie.overview}</p>
			</div>
		</section>
	);
}

export default MovieDetails;
