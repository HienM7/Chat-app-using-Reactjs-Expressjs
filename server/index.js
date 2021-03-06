require('dotenv').config();
const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 6969;
require('./controllers/socketIo.controller')(io);

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const authApi = require('./routes/auth.route');
const dataApi = require('./routes/message.route');
const roomApi = require('./routes/room.route');
const registerApi = require('./routes/register.route');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(express.static("public"));

app.use('/auth', authApi);
app.use('/data', dataApi);
app.use('/room', roomApi);
app.use('/register', registerApi);

app.use(express.static(path.join(__dirname, 'build')));
console.log(path.join(__dirname, 'build', 'index.html'))
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, () => {
  console.log(`Server listen at localhost:${port}`);
} );
 
