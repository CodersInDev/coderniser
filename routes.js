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
    path: '/issues',
    method: 'GET',
    handler: function(req, res){
    	res.file("issues.html")
    }
  }

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
