const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./dbConfig');

  (swaggerJsdoc = require('swagger-jsdoc')),
    (swaggerUi = require('swagger-ui-express'));

  const userRoutes = require('./routes/user.route');
  const taskRoutes = require('./routes/task.route');

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
  app.use(cors());
  app.use('/api/User', userRoutes);
  app.use('/api/Task', taskRoutes);
  const port = process.env.PORT || 8080;

  // simple route
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to what next application.' });
  });

  const options = {
    definition: {
      openapi: '3.1.0',
      swagger: '2.0',
      version: '1.0.0',
      info: {
        title: 'LogRocket Express API with Swagger',
        version: '0.1.0',
        description:
          'This is a simple CRUD API application made with Express and documented with Swagger',
        license: {
          name: 'MIT',
          url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
          name: 'LogRocket',
          url: 'https://logrocket.com',
          email: 'info@email.com',
        },
      },
      servers: [
        {
          url: 'http://localhost:8080',
        },
      ],
    },
    apis: ['./routes/*.js'],
  };

  const specs = swaggerJsdoc(options);
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );

const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});
