import React, { Component } from 'react';
import io from '../config/socketIO';
import grass from '../grass.jpg';

export default class Game extends Component {
  componentDidMount() {
    this.img = document.getElementById('grass');
    this.ctx = this.canvas.getContext('2d');
    this.gameState = null;
    const socket = io.connect('http://localhost:4000');
    this.socket = socket;
    socket.emit('connection', (what) => {
      console.log(what);
    });

    socket.emit('send_direction', 'nothing');

    socket.on('stepChange', this.stepChange.bind(this));
    // TODO replace this with requestAnimationFrame to avoid layout thrashin
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
    const keyNumber = event.keyCode;
    const { key } = event;
    if ([37, 38, 39, 40].find(number => number === keyNumber)) {
      this.socket.emit('keyPress', { player: 1, key });
    }
    if (this.gameIsRunning()) {
      // send key press event to server
    }
  };

  stepChange(game) {
    console.log('game', game);
    const coordinates = game.snakeBodies;
    const { food } = game;
    const { ctx } = this;
    this.ctx.drawImage(this.img, 0, 0, 1400, 700);
    // const tildValue = 5;
    // const reverse = false; // TODO: Implement something that snake moves like a real snake, crawling.
    // draw food 
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'yellow';
    // food radius 6
    ctx.arc(food.x, food.y, 6, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    coordinates.forEach((position) => {
      ctx.beginPath();
      ctx.fillStyle = 'black';// now anthing that will be drown on the canvas will be of this color.
      ctx.arc(position.x, position.y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.closePath();
    });
  }

  render() {
    return (
      <React.Fragment>
        <img src={grass} id="grass" style={{ display: 'none' }} alt="grass" />
        <canvas
          ref={(canvas) => { this.canvas = canvas; }}
          width="1400"
          height="700"
          tabIndex="0"
          onKeyDown={this.handleKeyDown}
        />
      </React.Fragment>
    );
  }
}
