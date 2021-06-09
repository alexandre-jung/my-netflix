import React, { Component } from 'react';

export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            placeholder: 'Cherchez un film',
            inputValue: '',
        };
    }

    handleChange(event) {
        this.setState({ inputValue: event.target.value });
        console.log(this.state.inputValue);
    }

    render() {
        return (
            <div className='container'>
                <input type='text'
                    className='search-bar'
                    name='searchInput'
                    placeholder={this.state.placeholder}
                    onChange={this.handleChange.bind(this)}
                    value={this.state.inputValue}>
                </input>
                <button className='search-bar_submit'>Send</button>
            </div>
        )
    }
}
