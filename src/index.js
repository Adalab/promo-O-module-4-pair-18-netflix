const express = require('express');
const cors = require('cors');
const movieData = require('./data/movies.json')
// create and config server
const server = express();
server.use(cors());
server.use(express.json());

const staticServerPath = "./public-react";
server.use(express.static(staticServerPath));
const staticServerPathImg = "./public-movies-images";
server.use(express.static(staticServerPathImg));

// init express aplication
const serverPort = 4030;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
server.get('/movies', (req, res) => {
     const response = {
    success: true,
    movies: movieData
  }
  ;
const filterMovies = response.movies
.filter((movie) => 
req.query.filter === "" ? true : movie.gender === req.query.filter); 

res.json(filterMovies);
});
