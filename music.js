//input artist/song/album
//need an onclick function when you click the search bar

//var database = firebase.database()

//database.ref("")

// $("#search").on("click", musicDex);
var config = {
    apiKey: "AIzaSyB-gchDCtRKtWEopBSRbu0HuIMVS1yYW6s",
    authDomain: "my-project-ed37c.firebaseapp.com",
    databaseURL: "https://my-project-ed37c.firebaseio.com",
    projectId: "my-project-ed37c",
    storageBucket: "my-project-ed37c.appspot.com",
    messagingSenderId: "625568993024"
};

var artistName
var artistRating


firebase.initializeApp(config);
var database = firebase.database();


$(document).ready(function () {
    $('.parallax').parallax();
});

topArtist();

$(".submit").on("click", function (event) {

    event.preventDefault();
    $("#rating").empty();
    $("#youtube").empty();

    this.searchStuff = $("#search").val().trim();
    geniusSearch(this.searchStuff);
    youtubeSearch(this.searchStuff);
})

$(document).on("click", ".list", function () {

    $("#rating").empty();
    $("#youtube").empty();

    this.toplist = $(this).data("artist");
    geniusSearch(this.toplist);
    youtubeSearch(this.toplist);
})


function youtubeSearch(x) {
    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q="
            + x + "&key=AIzaSyDTmuq2U1iwoNN7IDwnuJdPTClXjSUQc-o",
        method: 'GET'
    }).then(function (response) {

        for (i = 0; i < 5; i++) {
            if (response.items[i].id.kind === "youtube#channel") {
                continue
            }

            var vidId = response.items[i].id.videoId
            $("#youtube").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + vidId + '" frameborder="100" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
        }
    })
}
function geniusSearch(x) {
    
    $.ajax({

        url: "https://api.genius.com/search?q=" + x +
            "&access_token=A3QFPk4RZGxV8fgT_41uiJiCAeyXq-UhJ-xnxipOkgZSHnShtSRVdesaqTR8axQS",
        method: 'GET'
    }).then(function (response) {

        // console.log(response);

        var artist = response.response.hits[0].result.primary_artist.api_path;

        // console.log(artist);

        $.ajax({
            url: "https://api.genius.com" + artist +
                "/?access_token=A3QFPk4RZGxV8fgT_41uiJiCAeyXq-UhJ-xnxipOkgZSHnShtSRVdesaqTR8axQS" +
                "&text_format=html",
            method: 'GET'
        }).then(function (response) {
            $("#genius").empty();

            var artistN = response.response.artist.name;
            $("#artist-name").html("<h5>" + artistN + "</h5>");

            var bioPic = $("<div>");
            var img = $("<img>");
            var x = response.response;
            img.addClass("circle");
            img.attr("src", x.artist.image_url);
            bioPic.append(img);
            $("#genius").prepend(bioPic);
            var name = x.artist.alternate_names;
            var moreName = $("<div>");
            moreName.append(name);
            $("#genius").append(moreName)

            var describe = x.artist.description.html;
            var bio = $("<div>");
            bio.append(describe);
            $("#genius").append(bio);

            $("#rating").append("<p>Rate 'em!</p>");
            for (i = 0; i < 5; i++) {
                var starButton = $("<button>");
                starButton.addClass("star");
                starButton.attr("data-number", i + 1);
                starButton.attr("data-artist", artistN);
                starButton.append("<i class='far fa-star'></i>");
                $("#rating").append(starButton);
            }
            

            $(".star").on("click", function () {
                var artistRating = $(this).attr("data-number");

                var artistName = $(this).attr("data-artist");

                database.ref("/ratings/").push({
                    artistName: artistName,
                    artistRating: artistRating
                })

                updateRating(artistN);
            })

            

        })
    })
}
function topArtist() {
    $.ajax({
        url: "https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=4eb509c03c98813c8a254fc061a34193&format=json",
        method: 'GET'
    }).then(function (response) {

        var ol = $("<ol>")
        $("#list").append(ol)
        for (var i = 0; i < 10; i++) {
            var li = $("<li>");
            li.html(response.artists.artist[i].name);
            li.addClass("list");
            li.data("artist", response.artists.artist[i].name);
            ol.append(li);
        }

    })
}
function updateRating(artistName) {
    database.ref("/ratings/" + artistName).on("value", function (snapshot) {
        var ratingCount = snapshot.numChildren();
        var total = 0;
        snapshot.forEach(function (ratingSnapshot) {
            console.log(ratingSnapshot.val().artistRating);
            total = total + parseInt(ratingSnapshot.val().artistRating);
        
        });
    database.ref("/").on("value", function (snapshot) {
            var x = snapshot.val();
            console.log(x);

        for(var i = 0; i < snapshot.length; i++) {
            console.log(snapshot[i]);
        }

        snapshot.forEach(function (z) {
           console.log( z.val());
        })
      
    })


        $("#rating").empty()

        console.log("Average=" + total / ratingCount);
        var aveRating = total / ratingCount;
        console.log(aveRating)
        console.log(ratingCount)
        console.log(total)
        var aveRounded = aveRating.toFixed(2);
        console.log(aveRounded)
        var aveDiv = $("<div>")
        aveDiv.text("Average Rating: " + aveRounded)
        $("#rating").append(aveDiv)

    })
}





