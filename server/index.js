const express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 6969;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("connection complete");
});

server.listen(port, () => {
  console.log(`Server listen at localhost:${port}`);
} );

