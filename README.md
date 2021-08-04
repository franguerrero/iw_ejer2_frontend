# Introduccion
Master en Desarrollo de Software
Asignatura: “Ingeniería WEB”
(Ingeniería Web. Una visión general IW)

Módulo 1. Ejercicio 2: Implementación de un ejemplo funcional de uso de tecnologías web.

## Descripción
Este codigo pertenece al módulo del frontend de la aplicacion que se ha desarrollado para el ejercicio.

Consiste en un front basado en React con el framework de ant design para los componentes visuales.

Este modulo de front se comunica con la parte backend basada en un API NodeJS que es la que contiene la logica de los servicios y la comunicacion con la base de datos.

Para probar este módulo de frontend con su funcionalidad completa, el backend debe estar levantado. Para facilitar la labor, se ha creado un docker-compose.yml en este mismo repositorio que permite descargarse los 3 dockers necesarios para correr la aplicacion desde DockerHub. Asi mismo, si se quiere modificar el codigo, se puede hacer uso del fichero docker-composeDockerfileLocal.yml que descarga los Dockers del backend y la Base de Datos (mongo) y hace uso de Dockerfile para crear un Dockerfile local con el codigo del repositorio (que se puede modificar)

Para levantar el docker-compose, simplemente:

`docker-compose up`

Si todo ha ido correcto, una vez levantado se debe poder acceder a traves de un navegador web a:

`http://localhost:3000/aplicaciones/`

## Comandos utiles
### En local para montarlo y ejecutarlo 
```
npm install
npm run start:local
```

### Montar Docker

    docker build --pull --rm -f "Dockerfile" -t iwejer2frontend:latest "."
