//input artist/song/album
//need an onclick function when you click the search bar

var database = firebase.database()

database.ref("")

function musicDex() {
    event.preventDefault().

    var searchStuff = $(".form-control mr-sm-2").val().trim();


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


    $(".form-control mr-sm-2").empty();

    })
//needs different tabs that we can throw things into
//
//need to average the rating with reviews

$(".btn btn-outline-success my-2 my-sm-0").on("click", musicDex)
//firebase needs to record what genre
