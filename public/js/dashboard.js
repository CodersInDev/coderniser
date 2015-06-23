$(function(){

    $("ul.dropdown li").hover(function(){

    	$.getJSON("https://api.github.com/users/minaorangina/repos", function(data){
		// $('#repos').append("<h1>Your repos</h1>");
		for (var i = data.length - 1; i >= 0; i -= 1) {
            console.log(data[i]);
			$("#orgs_list").append("<li><a href=''>" + data[i].name + "</a></li>");
		}

	});

    	
        $(this).addClass("hover");
        $('ul:first',this).css('visibility', 'visible');

        $.getJSON("https://api.github.com/users/minaorangina/repos", function(data){
		// $('#repos').append("<h1>Your repos</h1>");
		for (var i = data.length - 1; i >= 0; i -= 1) {
			$("#list_personal").append("<li><a href=''>" + data[i].name + "</a></li>");
		}
	});

    
    }, function(){
    
        $(this).removeClass("hover");
        $('ul:first',this).css('visibility', 'hidden');
    
    });
    
    $("ul.dropdown li ul li:has(ul)").find("a:first").append(" &raquo; ");
    // $("li#orgs_list li").find("a:first").append(" &raquo; ");
    
});





// $('#button').click(function getRepos(){
// 	$.getJSON("https://api.github.com/users/minaorangina/repos", function(data){
// 		$('#repos').append("<h1>Your repos</h1>");
// 		for (var i = data.length - 1; i >= 0; i -= 1) {
// 			$("#repos").append("<li id=" + i + ">" + data[i].full_name + "</li>");
// 		}
// 		var toPlugIn;
// 		for (var j = 0; j < data.length; j++){
// 			toPlugIn = document.getElementById(j).innerHTML.split("/");
// 			//console.log(data[j]);
// 			$('#'+j).click(function(){
// 				var text = this.innerHTML.split("/");
// 				getContributors(text[0], text[1]);
// 			});
// 		}

// 	});
// });




//Notification.requestPermission(notify);

// function getContributors(owner, repo){
// 	$.getJSON("https://api.github.com/repos/" + owner + "/" + repo + "/contributors", function(data){
// 		console.log(data);
// 		//$('#repo-members').text = data;

// 		//$('#contributors').append("<h1>Your repos</h1>");
// 		var contents = "";
// 		data.forEach(function(e){
// 			contents += "<img id='avatar' width='30px' height='30px' src=" + e.avatar_url + "/>" + e.login + "<br>";
// 		});

// 		document.getElementById('contributors').innerHTML = "<br><strong>" + owner + "/" + repo + "</strong><br>" + contents + "<br>";
// 	});
// }
