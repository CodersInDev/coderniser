var handlers = {
  repositories: function(request, reply){
    //get the list of repositories for an organisation
    reply("list of repository");
  },
};

module.exports = handlers;
