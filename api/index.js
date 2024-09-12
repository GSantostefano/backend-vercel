const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();

// Habilitar el parsing de JSON
app.use(express.json());

// Configuración de CORS
const whitelist = [
  'http://localhost:8080', // Tu entorno de desarrollo local
  'https://vercel-gacho-a2gmxug9e-gabriel-santostefanos-projects.vercel.app', // Dominio de Vercel
  'https://vercel-test-tau-dun.vercel.app'
];
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
  res.send('Hola mi server en express');
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

module.exports = app; // Exporta la aplicación para que Vercel la use
