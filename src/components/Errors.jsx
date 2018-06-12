import React from 'react';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  snackBar: {
    color: theme.palette.error[500],
  },
});

const Errors = ({ classes, error, clearError }) => (<Snackbar
  anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  open={!!error}
  onClose={clearError}
  SnackbarContentProps={{
            'aria-describedby': 'message-id',
          }}
  message={<span id="message-id" className={classes.snackBar}>{error ? error.message : ''}</span>}
/>);

Errors.propTypes = {
  classes: PropTypes.shape().isRequired,
  error: PropTypes.shape(),
  clearError: PropTypes.func.isRequired,
};

Errors.defaultProps = {
  error: null,
};

export default withStyles(styles)(Errors);
