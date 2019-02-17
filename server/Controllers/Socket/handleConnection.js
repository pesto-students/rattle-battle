const handleConnection = (socket) => {
  socket.on('ping', () => {
    socket.emit('ping received');
  });
};

module.exports = handleConnection;
