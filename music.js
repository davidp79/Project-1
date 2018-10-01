//input artist/song/album
//need an onclick function when you click the search bar

//var database = firebase.database()

//database.ref("")

// $("#search").on("click", musicDex);

$(".submit").on("click", function (event) {

    event.preventDefault();
    
    musicDex();
    

})


function musicDex() {

    var searchStuff = $("#search").val().trim();

    
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" 
        + searchStuff + "&key=AIzaSyDTmuq2U1iwoNN7IDwnuJdPTClXjSUQc-o",
        method: 'GET'
    }).then(function (response) {
        console.log(response.items)
        for (i = 0; i < 5; i++) {
            if (response.items[i].id.kind === "youtube#channel") {

                continue
            }


            var vidId = response.items[i].id.videoId
            console.log(vidId);
            $("#youtube").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + vidId + '" frameborder="100" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
        }
    })
    // var api1 = ""
    // api1 += '?' + $.param({

    // })

    // var api2 = ""
    // api2 += '?' + $.param({

    // })

    // var api3 = ""
    // api3 += '?' + $.param({

    // })


        $.ajax({
            url: "https://api.genius.com/search?q=" + searchStuff + "&access_token=A3QFPk4RZGxV8fgT_41uiJiCAeyXq-UhJ-xnxipOkgZSHnShtSRVdesaqTR8axQS",
            method: 'GET'
        }).then(function (response) {
            console.log(response);
            var artist = response.response.hits[0].result.primary_artist.api_path
            console.log(artist);
            $.ajax({
                url: "https://api.genius.com" + artist + "/?access_token=A3QFPk4RZGxV8fgT_41uiJiCAeyXq-UhJ-xnxipOkgZSHnShtSRVdesaqTR8axQS",
                method: 'GET'
            }).then(function (reponse) {
                console.log(reponse);
                var bioPic = $("<div>");
                var img = "<img>";
                    img.attr("src", response);
            })


 
})
}

function topArtist() {
    $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=4eb509c03c98813c8a254fc061a34193&format=json",
        method: 'GET'
    }).then(function (response) {
        console.log(response.artists.artist[0].name);

        var ol = $("<ol>")
        $("#list").append(ol)
        for (var i = 0; i < 10; i++) {
            var li = $("<li>");
            li.html(response.artists.artist[i].name);
            ol.append(li);
        }
    })
}
function topTrack() {
    $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=4eb509c03c98813c8a254fc061a34193&format=json",
        method: 'GET'
    }).then(function (response) {
        console.log(response);
    })
}

topArtist();

