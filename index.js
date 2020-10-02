const express = require('express');
const loaders = require('./loaders');

process.on('uncaughtException', (error)  => {
  console.log('Something happened: ',  error);
  process.exit(1);
});

process.on('unhandledRejection', (error, promise) => {
  console.log('The rejected promise: ', promise);
  console.log('The rejected error was: ', error );
});

(async() => {
  const app = express();
  await loaders(app);
})();