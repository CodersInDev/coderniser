var requestGithub = require('request');
var helpers = require('./helpers');
var r = require('rethinkdb');
var Handlebars = require('handlebars');
var server = require('./server.js');

r.connect( {host: 'https://frozen-taiga-7541.herokuapp.com', port: 28015}, function(err, conn) {
    if (err) {
        throw err;
    }
    connection = conn;
});

var handlers = {

    repositories: function(request, reply){
        reply("list of repository");
    },

    dashboard: function(request, reply) {
    	//some context message for now
    	var context = {
    		message: "Welcome user"
    	};
    	reply.view("dashboard", context);
    },

    login: function(request, reply){
        request.auth.session.set(request.auth.credentials);
        return reply.redirect('/home');
    },

    main: function(request, reply){
        if (!request.auth.isAuthenticated){
            return reply.view('login');
        }
        return reply.redirect("/home");
    },

    repos: function(request, reply){
        reply.view('repos');
    },

    home: function(request, reply){
      var context = {};
      //get info user
      var optsUser = {
        uri: 'https://api.github.com/user',
        method: "GET",
        headers: {
          'Authorization': 'token ' + request.auth.credentials.token,
          'User-Agent': request.auth.credentials.profile.username
        }
      };

      var optsOrgs = {
        uri: 'https://api.github.com/user/orgs',
        method: "GET",
        headers: {
          'Authorization': 'token ' + request.auth.credentials.token,
          'User-Agent': request.auth.credentials.profile.username
        }
      };

      var optsRepos = {
        uri: 'https://api.github.com/user/repos?type=owner',
        method: "GET",
        headers: {
          'Authorization': 'token ' + request.auth.credentials.token,
          'User-Agent': request.auth.credentials.profile.username,
        }
      };

      requestGithub(optsUser,function(error, response, body){
        var user = JSON.parse(body);
        context.avatar = user.avatar_url;
        context.login = user.login;
        requestGithub(optsOrgs,function(error, response, body){
          var organization = JSON.parse(body);
          context.orgs = [];
          for(var i = 0; i < organization.length; i++){
            context.orgs.push(organization[i].login);
          }
          requestGithub(optsRepos,function(error, response, body){
            context.repos = [];
            var repos = JSON.parse(body);
            for(var y = 0; y < repos.length; y++){
              context.repos.push(new Handlebars.SafeString('<a href ="/dashboard/' + repos[y].name + '">' + repos[y].name + '</a>'));
              helpers.hook(user.login, repos[y].name, request.auth.credentials.token);
            }
            return reply.view("home", context);
          });
        });
      });

      if(!request.auth.isAuthenticated){
          return reply.view('login');
      }
  },

  create: function(request, reply){
      var issue = JSON.parse(request.payload.payload);
      r.table('issues').insert(issue).run(connection, function(err, result){
          if (err) {
              throw err;
          }
          return;
      });
      reply(console.log(issue.issue.title + ' added to database'));
  },

  repo: function(request, reply){
      reply.view('dashboard', {repo: request.params.repo});
  },

  issue: function(request, reply){
      var repo = request.params.repo;
      r.table('issues').filter({repository: {name: repo}}).run(connection, function(err, cursor){
          var iss = [];
          if (err){
              throw err;
          }
          cursor.each(function(err, row){
              iss.push(row);
          });
          reply(iss);
      });
      r.table('issues').filter({repository: {name: repo}}).changes().run(connection, function(err, cursor) {
          if (err) {
              throw err;
          }
          cursor.each(function(err, change) {
              server.io.emit('issue', change);
          });
      });
  }
};

module.exports = handlers;
