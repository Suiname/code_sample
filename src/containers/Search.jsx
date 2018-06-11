/* global window, fetch */
import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import Appbar from '../components/Appbar';
import Searchbar from '../components/Searchbar';
import Result from '../components/Result';
import Login from '../components/Login';
import Pagination from '../components/Pagination';

/**
 * Utilty to perform API search.  Makes REST GET call and then
 * updates the react state with the results on success or with
 * the error on failure.
 * @param {string} searchTerm the query string to send to the API
 * @param {number} page the value of the page for pagination
 * @param {string} token the JWT string to set as auth header
 * @param {string} setState the React setState function
 * @returns {void}
 */
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

/**
 * React Container for Search page
 *
 * @class Search
 * @extends {Component}
 */
class Search extends Component {
  /**
   * Creates an instance of Search Container. Initializes state,
   * binds all class methods passed to pure components to 'this'.
   * @param {*} props
   * @memberof Search
   */
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
    this.loginSubmit = this.loginSubmit.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  /**
   * Checks if JWT already exists in local storage.  If
   * so, sets the state to loggedIn and sets the token
   * to the JWT from local storage.
   *
   * @memberof Search
   */
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
  /**
   * Event handler for onClick event from the search button.
   * Uses the perform search utility to make the API call
   * and update the React state with the results or error.
   *
   * @param {*} e onClick event
   * @memberof Search
   */
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
  /**
   * Higher order function to create a function for updating state
   * returns function which updates state object with key that
   * corresponds to the parameter 'name' passed to it.  Used by all
   * Text input fields in the app.
   *
   * @param {string} name key of state object to update
   * @returns {function} an event handler for updating react state
   * @memberof Search
   */
  onChange(name) {
    return (e) => {
      e.preventDefault();
      this.setState({
        [name]: e.target.value,
      });
    };
  }
  /**
   * HOF to create event handler that keeps track of the toggle
   * state for each search result.  Uses the page index and toggles
   * the value of the expanded array at that index.  This is called
   * when a user clicks on the 'Match Details v' button.
   *
   * @param {*} i index of the result
   * @returns {function} Event handler to set toggle state
   * @memberof Search
   */
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
  /**
   * Event handler for logging in.  Performs POST to API endpoint
   * and sets the token value and loggedIn value in state on success.
   * Sets the error value to the error on failure.  This is dispatched
   * when a user hits the 'login' button.
   *
   * @param {event} e event being handled when hitting 'login' button
   * @memberof Search
   */
  loginSubmit(e) {
    e.preventDefault();
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
  /**
   * Method for paging forward through search results.
   * Dispatched when user clicks 'next' button.
   *
   * @param {event} e event from 'next' button
   * @memberof Search
   */
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
  /**
   * Method for paging backward through search results.
   * Dispatched when user clicks 'previous' button.
   *
   * @param {event} e event from 'previous' button
   * @memberof Search
   */
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
  /**
   * Container's render method.
   *
   * @returns {object} React component
   * @memberof Search
   */
  render() {
    const {
      results, error, expanded, loggedIn, username, password, page,
    } = this.state;
    const title = 'KH Code Challenge';
    const loginProps = {
      username,
      password,
      handleChange: this.onChange,
      onSubmit: this.loginSubmit,
    };
    const Main = (
      <React.Fragment>
        <div>
          <Searchbar onChange={this.onChange('searchTerm')} onSubmit={this.onSubmit} />
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
