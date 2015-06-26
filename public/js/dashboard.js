var gridster;
var lastPosition;

$(function() {

    var socket = io();
    document.onload = start();

    function start(){
        var repo = window.location.href.split('/');
        repo = repo[repo.length-1];
        $.get('/issues/' + repo, function(data){
            data = JSON.parse(data);
            console.log(data);
            for (var i = 0; i < data.length; i++){

                // DO MAGIC HERE
            }
        });
    }

    socket.on('issue', function(data){
        console.log('socket event');
        $('#column1').append('<p>' + data.title + '</p>');
    });


    // get html from issues

    gridster = $(".gridster > ul").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [230, 100],
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

    // we will get data from db and populate page
    // check if array from db is empty??
    // if not, populate page
    // //ADD EXISTING ISSUES
    // if (fromDB){
    //     for (key in fromDB){
    //
    //     }
    //     arrayFromDB.forEach(function(widget){
    //         gridster.addWidget('<h1>YEEEEAH</h1>', lastPosition.size_x, lastPosition.size_y, lastPosition.col, lastPosition.row);
    //     });
    // }
    // console.log(lastPosition);


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
