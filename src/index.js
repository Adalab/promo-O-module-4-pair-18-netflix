const express = require('express');
const cors = require('cors');
//Importamos los datos de las peliculas
//La constante movies es un array con la info de las peliculas
const movies = require('./data/movies.json');
//La constante users es un array con la info de los usuarios
const users = require('./data/users.json');
// create and config server
const app = express();
app.use(cors());
app.use(express.json());

// init express aplication
const serverPort = 4000;
app.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

app.get('/movies', (req, res) => {
  //Consoleamos los query params que recibimos del fetch
  //Guardamos el valor del parametro gender en una constante
  const genderFilterParam = req.query.gender;
  const sortParam = req.query.sort;

  //Filtramos por nombre de pelicula
  //Hacemos un ternario para tener en cuenta que no queremos aplicar el filtro
  //Si el valor del filtro es '' devolvemos siempre true, de forma que se agregaran todas las peliculas al array de peliculas filtradas. En caso contrario, compararemos el genero de cada una de las peliculas del array con el parametro que nos envian
  const filteredMovies = movies.filter(movie => genderFilterParam === '' ? true : movie.gender === genderFilterParam);

  //Ordenamos las peliculas por el order que nos envian como parametro
  filteredMovies.sort((a, b) => {
    if (sortParam === 'asc' && a.title > b.title || sortParam === 'desc' && a.title < b.title) {
      return 1;
    } else {
      return -1;
    }
  });

  //Esto es lo que va a recibir el fetch como response
  //Modificamos el array de movies por la constante que importamos del archivo data/movies.json
  res.json({
    success: true,
    movies: filteredMovies
  });
});

//Definimos el endpoint del fetch de login
app.post('/login', (req, res) => {
  console.log(req.body);
  const emailParam = req.body.email;
  const passwordParam = req.body.password;

  const findResult = users.find((user) => user.email === emailParam && user.password === passwordParam);

  if (findResult != undefined) {
    res.json({
      "success": true,
      "userId": "id_de_la_usuaria_encontrada"
    });
  } else {
    res.json({
      "success": false,
      "errorMessage": "Usuaria/o no encontrada/o"
    });
  }
});

//Añadimos el servidor de estaticos de react
const staticServerPathWeb = "./src/public-react";
app.use(express.static(staticServerPathWeb));

//Añadimos el servidor de estaticos de imagenes
const staticServerPathImages = "./src/public-movies-images";
app.use(express.static(staticServerPathImages));
