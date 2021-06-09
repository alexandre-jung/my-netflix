import React from 'react';

const Video = (props) => {

    return (
        <div>
            {
                props.video.youtubeVideoKey ?
                    <iframe width="700" height="394" src={`https://www.youtube.com/embed/${props.video.youtubeVideoKey}`} title="YouTube video player" frameBorder="0" />
                    : <img src={`https://image.tmdb.org/t/p/w780${props.video.backdrop_path}`} width='700' height='394' alt={props.video.title} />
            }
        </div>
    );
}

export default Video;
