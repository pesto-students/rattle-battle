import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import backgroundImage from '../../static/images/sand.jpg';
import GAME_CONSTANTS from './gameConstants';
import Scoreboard from '../Scoreboard';

const styles = () => ({
  playArea: {
    display: 'flex',
  },
  boardContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
    margin: 'auto',
  },
});

/* eslint-disable no-alert */
class GameBoardComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerId: null,
      players: [],
      redirectToHome: false,
    };

    this.leaveGame = this.leaveGame.bind(this);
  }

  componentDidMount() {
    const { redirectToHome } = this.state;

    if (redirectToHome) {
      return;
    }

    /* eslint-disable react/destructuring-assignment */
    const { playerInfo } = this.props.location;

    if (!playerInfo) {
      this.setState({
        redirectToHome: true,
      });
      return;
    }

    this.setState({
      playerId: playerInfo.playerId,
    });

    this.img = document.getElementById('backgroundImage');
    this.ctx = this.canvas.getContext('2d');
    this.socket = playerInfo.socket;

    this.socket.on('stepChange', game => this.stepChange(game));
    this.socket.on('lifeChange', players => this.setState({ players }));
    this.socket.on('gameResult', result => this.handleGameEnded(result));
  }

  componentWillUnmount() {
    this.socket.removeAllListeners('stepChange');
    this.socket.removeAllListeners('lifeChange');
    this.socket.removeAllListeners('gameResult');
  }

  handleGameEnded = ({ lostUserId }) => {
    const { playerId } = this.props.location.playerInfo;
    this.setState({ redirectToHome: true }, () => {
      if (lostUserId === playerId) {
        alert('You Lost, Now go home and cry in front of your mommy.');
      } else {
        alert('Your opponent lost, Now get a beer and Enjoy.');
      }
    });
  };

  handleKeyDown = (event) => {
    const { key } = event;
    // we only send the event if the event is right, left, top or bottom arrow
    if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(key)) {
      const { playerId } = this.state;
      this.socket.emit('keyPress', { player: playerId, key });
    }
  };

  drawSnake = (snake) => {
    const { ctx } = this;
    const { color, body } = snake;
    body.forEach((position) => {
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(position.x, position.y, GAME_CONSTANTS.ARC_RADIUS, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    });
  };

  clearCanvasForRedrawing = () => {
    this.ctx.drawImage(
      this.img,
      0,
      0,
      GAME_CONSTANTS.GAME_BOARD.WIDTH,
      GAME_CONSTANTS.GAME_BOARD.HEIGHT,
    );
  };

  loadBackgroundImage = () => (
    <img
      src={backgroundImage}
      id="backgroundImage"
      style={{ display: 'none' }}
      alt="backgroundImage"
    />
  );

  stepChange(game) {
    const snakes = game.snakeBodies;
    const { food } = game;
    const { ctx } = this;

    this.clearCanvasForRedrawing();

    // TODO: Implement something that snake moves like a real snake, crawling.
    ctx.beginPath();
    ctx.fillStyle = GAME_CONSTANTS.FOOD_COLOR;
    ctx.strokeStyle = GAME_CONSTANTS.FOOD_COLOR;
    ctx.arc(food.x, food.y, GAME_CONSTANTS.FOOD_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    snakes.forEach(this.drawSnake);
  }

  /**
   * Emits a event that current user has left the game.
   */
  leaveGame() {
    this.socket.emit('leaveGame');
  }

  render() {
    const { redirectToHome, playerId, players } = this.state;

    if (redirectToHome) {
      return <Redirect to={{ pathname: '/' }} />;
    }

    const { classes } = this.props;
    return (
      <div className={classes.playArea}>
        <div className={classes.boardContainer}>
          {this.loadBackgroundImage()}
          <canvas
            ref={canvas => (this.canvas = canvas)} // eslint-disable-line no-return-assign
            width={GAME_CONSTANTS.GAME_BOARD.WIDTH}
            height={GAME_CONSTANTS.GAME_BOARD.HEIGHT}
            tabIndex="0"
            onKeyDown={this.handleKeyDown}
          />
          <button type="button" onClick={this.leaveGame}>
            Leave this Game
          </button>
        </div>
        <Scoreboard players={players} playerId={playerId} />
      </div>
    );
  }
}

GameBoardComponent.propTypes = {
  classes: PropTypes.shape().isRequired,
  // eslint-disable-next-line react/require-default-props
  location: PropTypes.shape({
    playerInfo: PropTypes.shape({
      playerId: PropTypes.string,
      socket: PropTypes.object,
    }),
  }),
};

export default withStyles(styles)(GameBoardComponent);
