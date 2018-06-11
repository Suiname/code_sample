import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  loginContainer: {
    display: 'flex',
    margin: '0 auto',
    height: 250,
    width: 350,
    marginTop: '15%',
    border: `2px solid ${theme.palette.primary[500]}`,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  button: {
    marginTop: 20,
  },
  formControl: {
    width: 200,
    height: 250,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

const loginForm = ({
  classes, username, password, handleChange, onSubmit,
}) => (
  <div className={classes.loginContainer}>
    <FormControl className={classes.formControl}>
      <TextField
        id="username"
        label="username"
        className={classes.textField}
        value={username}
        onChange={handleChange('username')}
        margin="normal"
      />
      <TextField
        id="password"
        label="password"
        className={classes.textField}
        type="password"
        value={password}
        onChange={handleChange('password')}
        margin="normal"
      />
      <Button color="primary" variant="contained" className={classes.button} onClick={onSubmit}>
        Log In
      </Button>
    </FormControl>
  </div>
);

loginForm.propTypes = {
  classes: PropTypes.shape().isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(loginForm);
