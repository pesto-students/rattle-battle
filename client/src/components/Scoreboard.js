import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  scorecard: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
  },
});

const Scoreboard = ({ classes, scores }) => {
  const scorecards = scores.map(score => (
    <Paper className={classes.scorecard} key={score.id}>
      <p>
        Username:
        {score.username}
      </p>
      <span>
        Life:
        {score.life}
      </span>
    </Paper>
  ));
  return (
    <div className={classes.scoreboard}>
      {scorecards}
    </div>
  );
};

Scoreboard.propTypes = {
  classes: PropTypes.shape().isRequired,
  scores: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default withStyles(styles)(Scoreboard);
