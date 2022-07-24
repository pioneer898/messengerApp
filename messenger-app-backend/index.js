const express = require('express');
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const http = require('http');
const cors = require('cors');

// Custom
const errorHandler = require('./custom_modules/api/apiErrorHandler');
const com = require('./custom_modules/com');
const clientConfig = require('./config/clientConfig');

// Express
const app = express();
const server = http.createServer(app);
app.use(cors());
app.use(errorHandler);
app.use(express.json());

// Socket
const { Server } = require("socket.io");
const io = new Server(server);

// Session
app.use(session({
  cookie: {
    maxAge: (24*3600*1000),
    httpOnly: true,
    secure: false
  },
  store: new MemoryStore({
    checkPeriod: (24*3600*1000)
  }),
  resave: false,
  saveUninitialized: true,
  secret: clientConfig.clientPassword,
}));

// Static App
app.use(express.static('./frontend-dist/'));

// WebSocket
io.on('connection', client => {
	console.log('Client Connected');
});

// Start Server
const port = (process.env.NODE_ENV === undefined?'development':process.env.NODE_ENV) === 'production' ? 80 : 88;
server.listen(port, () => {
	console.log(`listening on *:${port}`);
});