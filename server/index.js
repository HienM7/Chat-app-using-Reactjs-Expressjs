require('dotenv').config();
const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT || 6969;
require('./controllers/socketIo.controller')(io);

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const authApi = require('./routes/auth.route');
const dataApi = require('./routes/message.route');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(express.static("public"));

app.use('/auth', authApi);
app.use('/data', dataApi);

app.get("/", (req, res) => {
  res.send("connection complete");
});

server.listen(port, () => {
  console.log(`Server listen at localhost:${port}`);
} );
 
