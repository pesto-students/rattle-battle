import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  scorecard: {
    margin: theme.spacing.unit,
    padding: theme.spacing.unit * 2,
    opacity: 0.65,
    color: 'white',
  },
});

const Scoreboard = ({ classes, players, playerId }) => {
  const scorecards = players.map(player => (
    <Paper className={classes.scorecard} key={player.id} style={{ backgroundColor: player.color }}>
      <p className="highlight">
        { player.id === playerId ? 'You' : 'Opponent' }
        <span className="color-swatch" />
      </p>
      <p>
        Username:
        {player.username}
      </p>
      <span>
        Life:
        {player.life}
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
  players: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  playerId: PropTypes.string.isRequired,
};

export default withStyles(styles)(Scoreboard);
