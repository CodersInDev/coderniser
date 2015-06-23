var handlers = require('./handlers.js');
var routes = [
  {
    path: '/',
    method: 'GET',
    handler: handlers.repositories
  },
  {
    method: 'GET',
    path: '/static/{path*}',
    handler:  {
      directory: {
        path: './'
      }
    }
  },
  {
    path: '/repos',
    method: 'GET',
    handler: function(req, res){
    	res.file("repos.html");
    }
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
