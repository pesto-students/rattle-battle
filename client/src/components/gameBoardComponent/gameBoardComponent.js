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

class GameBoardComponent extends Component {
  constructor(props) {
    super(props);
    const { playerInfo } = props.location;
    if (playerInfo) {
      const { playerId, socket } = playerInfo;
      this.state = {
        playerId,
        scores: [],
      };
      this.leaveGame = this.leaveGame.bind(this);
      this.socket = socket;
    } else {
      this.redirectToHome = true;
    }
  }

  componentDidMount() {
    if (!this.redirectToHome) {
      this.img = document.getElementById('backgroundImage');
      this.ctx = this.canvas.getContext('2d');
      this.socket.on('stepChange', (game) => {
        this.stepChange(game);
      });
      this.socket.on('lifeChange', scores => this.setState({ scores }));
      this.socket.on('gameResult', ({ lostUserId }) => {
        const { playerId } = this.state;
        if (lostUserId === playerId) {
          alert('You Lost, Now go home and cry in front of your mommy.');
        } else {
          alert('Your opponent lost, Now get a beer and Enjoy.');
        }
      });
    }
    window.addEventListener('beforeunload', this.leaveGame);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.leaveGame);
  }

  handleKeyDown = (event) => {
    const { key } = event;
    // we only send the event if the event is right, left, top or bottom arrow
    if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(key)) {
      const { playerId } = this.state;
      this.socket.emit('keyPress', { player: playerId, key });
    }
  };

  stepChange(game) {
    const snakes = game.snakeBodies;
    const { food } = game;
    const { ctx } = this;
    this.ctx.drawImage(this.img, 0, 0,
      GAME_CONSTANTS.GAME_BOARD.WIDTH, GAME_CONSTANTS.GAME_BOARD.HEIGHT);
    // TODO: Implement something that snake moves like a real snake, crawling.
    ctx.beginPath();
    ctx.fillStyle = GAME_CONSTANTS.FOOD_COLOR;
    ctx.strokeStyle = GAME_CONSTANTS.FOOD_COLOR;
    ctx.arc(food.x, food.y, GAME_CONSTANTS.FOOD_RADIUS, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    snakes.forEach((snake) => {
      const { color, body } = snake;
      body.forEach((position) => {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(position.x, position.y, GAME_CONSTANTS.ARC_RADIUS, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
      });
    });
  }

  /**
   * Emits a event that current user has left the game.
   */
  leaveGame() {
    const { playerId } = this.state;
    this.socket.emit('leaveGame', playerId);
  }

  render() {
    if (this.redirectToHome) {
      // if user comes directly to game board url, without request a game play,--
      // -- will redirect to home page, where he/she/they can request to a new game play
      return <Redirect to={{ pathname: '/' }} />;
    }
    const { scores } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.playArea}>
        <div className={classes.boardContainer}>
          <img src={backgroundImage} id="backgroundImage" style={{ display: 'none' }} alt="backgroundImage" />
          <canvas
            ref={(canvas) => { this.canvas = canvas; }}
            width={GAME_CONSTANTS.GAME_BOARD.WIDTH}
            height={GAME_CONSTANTS.GAME_BOARD.HEIGHT}
            tabIndex="0"
            onKeyDown={this.handleKeyDown}
          />
          <button type="button" onClick={this.leaveGame}>Leave this Game</button>
        </div>
        <Scoreboard scores={scores} />
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
