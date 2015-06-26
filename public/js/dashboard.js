var gridster;
var lastPosition;

$(function() {

    var socket = io();


    function start(){
        var repo = window.location.href.split('/');
        repo = repo[repo.length-1];
        $.get('/issues/' + repo, function(data){
            data = JSON.parse(data);
            console.log(data);
            for (var i = 0; i < data.length; i++){

                gridster.add_widget(
                    '<div class="card"><br><strong>Issue #'+ data[i].number +': </strong>' + data[i].title +
                    ' <br><strong>Raised by: </strong><img src=' +
                    data[i].user.avatar_url + '/> '+ 
                    data[i].user.login + '<br><br>' +
                    data[i].body + '<br>' +'</div>',
                    1,
                    1,
                    1,
                    i+1
                );
            }
        });
    }

    socket.on('issue', function(data){
        console.log('socket event');
        //$('#column1').append('<p>' + data.title + '</p>');
    });


    // get html from issues

    gridster = $(".gridster").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [250, 120],
        min_cols: 4,
        // draggc
        serialize_params: function($w, wgd) {
            console.log($($w).html());
            return {
                id: $($w).attr('id'),
                col: wgd.col,
                row: wgd.row,
                size_x: wgd.size_x,
                size_y: wgd.size_y,
                htmlContent : $($w).html(),
            };
        },
    }).data('gridster');
    start();

    // for(i=0; i<json.length; i++) {
    //     gridster.add_widget(
    //         '<div id="' + json[i]['id'] + '"></div>',
    //         json[i]['size_x'],
    //         json[i]['size_y'],
    //         json[i]['col'],
    //         json[i]['row']
    //     );
    // }

    // var result = gridster.serialize_params;
    //console.log(gridster);



    // ADD NEW ISSUES

    //     var json = [
    //       {
    //         "id": "foo",
    //         "col": 1,
    //         "row": 1,
    //         "size_y": 1,
    //         "size_x": 1,
    //       },
    //       {
    //         "id": "bar",
    //         "col": 4,
    //         "row": 1,
    //         "size_y": 1,
    //         "size_x": 1,
    //       },
    //     ];
    // var lastPosition;
    // var grid = $(".gridster").gridster({
    //     widget_margins: [10, 10],
    //     widget_base_dimensions: [230, 100],
    //     min_cols: 4,
    //     serialize_params: function($w, wgd) {
    //         console.log($($w).html());
    //         return {
    //             id: wgd.el[0].id,
    //             col: wgd.col,
    //             row: wgd.row,
    //             size_y: wgd.size_y,
    //             size_x: wgd.size_x,
    //             htmlContent : $($w).html(),
    //
    //         } ;
    //     },
    //     draggable : {
    //         stop: function(event, ui){
    //             lastPosition = grid.serialize();
    //             $.ajax({
    //                 type: 'POST',
    //                 url: '/board',
    //                 data: lastPosition
    //             });
    //             console.log(grid.htmlContent);
    //             console.log("LAST POSITION");
    //             console.log(JSON.stringify(lastPosition));
    //         }
    //     },
    // }).data('gridster');

    // for(i=0; i<json.length; i++) {
    //     grid.add_widget(
    //         '<div id="' + json[i]['id'] + '"></div>',
    //         json[i]['size_x'],
    //         json[i]['size_y'],
    //         json[i]['col'],
    //         json[i]['row']
    //     );
    // }

});
