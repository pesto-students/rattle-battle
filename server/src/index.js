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
    if (games.length === 0) {
      const game = new Game(0, socket, io);
      games.push(game);
    } else if (games[games.length - 1].freeToJoin) {
      const game = games[games.length - 1];
      game.joinGame(1, socket);
    } else {
      const game = new Game(0, socket, io);
      games.push(game);
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
