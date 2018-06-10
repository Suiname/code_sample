import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const Searchbar = ({ onChange, onSubmit }) => (
  <div>
    <Grid container spacing={8} alignItems="flex-end">
      <Grid item>
        <Search />
      </Grid>
      <Grid item>
        <TextField
          id="input-with-icon-grid"
          label="Search Terms"
          onChange={onChange}
        />
      </Grid>
      <Grid item>
        <Button onClick={onSubmit}>
          Search
        </Button>
      </Grid>
    </Grid>
  </div>);

Searchbar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
