import socketIo from 'socket.io';
import app from './app/app';
import './database/connection';
import { PORT } from './app/appConstants';
import Game from './controllers/GameControllers/game';

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Listening on port ${PORT}`);
});

const io = socketIo(server);
const games = {};

io.sockets.on('connection', (socket) => {
  socket.on('joinGame', ({ id: playerId, username }) => {
    const openGame = Object.keys(games).find(game => game.freeToJoin === true);

    const playerInfo = { playerId, username, socket };
    if (openGame) {
      openGame.joinGame(playerInfo);
    } else {
      playerInfo.io = io;
      const newGame = new Game(playerInfo);
      games[newGame.roomId] = newGame;
    }
    /* eslint-disable no-param-reassign */
    socket.game = openGame;
  });

  socket.on('leaveGame', (userId) => {
    const { game } = socket;
    if (game) {
      game.stopGame({ lostUserId: userId });
      delete games[game.roomId];
      socket.game = undefined;
    }
  });
});

export default server;
