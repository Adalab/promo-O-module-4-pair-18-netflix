<<<<<<< HEAD
 const express = require('express');
 const cors = require('cors');
 //Importamos los datos de las peliculas
// //La constante movies es un array con la info de las peliculas
 const movies = require('./data/movies.json');
// //La constante users es un array con la info de los usuarios
const users = require('./data/users.json');
// // create and config server
 const app = express();
 app.use(cors());
 app.use(express.json());

// // init express aplication
const serverPort = 4000;
app.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

 app.get('/movies', (req, res) => {
//   //Consoleamos los query params que recibimos del fetch
//   //Guardamos el valor del parametro gender en una constante
   const genderFilterParam = req.query.gender;
   const sortParam = req.query.sort;

//   //Filtramos por nombre de pelicula
//   //Hacemos un ternario para tener en cuenta que no queremos aplicar el filtro
//   //Si el valor del filtro es '' devolvemos siempre true, de forma que se agregaran todas las peliculas al array de peliculas filtradas. En caso contrario, compararemos el genero de cada una de las peliculas del array con el parametro que nos envian
  const filteredMovies = movies.filter(movie => genderFilterParam === '' ? true : movie.gender === genderFilterParam);

//   //Ordenamos las peliculas por el order que nos envian como parametro
  filteredMovies.sort((a, b) => {
    if (sortParam === 'asc' && a.title > b.title || sortParam === 'desc' && a.title < b.title) {
    return 1;
     } else {
       return -1;
     }
   });

//   //Esto es lo que va a recibir el fetch como response
//   //Modificamos el array de movies por la constante que importamos del archivo data/movies.json
   res.json({
     success: true,
     movies: filteredMovies
   });
 });

// //Definimos el endpoint del fetch de login
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

// //Añadimos el servidor de estaticos de imagenes
 const staticServerPathImages = "./src/public-movies-images";
 app.use(express.static(staticServerPathImages));
=======
const express = require('express');
const cors = require('cors');
//Esto es una co0nstante con el array de peliculas que me he importado
const movies = require('./data/movies.json');
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
//Voy a crear un endpoint para movies
//Este endpoint utiliza query params por lo que la url es /movies aunque no envie parametros
app.get('/movies', (req, res) => {
  const genderFilterParam = req.query.gender;
  const sortParam = req.query.sort;
  console.log(req.query);
  console.log(genderFilterParam);
  console.log(sortParam);
  // console.log(movies);
  //Guaradamos en una variable el filtri de cada pelic comparamos el genero con el filtro que nos han pasado, no llevas llaves con return o no las pones, cuando filtras en select por todos no te salen las pelis,No salwe nada xq le has dixo q compare el genero con el filtro y cuando le pones todos el filtro esta vacío y no coincide con ninguno hay que hacer un ternario para que si el filtro esta vacío devuelva todos los resultados.
  //Si el filtro esta vacio  devuelvce true de forma que te lo devolverá todos si tiene algo comparalo.
  const filteredResults = movies.filter((movie) => !genderFilterParam ? true : movie.gender === genderFilterParam);

  //Ordenacion
  filteredResults.sort((a, b) => {
    if (sortParam === 'asc' && a.title > b.title || sortParam === 'desc' && a.title < b.title) {
      return 1;
    } else {
      return -1;
    }
  });

  res.json({
    success: true,
    // movies: movies, en sustitucion de devolver el array entero vamos a devolver filtrado pero dentro del atributo movies
    movies: filteredResults
  })
});

//Voy a crear un endpoint para login
app.post('/login', (req, res) => {
  console.log('soyunmuñeco');
  console.log(req.body);
  const emailParam = req.body.email;
  const passwordParam = req.body.password;

  const findResult = users.find((user) => user.email === emailParam && user.password === passwordParam);

  //Si la usuaria existe responde a la petición con:
  if (findResult !== undefined) {
    res.json({

      "success": true,
      //findResult es el objeto encontrado y tenemios que acceder a su id
      "userId": findResult.id
    })
  } else {
    res.json({
      "success": false,
      "errorMessage": "Usuaria/o no encontrada/o"
    })
  }
});

//A diferencia de un endpoint con query params, los url params forman parte de la url
//Por tanto, si no envias la parte del parametro en la url no va a ser una url valida
// La url /movie no es valida por que le falta la parte del parametro
app.get('/movie/:movieId', (req, res) => {
  //Lo consoleamos para poder utilizar movieId
  console.log(req);
  console.log(req.params);
  //busca en ese array de películas que has importado la que tenga el mismo id que estás recibiendo por URL params
  const idParam = req.params.movieId;

  const foundMovie = movies.find((movie) => movie.id === idParam);
  console.log(foundMovie);

  //Para que imprima en el front necesitamos res. 

  //3.4 - Devolvemos a la peticion la plantilla movie.ejs para que se renderice en el navegador
  // 4.1 - Añadimos el objeto foundMovie para que la plantilla se rellene con los datos de la pelicula que ha encontrado y que estan guardados en el constante
  res.render('movie', foundMovie);

});




//Añadimos servidor de estáticos de react
//la ruta del proyecto compilado de react ya es front da igual lo que haya sido, es  mi proyecto de front compilado, public-react es servidor.Le estas diciendo al servidor donde esta la parte de rect
const staticServerPathWeb = "./src/public-react";
//le dice al servidor donde esta el servidor de estaticos para cuando desde el navegador sdde le pregunte por un recurso sepa donde tiene que ir a buscarlo.
// ej: localhost 4000 el servidor irá a buscar index html a su servidor de estaicos
//Asigna al servidor esa carpeta de estaticos esta dos simprer van juntas siempre hacen lo mosmo
app.use(express.static(staticServerPathWeb));
//Añadimos el servidor de estaticos de imagenes
const staticServerPathImages = "./src/public-movies-images";
app.use(express.static(staticServerPathImages));


//4.4 - añadimos el servidor de estaticos de estilos css para las plantillas
const staticServerPathStyles = "./src/public-styles";
app.use(express.static(staticServerPathStyles));

//3.2 Añadimos el motor de plantillas al servidor
app.set('view engine', 'ejs');
>>>>>>> d535e8d (parte express)
