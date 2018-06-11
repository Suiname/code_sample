/* global window, fetch */
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Appbar from '../components/Appbar';
import Searchbar from '../components/Searchbar';
import Result from '../components/Result';
import Login from '../components/Login';
import Pagination from '../components/Pagination';

const performSearch = ({
  searchTerm, page, token, setState,
}) => {
  const url = `https://api.knowledgehound.com/search/?query=${searchTerm}&type=question&group_duplicates=question&page_size=12&page=${page}`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const options = {
    method: 'GET',
    headers,
  };
  !!searchTerm && fetch(url, options)
    .then(response => response.json())
    .then(json => setState({
      results: json.results,
      expanded: json.results.map(() => false),
      lastSearch: searchTerm,
      page,
    }))
    .catch(error => setState({ error }));
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      results: [],
      token: '',
      error: null,
      loggedIn: false,
      username: '',
      password: '',
      page: 1,
      lastSearch: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.expandClick = this.expandClick.bind(this);
    this.loginOnChange = this.loginOnChange.bind(this);
    this.loginSubmit = this.loginSubmit.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }
  componentDidMount() {
    /* eslint-disable react/no-did-mount-set-state */
    /* https://github.com/airbnb/javascript/issues/684 */
    const token = window.localStorage.getItem('khToken');
    if (token) {
      this.setState({
        loggedIn: true,
        token,
      });
    }
  }
  onChange(e) {
    e.preventDefault();
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
  }
  onSubmit(e) {
    e.preventDefault();
    const { searchTerm, token } = this.state;
    performSearch({
      searchTerm,
      page: 1,
      token,
      setState: this.setState.bind(this),
    });
  }
  loginOnChange(name) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [name]: e.target.value,
      });
    };
  }
  expandClick(i) {
    return (e) => {
      e.preventDefault();
      const { expanded } = this.state;
      expanded[i] = !expanded[i];
      this.setState({
        expanded,
      });
    };
  }
  loginSubmit() {
    const { username, password } = this.state;
    const url = 'https://api.knowledgehound.com/authentication/api/';
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const body = `username=${encodeURIComponent(username)}&password=${password}`;
    fetch(url, {
      method: 'POST',
      headers,
      body,
    }).then(response => response.json())
      .then((json) => {
        window.localStorage.setItem('khToken', json.JWT);
        const token = json.JWT;
        this.setState({ token, loggedIn: true });
      }).catch((error) => {
        this.setState({ error });
      });
  }
  nextPage(e) {
    e.preventDefault();
    const { lastSearch, token, page } = this.state;
    performSearch({
      searchTerm: lastSearch,
      page: page + 1,
      token,
      setState: this.setState.bind(this),
    });
  }
  prevPage(e) {
    e.preventDefault();
    const { lastSearch, token, page } = this.state;
    performSearch({
      searchTerm: lastSearch,
      page: page - 1,
      token,
      setState: this.setState.bind(this),
    });
  }
  render() {
    const {
      results, error, expanded, loggedIn, username, password, page,
    } = this.state;
    const title = 'KH Code Challenge';
    const loginProps = {
      username,
      password,
      handleChange: this.loginOnChange,
      onSubmit: this.loginSubmit,
    };
    const Main = (
      <React.Fragment>
        <div>
          <Searchbar onChange={this.onChange} onSubmit={this.onSubmit} />
        </div>
        <div>
          <Grid container spacing={16}>
            {results.length &&
            <Grid item xs={12} lg={12}>
              <Pagination disabled={page === 1} forward={this.nextPage} back={this.prevPage} />
            </Grid>}
            {results.map((result, i) => {
              const {
                link, type, study, id, question, duplicates, explanation,
              } = result;
              const content = {
                link, type, duplicates, explanation,
              };
              return (
                <Grid key={id} item xs={12} lg={4}>
                  <Result
                    title={question}
                    date={study.study_date}
                    studyName={study.name}
                    expandClick={this.expandClick(i)}
                    expanded={expanded[i]}
                    {...content}
                  />
                </Grid>);
            })}
          </Grid>
        </div>
        <div>
          {/* temp placeholder for error message */}
          {(error && error.message) || null }
        </div>
      </React.Fragment>
    );
    return (
      <div>
        <Appbar title={title} />
        {loggedIn ? Main : <Login {...loginProps} />}
      </div>
    );
  }
}

export default Search;
