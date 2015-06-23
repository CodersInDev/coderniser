var handlers = require('./handlers.js');
var routes = [
  {
    path: '/',
    method: 'GET',
    handler: handlers.repositories
 //    config: {
 //    	auth: {
 //    		mode: "try",
 //    		strategy: "session"
 //    	},
 //    	handler: handlers.repositories
	// }
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
    config: {
    	auth: {
    		mode: "try",
    		strategy: "session"
    	},
    	handler: function(req, res){
    		console.log("routes auth", req.auth);
    		res.file("issues.html")
    	}
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
 },
 {
  	path: '/login',
  	method: 'GET',
  	config: {
    	auth: 'github',
    	handler: handlers.login
	}
 }
];

module.exports = routes;
