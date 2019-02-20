import React, { Component } from 'react';
import io from '../config/socketIO';

export default class Game extends Component {
  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.gameState = null;

    io.on('game state updated', this.setGameState);

    // TODO replace this with requestAnimationFrame to avoid layout thrashing
    setInterval(this.drawFrame, 16.66);
  }

  gameIsRunning = () => this.gameState && !this.gameState.ended;

  drawFrame = () => {
    if (this.gameIsRunning()) {
      // draw here
    }
  };

  setGameState = (gameState) => {
    this.gameState = gameState;
  };

  handleKeyDown = (event) => {
    if (this.gameIsRunning()) {
      // send key press event to server
    }
  };

  render() {
    return (
      <canvas
        /* eslint-disable no-return-assign */
        ref={canvas => (this.canvas = canvas)}
        width="1400"
        height="700"
        tabIndex="0"
        onKeyDown={this.handleKeyDown}
      />
    );
  }
}
