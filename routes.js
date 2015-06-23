var handlers = require('./handlers.js');
var routes = [
  {
    path: '/',
    method: 'GET',
    handler: handlers.repositories
  },
  
  {
    path: '/static/{path*}',
    method: 'GET',   
    handler:  {
      directory: {
        path: './'
      }
    }
  }, 
   
  {
    path: '/issues',
    method: 'GET',
    handler: handlers.issues
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
