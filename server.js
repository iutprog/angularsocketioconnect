//const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express app and create an HTTP server
//const app = express();
//const server = http.createServer(app);
const server = http.createServer();

// Initialize Socket.IO and bind it to the HTTP server
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:4200",  // Allow requests from Angular frontend
    methods: ["GET", "POST"]
  }
});

// Serve Angular app from 'dist' folder
//app.use(express.static(__dirname + '/dist/my-angular-socket-app'));

// Example of handling socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listening for a custom event from the frontend
  socket.on('message', (data) => {
    console.log('Message received:', data);
    
    // Emit the message to all connected clients
    io.emit('message', data);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Serve the app on port 3000 or a port of your choice
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
