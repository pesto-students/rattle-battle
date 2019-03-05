import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import MaterialTable from './MaterialTable';
import { getTopPlayers } from '../utils/leaderboard-api';

const styles = theme => ({
  root: {
    width: '50%',
    minWidth: 200,
    margin: `${theme.spacing.unit * 2}px auto`,
    padding: theme.spacing.unit * 2,
  },
  title: {
    fontSize: theme.typography.h5.fontSize,
  },
});

class Leaderboard extends React.Component {
  state = {
    leaderboards: [],
  }

  componentDidMount() {
    getTopPlayers()
      .then(({ data: leaderboards }) => {
        this.setState({
          leaderboards,
        });
      });
  }

  render() {
    const { classes } = this.props;
    const { leaderboards } = this.state;
    if (leaderboards.length) {
      const leaderboardsRows = leaderboards.map(leader => (
        <TableRow key={leader.username}>
          <TableCell>{leader.username}</TableCell>
          <TableCell>{leader.score}</TableCell>
        </TableRow>
      ));
      const tableHeadings = ['Username', 'Score'];
      return (
        <Paper className={classes.root}>
          <Typography className={classes.title}>Leaderboards</Typography>
          <MaterialTable headings={tableHeadings} tableData={leaderboardsRows} />
        </Paper>
      );
    }
    return null;
  }
}

Leaderboard.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Leaderboard);
