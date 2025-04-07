import './MoviePoster.css';
import downvoteIcon from '../icons/downvote.png'
import upvoteIcon from '../icons/upvote.png'

function MoviePoster({id, title, posterPath, voteCount, updateVoteCount}) {
  return (
    //NOTE: later add <img> tag (large image files to load, so removed for now to prevent re-loading images each time page reload)
    <div class={`movie-poster`}>
      <h2>{title}</h2>
      <p>
        <button onClick = {() => updateVoteCount(id, 1)}><img class='movie-poster-button-icons' src={upvoteIcon} alt="up-arrow"></img></button>
        {voteCount}
        <button onClick = {() => updateVoteCount(id, -1)}><img class='movie-poster-button-icons' src={downvoteIcon} alt="down-arrow"></img></button>
      </p>
    </div>
  );
}

export default MoviePoster;