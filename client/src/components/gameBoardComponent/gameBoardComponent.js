import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import backgroundImage from '../../static/images/sand.jpg';
import './gameBoardComponent.css';
import GAME_CONSTANTS from './gameConstants';

export default class GameBoardComponent extends Component {
  constructor(props) {
    super(props);
    const { playerInfo } = props.location;
    if (playerInfo) {
      const { playerId, socket } = playerInfo;
      this.state = {
        playerId,
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
    }
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
    this.socket.emit('leaveGame', 'nothing');
  }

  render() {
    if (this.redirectToHome) {
      // if user comes directly to game board url, without request a game play,--
      // -- will redirect to home page, where he/she/they can request to a new game play
      return <Redirect to={{ pathname: '/' }} />;
    }
    return (
      <div className="Board-container">
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
    );
  }
}

GameBoardComponent.propTypes = {
  // eslint-disable-next-line react/require-default-props
  location: {
    playerInfo: PropTypes.shape({
      playerId: PropTypes.string,
      socket: PropTypes.object,
    }),
  },
};
