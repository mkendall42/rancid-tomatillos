import './MovieDetails.css';

function MovieDetails({posterPath, genreIds, overview, title}) {
  return (
    <section className='MovieDetails'>
      <img src={posterPath} alt={`${title} backdrop`}></img>
      <h2>{title}</h2>
      <p>Genres: {genreIds}</p>
      <article>
        <h3>Overview</h3>
        <p>{overview}</p>
      </article>
    </section>
  );
}

export default MovieDetails;
