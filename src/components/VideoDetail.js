import React from 'react';

const VideoDetail = (props) => {
    let movie = props.movie;
    return (
        <div>
            <div className='detail-header'>
                <h2>{movie.title}</h2>
                <h3 className='muted'>Sortie le {movie.release_date}</h3>
            </div>
            <p>{movie.overview}</p>
        </div>
    )
}

export default VideoDetail;
