var socket = io();
document.onload = start();

function start(){
    var repo = window.location.href.split('/');
    repo = repo[repo.length-1];
    $.get('/issues/' + repo, function(data){
        console.log(data);
        for (var i = 0; i < data.length; i++){
            $('#column1').append('<p>' + data[i].issue.title + '</p>');
        }
    });
}

socket.on('issue', function(data){
    console.log('socket event');
    $('#column1').append('<p>' + data.new_val.issue.title + '</p>');
});
