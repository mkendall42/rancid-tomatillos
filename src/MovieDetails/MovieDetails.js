import './MovieDetails.css';

function MovieDetails({ movie }) {
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
