var requestGithub = require('request');
var handlers = {
    repositories: function(request, reply){
    //get the list of repositories for an organisation
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
        console.log("routes auth", req.auth);
        reply.file("public/templates/issues.html");
    },
    main: function(request, reply){
        if (!request.auth.isAuthenticated){
            return reply.view('login');
        }
        return reply.redirect("/home");
    },
    repos: function(request, reply){
        var person = request.auth.credentials.profile.username;
        reply.view("public/templates/repos.html", person);
    },
    home: function(request, reply){
      var opts = {
        uri: 'https://api.github.com/user/orgs?access_token=' + request.auth.credentials.token,
        method: "GET",
        headers: {
          'User-Agent': 'simonLab'
        }
      };
      requestGithub(opts,function(error, response, body){
        console.log("ERROR");
        console.log(error);
        console.log("RESPONSE");
        console.log(response);
        console.log("BODY");
        console.log(body);
      });
        var orgs = {one: 'minaorangina', two: 'plastic-cup', three: 'swift-club'};

        reply.view("home", orgs);
    }

};

module.exports = handlers;
