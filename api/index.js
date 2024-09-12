const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

// Habilitar el parsing de JSON
app.use(express.json());

// Configuración de CORS
const whitelist = ['http://localhost:8080', '']; // Ajusta las URLs permitidas
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  }
};
app.use(cors(options));

// Rutas base
app.get('/', (req, res) => {
  const htmlResponse = `
    <html>
      <head>
        <title>NodeJs y Express en Vercel</title>
      </head>
      <body>
        <h1>Hola mi server en Express desplegado en Vercel</h1>
      </body>
    </html>
  `;
  res.send(htmlResponse);
});

// Ruta adicional
app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// Integrar las rutas de la API
routerApi(app);

// Middlewares para manejar errores
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Escuchar el puerto
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

