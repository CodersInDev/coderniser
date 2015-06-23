
// $("#loginButton").click(){
	
// }

// get all issues assigned to the authenticated user (access_token)
$("#userButton").click(function(){
	var accessToken; //get access token from login
	$.getJSON("https://api.github.com/issues?access_token=" + accessToken, function(data){
		console.log(data)
		for (var i = data.length - 1; i >= 0; i -= 1) {
			$("#userIssues").append("<li>" + data[i].title + "</li>")	
		}
		
	})	
})

// get all issues for a given repo
$("#repoButton").click(function(){
	var orgName = $("#orgText").val();
	var repoName = $("#repoText").val();
	$.getJSON("https://api.github.com/repos/" + orgName + "/" + repoName  + "/issues", function(data){
		console.log(data)
		for (var i = data.length - 1; i >= 0; i -= 1) {
			$("#repoIssues").append("<li>" + data[i].title + "</li>")	
		}
		
	})	
})

// get all events for a given repo
$("#eventsButton").click(function(){
	var orgName = $("#orgText").val();
	var repoName = $("#repoText").val();
	$.getJSON("https://api.github.com/repos/" + orgName + "/" + repoName  + "/issues/events", function(data){
		console.log(data)
		for (var i = data.length - 1; i >= 0; i -= 1) {
			$("#repoEvents").append("<li>" + data[i].event + "</li>")	
		}
		
	})	
})