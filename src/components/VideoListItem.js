import React from 'react';

const IMAGES_PATH = 'https://image.tmdb.org/t/p/w500';

const VideoListItem = (props) => {

    let movie = props.movie;

    return (
        <li className='video-list-item' onClick={() => props.callback(movie)}>
            <img src={`${IMAGES_PATH}${movie.poster_path}`} width='80' alt=''></img>
            <div className='video-list-item-aside'>
                <h4 className='video-list-item-title'>{movie.title}</h4>
                <div className='muted small video-list-item-rating'>Sortie : {movie.release_date}</div>
                <div className='muted video-list-item-rating'>Note : {movie.vote_average}</div>
            </div>
        </li>
    );
}

export default VideoListItem;
