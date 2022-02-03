const express = require('express');
const cors = require('cors');
const movieData = require('./data/movies.json')
// create and config server
const server = express();
server.use(cors());
server.use(express.json());

const staticServerPath = "./public-react";
server.use(express.static(staticServerPath));

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
server.get('/movies', (req, res) => {
   const response = {
    success: true,
    movies: movieData
  }
  res.json(response);
})