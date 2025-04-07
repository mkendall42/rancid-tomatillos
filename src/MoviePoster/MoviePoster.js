import './MoviePoster.css';

function MoviePoster({id, title, posterPath, voteCount, updateVoteCount}) {
  return (
    //NOTE: later add <img> tag (large image files to load, so removed for now to prevent re-loading images each time page reload)
    <div className={`moviePoster`}>
      <h2>{title}</h2>
      <p>{voteCount}</p>
      <button onClick = {() => updateVoteCount(id, 1)}>Up</button>
      <button onClick = {() => updateVoteCount(id, -1)}>Down</button>
    </div>
  );
}

export default MoviePoster;