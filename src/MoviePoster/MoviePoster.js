import './MoviePoster.css';
import downvoteIcon from '../icons/downvote.png'
import upvoteIcon from '../icons/upvote.png'

function MoviePoster({ id, posterPath, voteCount, title, onClick, updateVoteCount }) {
  return (
    <div className='movie-poster'>
      <button onClick={onClick}><img src={posterPath} alt={`${title} poster`}></img></button>
      <h3>{title}</h3>
      <p>
        <button class='vote-button' onClick = {() => updateVoteCount(id, 1)}><img class='movie-poster-button-icons' src={upvoteIcon} alt="up-arrow"></img></button>
        {voteCount}
        <button class='vote-button' onClick = {() => updateVoteCount(id, -1)}><img class='movie-poster-button-icons' src={downvoteIcon} alt="down-arrow"></img></button>
      </p>
    </div>
  );
}

export default MoviePoster;
