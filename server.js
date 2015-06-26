var Hapi = require('hapi');
var server = new Hapi.Server();
var Handlebars = require('handlebars');
var routes = require ('./routes.js');

server.connection({
  port: process.env.PORT || 8000
});

var io = require('socket.io')(server.listener);
module.exports.io = io;

server.views({
	engines: {
		html: require('handlebars')
	},
	path: __dirname + '/public/templates'
});

server.register(require('hapi-auth-cookie'), function (err) {
    server.auth.strategy('session', 'cookie', {
        password: 'password',
        cookie: 'sid-example',
        redirectTo: '/'
    });
});

server.register(require('./bell'), function(err){
    server.auth.strategy('github', 'bell', {
        provider: 'github',
        password: 'password',
        clientId: process.env.APPID,
        clientSecret: process.env.APPSECRET,
        scope: ['write', 'read:org', 'user', 'admin:org', 'write:org', 'repo', 'public_repo', 'read:repo_hook', 'write:repo_hook'],
    });
});

server.route(routes);

server.start();
