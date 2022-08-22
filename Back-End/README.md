# Memo Pad

## DESCRIPCIÓN

-   Implementar una API que permita publicar notas privadas y categorizarlas.

-- ANÓNIMO:

        ● Login: Usando email & password.

        ● Registro: pedir email & password.

-- USUARIOS REGISTRADOS:

        ● Crear una  nota: título, texto, y categoría única(fíjas).

        ● Ver el listado de notas (solo ver los títulos).

        ● Visualizar una nota.

        ● Modificar sus notas: título, texto y categoría.

        ● Opcional
                - Marcar una nota como pública:
                Por origen todas las notas son privadas y solo puede verlas el usuario que las crea, pero sí una nota se marca como pública esta se puede ver por todos los  usuarios. Las notas públicas solo se pueden ver si se conoce la URL.

                - Eliminar una nota

                -Crear, editar y borrar  categorías.

                -Imagen: poder asociar una imagen (única) a cada nota.

### Servidor :

-   Memo Pad

​

### Instalar

​

-   Crear una base de datos vacía en una instancia de MySQL local.
    ​
-   Guardar el archivo .env.example como .env y cubrir los datos necesarios.
    ​
    ​

*   Instalar

```
  npm i -D nodemon prettier eslint morgan
```

Que son dependencias de desarrollo.
​

-   Instalar

```
npm i express dotenv mysql2 bcrypt jsonwebtoken cors.
```

-   Ejecutar npm run initDB para crear las tablas necesarias en la base de datos anteriormente creada.
    ​
-   Ejecutar npm run dev o npm start para lanzar el servidor.

-   Crear token de usuarios.
    ​

## Entidades

​

-   User:

    -   id
    -   username
    -   email
    -   password
    -   createdAt
    -   modifiedAt
        ​

-   Notes:

    -   id
    -   idUser
    -   title
    -   text
    -   image
    -   category
    -   createdAt
    -   modifiedAt

## Endpoints

​

#### User:​

-   POST: [/user] - Registro de usuario.
    ​
-   POST: [/login] - Login de usuario (devuelve token).
    ​
-   GET: [/user/:idUser] - Devuelve información de usuario.
    ​
-   GET: [/user] - Devuelve información del usuario del token. **TOKEN**
    ​

    ​

#### Notes:

-   POST: [/notes] - Escribir una nota. **TOKEN**
    ​
-   GET: [/notes] - Mostrar los titulos de las notas. **TOKEN**
    ​
-   GET: [/notes/:idNotes] - Mostrar una sola nota. **TOKEN**
    ​
-   PUT: [/notes/:idNotes] - Modificar las notas. **TOKEN**
    ​
-   DELETE: [/notes/:idNotes] - Borrar una nota del usuario que lo creó. **TOKEN**
