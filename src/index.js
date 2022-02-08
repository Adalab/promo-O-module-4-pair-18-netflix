const express = require("express");
const cors = require("cors");
const movieData = require("./data/movies.json");
const users = require("./data/users.json");
const DataBase = require("better-sqlite3");
// create and config server
const server = express();
server.use(cors());
server.use(express.json());
server.set("view engine", "ejs");

const staticServerPathStyles = "./public-styles";
server.use(express.static(staticServerPathStyles));

const staticServerPathImg = "./public-movies-images";
server.use(express.static(staticServerPathImg));

// Base de datos:

const db = new DataBase("./src/db/database.db", { verbose: console.log });
// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
server.get("/movies", (req, res) => {
  // Recogemos datos. 
  const genderFilterParam = req.query.gender; // "", Drama, Comedia. 
  const sortParam = req.query.sort;  // ASC o DESC

  // Relación con base de datos. 
  const query = db.prepare(`SELECT * FROM movies WHERE gender = ? ORDER BY name ${sortParam}`);
  const allquery = db.prepare(`SELECT * FROM movies ORDER BY name ${sortParam}`);

  // Como nos devuelve datos la BD. 
  const moviesByGender = query.all(genderFilterParam);
  const allMovies = allquery.all();
  
  if (genderFilterParam !== "") {res.json({
      success: true,
      movies: moviesByGender,
    });} else {
      res.json({
        success: true,
        movies: allMovies,
      });
    } 

});
server.post("/login", (req, res) => {
  const emailParam = req.body.email;
  const passwordParam = req.body.password;

  const findResult = users.find(
    (user) => user.email === emailParam && user.password === passwordParam
  );
  if (findResult !== undefined) {
    res.json({
      success: true,
      userId: "id_de_la_usuaria_encontrada",
    });
  } else {
    res.json({
      success: false,
      errorMessage: "Usuaria/o no encontrada/o",
    });
  }

  res.json();
});

server.get("/movie/:movieId", (req, res) => {

  const requestParamsId = req.params.movieId;

  const query = db.prepare("SELECT * FROM movies WHERE id = ?");
  const foundMovie = query.get(requestParamsId);

  // const foundMovie = movieData.find(
  //   (movie) => parseInt(movie.id) === parseInt(requestParamsId)
  // );
  res.render("movie", foundMovie);
});

const staticServerPath = "./public-react";
server.use(express.static(staticServerPath));
