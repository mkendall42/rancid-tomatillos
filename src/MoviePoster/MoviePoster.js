import './MoviePoster.css';

function MoviePoster({title, posterPath, voteCount}) {
  return (
    //NOTE: later add <img> tag (large image files to load, so removed for now to prevent re-loading images each time page reload)
    <div className={`moviePoster`}>
      <h2>{title}</h2>
      <p>{voteCount}</p>
    </div>
  );
}

export default MoviePoster;