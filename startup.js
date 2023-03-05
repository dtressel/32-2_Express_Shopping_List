// Starts up the server

const app = require('./app');

app.listen(3000, () => {
  console.log('Server running at localhost:3000');
})