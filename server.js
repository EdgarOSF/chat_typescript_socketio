const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

users = [];
connections = [];

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  connections.push(socket);
  console.log('connected: %s socket connected', connections.length);
  socket.on('disconnect', function (data) {
    connections.splice(connections.indexOf(socket), 1);
    console.log('disconnected: %s socket connected', connections.length);
  });

  socket.on('send message', function (data) {
    console.log(data);
    io.sockets.emit('new message', { msg: data });
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});

console.log('server is listening');
