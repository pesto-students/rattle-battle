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
const games = [];
io.sockets.on('connection', (socket) => {
  socket.on('joinGame', ({ id: playerId, username }) => {
    const lastGame = games[games.length - 1];
    const playerInfo = { playerId, username, socket };
    if (lastGame && lastGame.freeToJoin) {
      lastGame.joinGame(playerInfo);
    } else {
      playerInfo.io = io;
      const newGame = new Game(playerInfo);
      games.push(newGame);
    }
    // eslint-disable-next-line no-param-reassign
    socket.gameIndex = games.length - 1;
  });

  socket.on('leaveGame', (userId) => {
    console.log('Leaving game', userId);
    const game = games[socket.gameIndex];
    if (game && [game.firstSnake.ownerId, game.secondSnake.ownerId].includes(userId)) {
      game.stopGame({ lostUserId: userId });
      games.splice(socket.gameIndex, 1);
    }
  });
});

export default server;
