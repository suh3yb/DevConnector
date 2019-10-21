'use strict';

const express = require('express');
const connectDB = require('./db');
var socket = require('socket.io');

const app = express();

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/message', require('./routes/api/message'));

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// socket

const io = socket(server);
io.on('connection', function (socket) {
  socket.on('post', function (data) {
    socket.broadcast.emit('render', data);
  });

  socket.on('message', function (receiverId) {
    socket.broadcast.emit('incoming', receiverId);
  });

});
