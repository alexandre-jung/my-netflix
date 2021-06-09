import axios from 'axios';
import React, { Component } from 'react';
import '../App.css';
import SearchBar from '../components/SearchBar';
import Video from '../components/Video';
import VideoDetail from '../components/VideoDetail';
import VideoList from '../containers/VideoList';

const API_KEY = 'api_key=b1bb009f89a909c0ae0b65bc17104e0e';
const API_END_POINT = 'https://api.themoviedb.org/3/';
const POPULAR_MOVIES_URL = 'discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images'
// const IMAGES_PATH = 'https://image.tmdb.org/t/p/w500';

const YOUTUBE_URL = 'https://www.youtube.com/watch?v=';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieList: [],
            currentMovie: {}
        };
    }

    componentWillMount() {
        this.initMovies();
    }

    initMovies() {

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }

        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function (res) {
            this.setState({
                movieList: res.data.results,
                currentMovie: res.data.results[getRandomInt(19)]
                // currentMovie: res.data.results[15]
            }, function () {
                this.applyVideoToCurrentMovie();
            });
        }.bind(this));
    }

    applyVideoToCurrentMovie() {
        axios.get(`${API_END_POINT}/movie/${this.state.currentMovie.id}/videos?${API_KEY}`).then(function (res) {

            if (res.data.results.length) {
                let currentMovie = this.state.currentMovie;
                let youtubeVideoKey = res.data.results[0].key;
                currentMovie.youtubeVideoKey = youtubeVideoKey;
                currentMovie.youtubeVideoUrl = YOUTUBE_URL + youtubeVideoKey;
                this.setState({ currentMovie: currentMovie });
            }
        }.bind(this));
    }

    setCurrentMovie = (movie) => {
        this.setState({ currentMovie: movie }, () => {
            this.applyVideoToCurrentMovie();
        });
    }

    render() {
        return (
            <div className="App">
                <header>
                    <h1>My Netflix</h1>
                    <SearchBar />
                </header>
                <div className='container'>
                    <aside>
                        <Video video={this.state.currentMovie} />
                        <VideoDetail movie={this.state.currentMovie} />
                    </aside>
                    <VideoList movieList={this.state.movieList}
                        callback={this.setCurrentMovie} />
                </div>
            </div>
        );
    }
}

export default App;
