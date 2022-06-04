const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const genreRoute = require('./genre');
const videogameRoute = require('./videogame');
const platformRoute = require('./platform');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/genre', genreRoute);
router.use('/videogame', videogameRoute);
router.use('/platform', platformRoute);

module.exports = router;
