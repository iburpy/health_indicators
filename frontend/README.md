# Documentación del Frontend

## Estructura del Proyecto

El proyecto se estructura en varias carpetas principales:

- `src/`: Contiene el código fuente de la aplicación.
- `public/`: Contiene los archivos estáticos que se sirven al cliente.

Dentro de `src/` encontramos:

- `api/`: Contiene las funciones que realizan las peticiones HTTP a la API.
- `context/`: Contiene los contextos de React utilizados en la aplicación.
- `components/`: Contiene los componentes de React reutilizables.
- `pages/`: Contiene los componentes de React que representan las páginas de la aplicación.

## Dependencias Principales

- `react`: Biblioteca para construir interfaces de usuario.
- `react-router-dom`: Biblioteca para manejar el enrutamiento en la aplicación.
- `axios`: Biblioteca para realizar peticiones HTTP.

## Contextos

Se utiliza un contexto llamado `AuthenContext` para manejar la autenticación del usuario. Este contexto proporciona funciones para registrarse e iniciar sesión, así como el estado del usuario y los errores de autenticación.

## Páginas

- `LoginPage`: Página para que los usuarios inicien sesión.
- `RegisterPage`: Página para que los usuarios se registren.

## Cómo Iniciar la Aplicación

Para iniciar la aplicación, primero instale las dependencias con `npm install` y luego inicie el servidor de desarrollo con `npm run dev`.
