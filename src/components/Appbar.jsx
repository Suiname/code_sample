import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import khIcon from '../assets/kh-dog.svg';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

/**
 * Pure Component to render the Appbar at the top.
 *
 * @param {object} classes classes created by withStyles helper
 * @param {string} title title to display in appbar
 */
const ButtonAppBar = ({ classes, title }) => (
  <div className={classes.root}>
    <AppBar position="static">
      <Toolbar>
        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
          <img src={khIcon} alt="khIcon" />
        </IconButton>
        <Typography variant="title" color="inherit" className={classes.flex}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  </div>
);

ButtonAppBar.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.any,
    flex: PropTypes.any,
    menuButton: PropTypes.any,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
