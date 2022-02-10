const express = require("express");
const cors = require("cors");
const movieData = require("./data/movies.json");
const users = require("./data/users.json");
const DataBase = require("better-sqlite3");
const { response } = require("express");
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
  const sortParam = req.query.sort; // ASC o DESC
  console.log(sortParam);
  console.log(typeof genderFilterParam === "string");
  
  // Relación con base de datos.

  // Como nos devuelve datos la BD.

  if (genderFilterParam === "all") {
    const allquery = db.prepare(`SELECT * FROM movies ORDER BY name ${sortParam}`);
    const allMovies = allquery.all();
    res.json({
      success: true,
      movies: allMovies,
    });
  } else {
    const queryMoviesFilterByGender = db.prepare(
      `SELECT * FROM movies WHERE gender = ? ORDER BY name ${sortParam}`
    );
    const moviesByGender = queryMoviesFilterByGender.all(genderFilterParam);
    res.json({
      success: true,
      movies: moviesByGender,
    });
  }
});
server.post("/login", (req, res) => {
  const emailParam = req.body.email;
  const passwordParam = req.body.password;
  
  const findResult = users.find(
    (user) => user.email === emailParam && user.password === passwordParam
  );
  if (userFound === undefined) {
      res.json({
      success: false,
      errorMessage: "Usuaria/o no encontrada/o",
    });
  } else {
    res.json({
      success: false,
      errorMessage: "Usuaria/o no encontrada/o",
    });
  }

  res.json();
});

server.post("/sing-up", (req, res) => {
  const emailParam = req.body.email;
  const passwordParam = req.body.password;
  const queryUser = db.prepare(
    `SELECT * FROM users WHERE email = ?`
  );
  const foundUsers = queryUser.get(emailParam);

  if ( foundUsers  === undefined){
    const query = db.prepare("INSERT INTO users (email, password) VALUES (?, ?)");
  const userInsert = query.run(emailParam, passwordParam); 
  res.json({
    error: false, 
    userId: userInsert.lastInsertRowid
  })
  }  else {
  res.json({
    error: true,
    message: "La usuaria ya existe"
  });
}


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
