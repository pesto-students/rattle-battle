const express = require('express');
const socket = require('socket.io');
const handleConnection = require('./Controllers/Socket/handleConnection');

const PORT = process.env.PORT || 4000;

const app = express();

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Listening on port ${PORT}`);
});

const io = socket(server);

io.on('connection', handleConnection);
