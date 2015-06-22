var handlers = {
  repositories: function(request, reply){
    //get the list of repositories for an organisation
    reply("list of repository");
  },
  dashboard: function(request, reply) {
  	//some context message for now
  	var context = {
  		message: "Welcome user"
  	}
  	reply.view("dashboard", context);
  }
};

module.exports = handlers;
