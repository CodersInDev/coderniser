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
];

module.exports = routes;
