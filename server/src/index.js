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
  /* eslint-disable no-param-reassign */

  socket.on('joinGame', ({ id: playerId, username }) => {
    const allGames = Object.values(games);
    const openGame = allGames.find(game => game.freeToJoin === true);

    const playerInfo = { playerId, username, socket };
    if (openGame) {
      openGame.joinGame(playerInfo);
      socket.game = openGame;
    } else {
      playerInfo.io = io;
      const newGame = new Game(playerInfo);
      games[newGame.roomId] = newGame;
      socket.game = newGame;
    }
    socket.userId = playerId;
  });

  const leaveGame = () => {
    const { game, userId } = socket;
    let lostUserId = userId;
    if (game && games[game.roomId]) {
      if (game.freeToJoin) {
        // nobody lost
        lostUserId = null;
      }
      game.stopGame({ lostUserId });
      delete games[game.roomId];
      socket.game = undefined;
    }
  };

  socket.on('leaveGame', leaveGame);
  socket.on('disconnect', leaveGame);
});

export default server;
