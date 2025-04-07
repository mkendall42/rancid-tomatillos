import './MoviePoster.css';

function MoviePoster({posterPath, voteCount}) {
  return (
    <div className={`moviePoster`}>
      <img src={posterPath} alt="image"></img>
      <p>{voteCount}</p>
    </div>
  );
}

export default MoviePoster;