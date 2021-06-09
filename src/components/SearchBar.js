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
    }

    handleClick = () => {
        this.props.onConfirm(this.state.inputValue);
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.props.onConfirm(this.state.inputValue);
        }
    }

    render() {
        return (
            <div className='container'>
                <input type='text'
                    className='search-bar'
                    name='searchInput'
                    placeholder={this.state.placeholder}
                    onChange={this.handleChange.bind(this)}
                    onKeyPress={this.handleKeyDown}
                    value={this.state.inputValue}>
                </input>
                <button className='search-bar_submit'
                    onClick={this.handleClick}>Go</button>
            </div>
        )
    }
}
