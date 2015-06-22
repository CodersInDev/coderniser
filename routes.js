var handlers = require('./handlers.js');
var routes = [
  {
    path: '/',
    method: 'GET',
    handler: handlers.repositories
  },

  {
  	path: '/dashboard',
  	method: 'GET',
  	handler: handlers.dashboard
  },

  {
  	path: '/public/{path*}',
  	method: 'GET',
  	handler: {
        directory: {
            path: './public'
        }
    }
 }

];

module.exports = routes;
