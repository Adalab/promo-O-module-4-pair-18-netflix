const express = require("express");
const cors = require("cors");
const movieData = require("./data/movies.json");
const users = require("./data/users.json");
// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set('view engine', 'ejs');

const staticServerPath = "./public-react";
server.use(express.static(staticServerPath));
const staticServerPathImg = "./public-movies-images";
server.use(express.static(staticServerPathImg));
const staticServerPathStyles = "./public-styles";
server.use(express.static(staticServerPathStyles));

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
server.get("/movies", (req, res) => {
  const genderFilterParam = req.query.gender;
  const sortParam = req.query.sort;

  const filterMovies = movieData
    .filter((movie) =>
      genderFilterParam === "" ? true : movie.gender === genderFilterParam
    )
    .sort((a, b) => {
      if (
        (sortParam === "asc" && a.title > b.title) ||
        (sortParam === "desc" && a.title < b.title)
      ) {
        return 1;
      } else {
        return -1;
      }
    });

  res.json({
    success: true,
    movies: filterMovies,
  });
});
server.post("/login", (req, res) => {
  const emailParam = req.body.email;
  const passwordParam = req.body.password; 
  console.log(req.body);
  const findResult = users.find((user) =>
  user.email === emailParam && user.password === passwordParam);
  if (findResult !== undefined) {
    res.json({
      success: true,
      userId: "id_de_la_usuaria_encontrada",
    });
  } else {
    res.json({
      "success": false,
       "errorMessage": "Usuaria/o no encontrada/o",
    });
  }

  res.json();
});

server.get('/movie/:movieId', (req, res) => {
  const requestParamsId = req.params.movieId;
  

  const foundMovie = movieData.find((movie) => parseInt(movie.id) === parseInt(requestParamsId));
  res.render("movie", foundMovie);
});


