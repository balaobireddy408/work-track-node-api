const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./dbConfig');

  const swaggerJsdoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');

  const userRoutes = require('./routes/user.route');
  const taskRoutes = require('./routes/task.route');
  const swaggerFile = require('./swagger_output.json');

  mongoose.Promise = global.Promise;
  mongoose
    .connect(config.DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(
      () => {
        console.log('Database is connected');
      },
      (err) => {
        console.log('Can not connect to the database ' + err);
      }
    );

  const app = express();
  app.use(bodyParser.json());
  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
  app.use(cors());
  app.use('/api/User', userRoutes);
  app.use('/api/Task', taskRoutes);
  const port = process.env.PORT || 8080;

  // simple route
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to what next application.' });
  });

  //const specs = swaggerJsdoc(options);
  const server = app.listen(port, function () {
    console.log('Listening on port ' + port);
  });

  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });
  // var swaggerJson = require('./swagger_output.json')
  // const specs = swaggerJsdoc(swaggerJson);
  // app.use(
  //   '/api-docs',
  //   swaggerUi.serve,
  //   swaggerUi.setup(swaggerJson)
  // );

  // app.use('/api/User', userRoutes);
  // app.use('/api/Task', taskRoutes);
//  require('./endpoints.js')(app);
