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
      var opts = {
        uri: 'https://api.github.com/user/repos',
        method: "GET",
        headers: {
          'Authorization': 'token ' + request.auth.credentials.token,
          'User-Agent': 'simonLab'
        }
      };

      requestGithub(opts,function(error, response, body){
        var user = JSON.parse(body);
        var context = {avatar: user.avatar_url};
        console.log(body);
         return reply.view("home", context);
      });

      if(!request.auth.isAuthenticated){
          return reply.view('login');
      }
      //
      // var orgs = {one: 'minaorangina', two: 'plastic-cup', three: 'swift-club'};
      // reply.view("home", orgs);
    }

};

module.exports = handlers;
