const express = require('express');
const session = require('express-session')
const MemoryStore = require('memorystore')(session)
const http = require('http');
const cors = require('cors');

// Custom
const errorHandler = require('./custom_modules/api/apiErrorHandler');
const com = require('./custom_modules/com');
const Room = require('./custom_modules/room');
const Person = require('./custom_modules/person');
const Message = require('./custom_modules/message');
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
app.use('/',express.static('./frontend-dist/'));
app.use('/chat',express.static('./frontend-dist/'));

// Curremt State
const rooms = {};

app.post('/api/joinSession',async(req,res,next)=>{
  let roomId = req.body.roomId;
  let personId = req.body.personId;
  let room = new Room({id:roomId});
  let person = new Person({id:personId});

  if(!room.valid() || !person.valid()){
    res.json({
      success: false
    });
    return;
  }

  if(!(roomId in rooms)) rooms[roomId] = room;
  rooms[roomId].addPerson(person);
  res.json({
    success: true
  });
});

app.post('/api/message',async(req,res,next)=>{
  let roomId = req.body.roomId;
  let personId = req.body.personId;

  let message = new Message({
    from: rooms[roomId]?.getPerson(personId),
    text: req.body.message.text,
    media: req.body.message.media,
  });
  
  if(!rooms[roomId] || !rooms[roomId]?.getPerson(personId) || !message.valid()){
    res.json({
      success: false
    });
    return;
  }
  rooms[roomId].addMessage(message);
  
  res.json({
    success: true
  });
});

app.get('/api/messages',async(req,res,next)=>{
  let roomId = req.query['roomId'];
  let personId = req.query['personId'];
  
  if(!rooms[roomId] || !rooms[roomId]?.getPerson(personId)){
    res.json({
      success: false
    });
    return;
  }
  
  res.json({
    success: true,
    messages: rooms[roomId].messages
  });
});

// // WebSocket
// io.on('connection', client => {
// 	console.log('Client Connected');
// });

// Start Server
const port = (process.env.NODE_ENV === undefined?'development':process.env.NODE_ENV) === 'production' ? 80 : 88;
server.listen(port, () => {
	console.log(`listening on *:${port}`);
});