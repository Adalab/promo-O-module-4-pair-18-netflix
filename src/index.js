const express = require('express');
const cors = require('cors');
const movieData = require('./data/movies.json')
// create and config server
const server = express();
server.use(cors());
server.use(express.json());

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
movie.gender === req.query.filter); 

res.json(filterMovies);
});