import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Search } from './Search';
import './Searchbar.module.css';

export class Searchbar extends Component {
    state = {
        value: '',
    };
    handleChange = ({ target: { value } }) => {
        this.setState({ value });
    };
    handleSubmit = e => {
        e.preventDefault();
        if (!this.state.value.trim()) {
            toast.error('Please enter search text!');
        }
        this.props.onSearch(this.state.value);
        this.setState({ value: '' });
    };
    render() {
        return (
            <header>
                <form onSubmit={this.handleSubmit}>
                    <button type="submit">
                        <span>
                            <Search />
                        </span>
                    </button>
                    <input
                        type="search"
                        placeholder="Search..."
                        aria-label="Search"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        );
    }
}

Searchbar.propTypes = {
    onSearch: PropTypes.func.isRequired,
};