var github = require('./github.js');
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
        github.authenticate({
            type: "oauth",
            token: request.auth.credentials.token
        });

        console.log(request.auth.credentials);
        request.auth.session.set(request.auth.credentials);
        return reply.redirect('/home');
    },
    issues: function(req, reply){
        console.log("routes auth", req.auth);
        reply.file("public/templates/issues.html");
    },
    main: function(request, reply){
        console.log("handler auth", request.auth);
        if (!request.auth.isAuthenticated){
            return reply.view('login'); // ****
        }
        request.auth.session.set(request.auth.credentials);
        return reply.redirect("/home");
    },
    repos: function(request, reply){
        var person = request.auth.credentials.profile.username;
        reply.view("public/templates/repos.html", person);
    },
    home: function(request, reply){
        // var github = require('github');

        var msg = {};
        github.repos.getAll(msg, function(err, data){
            console.log(data);
        });
        var orgs = {one: 'minaorangina', two: 'plastic-cup', three: 'swift-club'};

        reply.view("home", orgs);
    }

};

module.exports = handlers;
