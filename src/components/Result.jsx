import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from '@material-ui/core/CardHeader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

const Result = ({ title, content }) => (
  <Card>
    <CardHeader>
      {title}
    </CardHeader>
    <CardContent>
      {content}
    </CardContent>
    <CardActions>
      <Button size="small">More</Button>
    </CardActions>
  </Card>
);

Result.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Result;
