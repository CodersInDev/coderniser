var Request = require('request');
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
        reply.view('repos');
    },
    home: function(request, reply){
        if(!request.auth.isAuthenticated){
            return reply.view('login');
        }


        var options = {
            url: "https://api.github.com/user/repos",
            headers: {
                'User-Agent' : 'request',
                'Authorisation' : 'token ' + process.env.APIKEY
            }
        };

        Request(options, function(error, response, body){
            if (error){
                console.log("ERROR");
                console.log(error);
            }
            console.log("BODY");
            console.log(body);
        });

        var orgs = {one: 'minaorangina', two: 'plastic-cup', three: 'swift-club'};

        reply.view("home", orgs);
    }

};

module.exports = handlers;
