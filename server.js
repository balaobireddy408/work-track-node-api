const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose'),
  config = require('./dbConfig');

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

const server = app.listen(port, function () {
  console.log('Listening on port ' + port);
});
