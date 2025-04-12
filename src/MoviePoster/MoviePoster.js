import './MoviePoster.css';
import downvoteIcon from '../icons/downvote.png'
import upvoteIcon from '../icons/upvote.png'
import { Link } from 'react-router-dom'

function MoviePoster({ id, posterPath, voteCount, title, getMovieDetails, updateVoteCount }) {
  return (
    <div className='movie-poster'>
      <Link to={`/${id}`} className='details-button'><img src={posterPath} alt={`${title} poster`} /></Link>
      <h3>{title}</h3>
      <p>
        <button class='vote-button' id='up-vote' onClick = {() => updateVoteCount(id, 1)}><img class='movie-poster-button-icons' src={upvoteIcon} alt="up-arrow"></img></button>
        <div class='vote-count'>
          {voteCount}
        </div>
        <button class='vote-button' id='down-vote' onClick = {() => updateVoteCount(id, -1)}><img class='movie-poster-button-icons' src={downvoteIcon} alt="down-arrow"></img></button>
      </p>
    </div>
  );
}

export default MoviePoster;
