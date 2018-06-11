import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import LinkIcon from '@material-ui/icons/Link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import blue from '@material-ui/core/colors/blue';

const styles = {
  list: {
    listStyleType: 'none',
  },
  link: {
    backgroundColor: blue[500],
  },
  expand: {
    marginLeft: 'auto',
    backgroundColor: blue[500],
  },
  header: {
    backgroundColor: blue[500],
    textAlign: 'center',
  },
};

const Result = ({
  classes, title, studyName, date, expanded, expandClick, ...content
}) => (
  <Card className={classes.card}>
    <CardHeader className={classes.header} title={title} subheader={`Date: ${date}`} />
    <CardContent>
      Study Name: {studyName}
    </CardContent>
    <CardActions>
      <IconButton className={classes.link}>
        <a href={content.link} target="_blank" rel="noopener noreferrer"><LinkIcon /></a>
      </IconButton>
      <Button onClick={expandClick} className={classes.expand} aria-expanded={expanded} aria-label="Show more">
        Match Details
        {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
      </Button>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <div>
          <span>Matches:</span>
          <ul>
            {content.explanation.map(explanation => explanation.matches.map(match =>
              (<p
                key={match}
                className={classes.list}
                dangerouslySetInnerHTML={{ __html: match }}
              />)))}
          </ul>
        </div>
      </CardContent>
    </Collapse>
  </Card>
);

Result.propTypes = {
  title: PropTypes.string.isRequired,
  studyName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  classes: PropTypes.shape().isRequired,
  expanded: PropTypes.bool.isRequired,
  expandClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(Result);
