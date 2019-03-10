import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Leaderboard from './Leaderboard';
import LoaderComponent from './common/loaderComponent/loaderComponent';

import socket from '../api/socketService';
import LoginPrompt from './LoginPrompt';

/* eslint-disable react/prop-types */
const ButtonComponent = ({ children, ...otherProps }) => (
  <Button variant="contained" color="primary" size="large" {...otherProps}>
    {children}
  </Button>
);

const styles = theme => ({
  button: { margin: theme.spacing.unit },
  rightIcon: { marginLeft: theme.spacing.unit },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      loaderMessage: 'waiting for another player to join..',
      shouldRedirectToGame: false,
    };
    this.playGame = this.playGame.bind(this);
    this.redirectToGame = this.redirectToGame.bind(this);
    this.getCurrentView = this.getCurrentView.bind(this);
  }

  componentDidMount() {
    socket.emit('connection', () => {
      // eslint-disable-next-line no-console
      console.log('Socket connection is set with back-end server.');
    });

    socket.on('getReady', (data) => {
      // eslint-disable-next-line no-console
      console.log(data);
      const { snakeBodies } = data;
      snakeBodies.forEach(ata => console.log(ata));
      this.setState({ snakeBodies });
      const loaderMessage = 'Wooh! Found a player, get ready. you have 3 seconds...';
      this.setState({ loaderMessage });
      setTimeout(() => this.setState({ shouldRedirectToGame: true }), 2500);
    });
  }

  getCurrentView() {
    const { classes } = this.props;
    const { isLoading, loaderMessage, showLoginPrompt } = this.state;
    if (isLoading) {
      return <LoaderComponent width="200" height="200" message={loaderMessage} />;
    }
    return (
      <div>
        <Grid container direction="row" justify="center" alignItems="center">
          <ButtonComponent className={classes.button} onClick={this.playGame}>
            Play
            <Icon className={classes.rightIcon}>send</Icon>
          </ButtonComponent>
          <ButtonComponent className={classes.button}>Find a Friend</ButtonComponent>
        </Grid>
        <Leaderboard limit={5} />
        <LoginPrompt
          show={showLoginPrompt}
          close={() => this.setState({ showLoginPrompt: false })}
        />
      </div>
    );
  }

  playGame() {
    const { user } = this.props;
    if (!user) {
      this.setState({
        showLoginPrompt: true,
      });
      return;
    }

    const { id, username } = user;

    this.setState({ isLoading: true });
    socket.emit('joinGame', { id, username });
    socket.on('assignPlayerId', (playerId) => {
      // eslint-disable-next-line no-console
      console.log('playerId assigned: ', playerId);
      this.setState({ playerId });
    });
  }

  redirectToGame() {
    const { playerId, snakeBodies } = this.state;
    return <Redirect to={{ pathname: '/game', playerInfo: { playerId, snakeBodies, socket } }} />;
  }

  render() {
    const { shouldRedirectToGame } = this.state;
    if (shouldRedirectToGame) {
      return this.redirectToGame();
    }
    return this.getCurrentView();
  }
}

Home.propTypes = {
  // eslint-disable-next-line react/require-default-props
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }),
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired,
    rightIcon: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Home);
