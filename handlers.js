
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
      return reply.redirect('/issues');
  },
  issues: function(req, reply){
      console.log("routes auth", req.auth);
      reply.file("public/templates/issues.html");
  },
  main: function(request, reply){
        console.log("handler auth",request.auth);
        request.auth.session.set(request.auth.credentials);
        return reply.redirect("/issues");
  },
  repos : function(request, reply){
  //  var person = request.auth.credentials.profile.username;
    reply.file("public/templates/repos.html");
  }
};

module.exports = handlers;
