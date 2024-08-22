const { Server } = require('socket.io');

let io;

exports.initWebSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};

exports.getIo = () => {
  if (!io) throw new Error('WebSocket is not initialized');
  return io;
};
