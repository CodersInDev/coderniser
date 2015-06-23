var Hapi = require('hapi');
var server = new Hapi.Server();
var routes = require ('./routes.js');


server.connection({
  port: process.env.PORT || 8100
});

server.register(require("hapi-auth-cookie"), function(error){
	server.auth.strategy("session", "cookie", {
		password: process.env.AUTHPASSWORD,
		cookie: "sid",
		isSecure: false
		// redirectTo: "/"	
	})
})

server.register(require("bell"), function(error){
	server.auth.strategy("github", "bell", {
		provider: "github",
		password: process.env.AUTHPASSWORD,
		clientId: process.env.APPID,
		clientSecret: process.env.APPSECRET,
		isSecure: false
		// providerParams: {
		// 	redirect_uri: server.info.uri + "/issues"
		// }
	})
})

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
