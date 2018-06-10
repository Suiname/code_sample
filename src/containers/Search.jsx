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
            token: '',
            error: null,
        };
    }
    componentDidMount() {
        let token = window.localStorage.getItem('khToken');
        if (!token) {
            const url = 'https://private-anon-56685cd0e2-knowledgehound.apiary-mock.com/authentication/api/';
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            const body = "username=candidate@knowledgehound.com&password=KH1sGreat​";
            fetch(url, {
                method: 'POST',
                headers,
                body,
            }).then((response) => response.json())
            .then((json) => {
                window.localStorage.setItem('khToken', json.JWT);
                token = json.JWT;
            }).catch((error) => {
                console.log('error: ', error);
                this.setState({ error });
            })
        }
        !!token && this.setState({ token });
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