const express = require('express');
const cors = require('cors');
//Importamos los datos de las peliculas
//La constante movies es un array con la info de las peliculas
const movies = require('./data/movies.json');
// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

server.get('/movies', (req, res) => {
  //Consoleamos los query params que recibimos del fetch
  console.log(req.query);
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
