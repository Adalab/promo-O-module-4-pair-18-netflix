// login

const getMoviesFromApi = (params) => {
  console.log(params);
  console.log('Se están pidiendo las películas de la app');
  // CAMBIA ESTE FETCH PARA QUE APUNTE A UN ENDPOINT DE TU SERVIDOR, PIENSA SI DEBE SER GET O POST, PIENSA QUÉ DATOS DEBES ENVIAR, ETC
  //Hemos modificado la ruta para que apunte al endpoint /movies del servidor
  return fetch(`http://localhost:4000/movies?gender=${params.gender}&sort=${params.sort}`)
    .then(response => response.json())
    .then((data) => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      //Borramos el codigo que habia para pintar los datos que devuelve el servidor
      // return {
      //   success: true,
      //   movies: [
      //     {
      //       id: '1',
      //       title: 'Gambita de dama',
      //       gender: 'Drama',
      //       image:
      //         '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/gambito-de-dama.jpg'
      //     },
      //     {
      //       id: '2',
      //       title: 'Friends',
      //       gender: 'Comedia',
      //       image:
      //         '//beta.adalab.es/curso-intensivo-fullstack-recursos/apis/netflix-v1/images/friends.jpg'
      //     }
      //   ]
      // };

      //PIntamos los datos que nos devuelve el servidor
      return data;


    });
};

const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;
