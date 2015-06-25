var requestGithub = require('request');
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

    issues: function(req, reply){
        reply.file("public/templates/issues.html");
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
          'User-Agent': 'simonLab'
        }
      };

      var optsOrgs = {
        uri: 'https://api.github.com/user/orgs',
        method: "GET",
        headers: {
          'Authorization': 'token ' + request.auth.credentials.token,
          'User-Agent': 'simonLab'
        }
      };

      requestGithub(optsUser,function(error, response, body){
        var user = JSON.parse(body);
        context.avatar = user.avatar_url;
        requestGithub(optsOrgs,function(error, response, body){
          var organization = JSON.parse(body);
          console.log(response);
          context.orgs = [];
          // console.log(organization);
          for(var i = 0; i < organization.length; i++){
            context.orgs.push(organization[i].login);
          }
          console.log(context);
        });
      });

      if(!request.auth.isAuthenticated){
          return reply.view('login');
      }

      //
      // var orgs = {one: 'minaorangina', two: 'plastic-cup', three: 'swift-club'};
      reply.view("home", context);
    }

};

module.exports = handlers;
