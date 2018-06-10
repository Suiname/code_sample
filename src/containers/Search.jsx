import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Appbar from '../components/Appbar';
import Searchbar from '../components/Searchbar';
import Result from '../components/Result';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
        };
    }
    render() {
        const { results } = this.state;
        const title = 'KH Code Challenge';
        return (
            <div>
                <Appbar title={title} />
                <div>
                    <Searchbar />
                </div>
                <div>
                    {results.map(result => <Result title={result.title} content={result.content} />)}
                </div>
            </div>
        );
    }
}

Search.propTypes = {
    title: PropTypes.string,
};

export default Search;