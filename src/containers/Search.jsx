/* global window, fetch */
import React, { Component } from 'react';
import Appbar from '../components/Appbar';
import Searchbar from '../components/Searchbar';
import Result from '../components/Result';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      token: '',
      error: null,
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    /* https://github.com/airbnb/javascript/issues/684 */
    let token = window.localStorage.getItem('khToken');
    if (!token) {
      const url = 'https://api.knowledgehound.com/authentication/api/';
      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      const body = 'username=candidate%40knowledgehound.com&password=KH1sGreat';
      fetch(url, {
        method: 'POST',
        headers,
        body,
      }).then(response => response.json())
        .then((json) => {
          window.localStorage.setItem('khToken', json.JWT);
          token = json.JWT;
        }).catch((error) => {
          this.setState({ error });
        });
    }
    !!token && this.setState({ token });
  }
  onChange(e) {
    e.preventDefault();
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
  }
  onSubmit(e) {
    e.preventDefault();
    const { searchTerm, token } = this.state;
    const url = `https://api.knowledgehound.com/search/?query=${searchTerm}&type=question&group_duplicates=question`;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const options = {
      method: 'GET',
      headers,
    };
    fetch(url, options)
      .then(response => response.json())
      .then(json => this.setState({ results: json.results }))
      .catch(error => this.setState({ error }));
  }
  render() {
    const { results, error } = this.state;
    const title = 'KH Code Challenge';
    return (
      <div>
        <Appbar title={title} />
        <div>
          <Searchbar onChange={this.onChange} onSubmit={this.onSubmit} />
        </div>
        <div>
          {results.map(result => <Result title={result.question} content={result.link} />)}
        </div>
        <div>
          {/* temp placeholder for error message */}
          {(error && error.message) || null }
        </div>
      </div>
    );
  }
}

export default Search;
