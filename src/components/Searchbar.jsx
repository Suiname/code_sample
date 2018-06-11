import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Search from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import dogImage from '../assets/kh.jpg';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  dogImage: {
    borderRadius: '50%',
  },
};

const Searchbar = ({ classes, onChange, onSubmit }) => (
  <div className={classes.root} >
    <Grid container spacing={8} >
      <Grid item lg={4} />
      <Grid item lg={4}>
        <Grid container spacing={8} justify="center" alignItems="center">
          <Grid item>
            <img className={classes.dogImage} src={dogImage} alt="dogimage" />
          </Grid>
          <Grid item>
            <Search color="primary" />
            <TextField
              label="Search Terms"
              onChange={onChange}
            />
          </Grid>
          <Grid item>
            <Button color="primary" variant="contained" onClick={onSubmit}>
              Search
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item lg={4} />
    </Grid>
  </div>);

Searchbar.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Searchbar);
