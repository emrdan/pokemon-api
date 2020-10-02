const { json, urlencoded } = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const config = require('../config');
const PokemonRouter = require('../api/routes/pokemon');

module.exports = (app) => {
  app.enable('trust proxy');
  app.disable('x-powered-by'); 
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true })); 
  app.use(morgan('dev')); 

  app.use('/pokemon', PokemonRouter);

  app.use((req, res, next) => { 
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });

  app.listen(config.port, () => {
    console.log(`REST API on http://localhost:${config.port}`)
  })
};
