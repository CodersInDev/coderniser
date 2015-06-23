// get all issues assigned to the authenticated user (access_token)

function getUserOrgs(){
	$.getJSON("https://api.github.com/user/memberships/orgs/", function(data){
		console.log(data);
		for (var i = 0; i < data.length; i++){
			$("#orgs").append("<li id=" + i + ">" + "</li>");
		}
	});
}



$('#button').click(function getRepos(){
	$.getJSON("https://api.github.com/users/minaorangina/repos", function(data){
		$('#repos').append("<h1>Your repos</h1>");
		for (var i = data.length - 1; i >= 0; i -= 1) {
			$("#repos").append("<li id=" + i + ">" + data[i].full_name + "</li>");
		}
		var toPlugIn;
		for (var j = 0; j < data.length; j++){
			toPlugIn = document.getElementById(j).innerHTML.split("/");
			//console.log(data[j]);
			$('#'+j).click(function(){
				var text = this.innerHTML.split("/");
				getContributors(text[0], text[1]);
			});
		}

		$('#column2').css('visibility', 'visible');
	});
});

function getContributors(owner, repo){

	$.getJSON("https://api.github.com/repos/" + owner + "/" + repo + "/contributors", function(data){
		console.log(data);
		var contents = "";
		data.forEach(function(e){
			contents += "<img id='avatar' width='30px' height='30px' src=" + e.avatar_url + "/>" + e.login + "<br>";
		});

		document.getElementById('contributors').innerHTML = "<h1>Contributors</h1><strong>" + owner + "/" + repo + "</strong><br>" + contents + "<br>";
		$('#column3').css('visibility', 'visible');
	});
}



function notify(){
	var not = new Notification("GitHub organiser", {
		body: "Yo, someone closed the branch!"
	});
	console.log(not);

	return not;
}

//Notification.requestPermission(notify);
