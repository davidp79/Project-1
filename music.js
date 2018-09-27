//input artist/song/album
//need an onclick function when you click the search bar
var database = firebase.database()

database.ref("")

function musicDex() {
    event.preventDefault().

    var artist = $("#artist").val().trim();
    var album = $("#album").val().trim();
    var song = $("song").val().trim();


var api1 = ""
api1 += '?' + $.param({

})

var api2 = ""
api2 += '?' + $.param({

})

var api3 = ""
api3 += '?' + $.param({

})

$.ajax({
    url: api1,
    method: 'GET'
}).then(function (response1) {


})


$.ajax({
    url: api2,
    method: 'GET'
}).then(function (response2) {


})
$.ajax({
    url: api3,
    method: 'GET'
}).then(function (response3) {


})


})
//needs different tabs that we can throw things into
//
//need to average the rating with reviews

$("#search").on("click", search)
//firebase needs to record what genre