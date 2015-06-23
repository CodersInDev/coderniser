var Hapi = require('hapi');
var server = new Hapi.Server();
var routes = require ('./routes.js');

server.connection({
  port: process.env.PORT || 8000
});

server.views({
	engines: {
		html: require('handlebars')
	},
	path: __dirname + '/public/templates'
});

server.route(routes);
server.start(function(){
  console.log('The Coderniser server is running at ', server.info.uri);
});
