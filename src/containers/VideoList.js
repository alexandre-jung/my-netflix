import React from 'react';

import VideoListItem from '../components/VideoListItem';

const VideoList = (props) => {

    let movies = props.movieList;

    const renderMovies = () => {
        return movies.map(movie => {
            return <VideoListItem
                movie={movie}
                key={movie.id}
                callback={props.callback} />
        });
    };

    return (
        <div className='movie_list_section'>
            <h3 className='mt-0'>Films recommandés</h3>
            <div className='movie_list'>
                <ul>
                    {renderMovies()}
                </ul>
            </div>
        </div>
    )
}

export default VideoList;
