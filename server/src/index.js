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
  socket.on('joinGame', () => {
    const lastGame = games[games.length - 1];
    if (lastGame && lastGame.freeToJoin) {
      const playerTwoInfo = { playerId: 1, socket };
      lastGame.joinGame(playerTwoInfo);
    } else {
      const playerOneInfo = { playerId: 0, socket, io };
      const newGame = new Game(playerOneInfo);
      games.push(newGame);
    }
    // eslint-disable-next-line no-param-reassign
    socket.gameIndex = games.length - 1;
  });

  socket.on('leaveGame', () => {
    // console.log('Closing game');
    // @TODO:Make this player lose.
    games[socket.gameIndex].stopGame();
    games.splice(socket.gameIndex, 1);
  });
});

export default server;
