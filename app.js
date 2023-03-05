const express = require('express'); 

const itemsRoutes = require('./items-routes');

const app = express();

app.use(express.json());

app.use('/items', itemsRoutes);

app.use((error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message;

  res.status(status).json(
      {error: {message, status}}
  );
})

module.exports = app;