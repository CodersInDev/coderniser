var handlers = require('./handlers.js);
var routes = [
  {
    path: '/',
    method: 'GET',
    handler: handlers.repositories
  }

];

module.exports = routes;
