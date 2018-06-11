import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 8,
  }),
});

const Pagination = ({
  classes, disabled, forward, back,
}) => (
  <div>
    <Paper className={classes.root} elevation={4}>
      <Grid container spacing={16} alignItems="flex-end" direction="row" justify="space-between">
        <Grid item>
          <Button color="primary" variant="contained" disabled={disabled} onClick={back}>Previous</Button>
        </Grid>
        <Grid item>
          <Button color="primary" variant="contained" onClick={forward}>Next</Button>
        </Grid>
      </Grid>
    </Paper>
  </div>
);

Pagination.propTypes = {
  classes: PropTypes.shape().isRequired,
  back: PropTypes.func.isRequired,
  forward: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default withStyles(styles)(Pagination);
