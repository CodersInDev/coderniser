var gridster;
var lastPosition;

$(function() {


    // get html from issues

    gridster = $(".gridster > ul").gridster({
        widget_margins: [10, 10],
        widget_base_dimensions: [230, 100],
        min_cols: 4,
        draggable : {
            stop: function(event, ui){
                lastPosition = gridster.serialize_params();
                $.ajax({
                    type: 'POST',
                    url: '/board',
                    data: lastPosition
                });

                // console.log("LAST POSITION");
                // console.log(JSON.stringify(lastPosition));
            }
        },
        serialize_params: function($w, wgd) {
            return {
            id: $($w).attr('id'),
            col: wgd.col,
            row: wgd.row,
            size_x: wgd.size_x,
            size_y: wgd.size_y,

            };
        },
    }).data('gridster');

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
//   {
//     "id": "foo",
//     "col": 1,
//     "row": 1,
//     "size_y": 3,
//     "size_x": 3
//   },
//   {
//     "id": "bar",
//     "col": 4,
//     "row": 1,
//     "size_y": 2,
//     "size_x": 2
//   },
// ];
//
// var grid = $("#main").gridster({
//     widget_margins: [8, 8],
//     widget_base_dimensions: [140, 140],
//     serialize_params: function($w, wgd) {
//         return {
//             id: wgd.el[0].id,
//             col: wgd.col,
//             row: wgd.row,
//             size_y: wgd.size_y,
//             size_x: wgd.size_x,
//         } ;
//     }
// }).data('gridster');
//
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
