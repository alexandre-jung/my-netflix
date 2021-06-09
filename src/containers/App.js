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

const SEARCH_MOVIE_URL = 'search/movie';

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

    handleSearchConfirm = (value) => {
        console.log('searched value', value);
        this.searchMovie(value);
    }

    searchMovie(title) {
        axios.get(`${API_END_POINT}${SEARCH_MOVIE_URL}?${API_KEY}&page=1&include_adult=false&language=fr&query=${title}`).then(function (res) {
            if (res.data.results.length) {
                // Show the first result in the main section
                let movie = res.data.results[0];
                let current = this.state.currentMovie;
                if (movie.id !== current.id) {
                    this.setState({ currentMovie: res.data.results[0] }, () => {
                        this.applyVideoToCurrentMovie();
                    });
                }

                // Show all results, sorted by popularity
                let movies = res.data.results;
                movies.sort((a, b) => (a.popularity < b.popularity));
                this.setState({ movieList: movies });
            }
        }.bind(this));
    }

    render() {
        return (
            <div className="App">
                <header>
                    <h1>My Netflix</h1>
                    <div>
                        <SearchBar onConfirm={this.handleSearchConfirm} />
                        <a href='#' onClick={this.initMovies.bind(this)}>Afficher des recommandations</a>
                    </div>
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
