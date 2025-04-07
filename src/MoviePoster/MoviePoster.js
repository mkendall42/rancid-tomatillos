import './MoviePoster.css';

function MoviePoster({posterPath, voteCount, title, onClick}) {
  return (
    <div className='movie-poster' onClick={onClick}>
      <img src={posterPath} alt={`${title} poster`}></img>
      <h3>{title}</h3>
      <p>Votes: {voteCount}</p>
    </div>
  );
}

export default MoviePoster;
