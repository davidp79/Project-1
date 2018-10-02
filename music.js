//input artist/song/album
//need an onclick function when you click the search bar

//var database = firebase.database()

//database.ref("")

// $("#search").on("click", musicDex);

var config = {
    apiKey: "AIzaSyBJkVP_S8z8NCq0nWluCifA-H2eaId7BUY",
    authDomain: "project-1-in-class.firebaseapp.com",
    databaseURL: "https://project-1-in-class.firebaseio.com",
    projectId: "project-1-in-class",
    storageBucket: "",
    messagingSenderId: "1024436223043"
};


var artistName
var artistRating


firebase.initializeApp(config);
var database = firebase.database();


$(document).ready(function () {
    $('.parallax').parallax();
});



$(".submit").on("click", function (event) {

    event.preventDefault(); 
    musicDex();

//  $("#youtube").empty();
//     $("#genius").empty();
//     $("#rating").empty();
   
   

})


function musicDex() {

    var searchStuff = $("#search").val().trim();

    function rating() {
        for (i = 0; i < 5; i++) {
            var starButton = $("<button>");
            starButton.addClass("star");
            starButton.attr("data-number", i + 1);
            starButton.attr("data-artist", searchStuff);
            starButton.append("<i class='far fa-star'></i>");
            console.log(starButton)
            $("#rating").append(starButton)

        }


        $(".star").on("click", function () {
            var artistRating = $(this).attr("data-number");
            console.log(artistRating);
            var artistName = $(this).attr("data-artist");
            console.log(artistName)

            database.ref("/ratings/" + artistName).push({

                artistRating: artistRating,

            })


        })
        // database.ref("/ratings/"+artistName).on("child_added",function(snapshot) {
        //     console.log(snapshot.val())
        // })
    }
    rating();
    updateRating(artistName);

    $.ajax({
        url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q="
            + searchStuff + "&key=AIzaSyDTmuq2U1iwoNN7IDwnuJdPTClXjSUQc-o",
        method: 'GET'
    }).then(function (response) {
        $("#youtube").empty();
        $("#genius").empty();
        $("#rating").empty();
       
        // console.log(response.items)
        for (i = 0; i < 5; i++) {
            if (response.items[i].id.kind === "youtube#channel") {
                continue
            }


            var vidId = response.items[i].id.videoId
            // console.log(vidId);
            $("#youtube").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + vidId + '" frameborder="100" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
        }
    })

    $.ajax({
        url: "https://api.genius.com/search?q=" + searchStuff +
            "&access_token=A3QFPk4RZGxV8fgT_41uiJiCAeyXq-UhJ-xnxipOkgZSHnShtSRVdesaqTR8axQS",
        method: 'GET'
    }).then(function (response) {

        // console.log(response);

        var artist = response.response.hits[0].result.primary_artist.api_path

        // console.log(artist);

        $.ajax({
            url: "https://api.genius.com" + artist +
                "/?access_token=A3QFPk4RZGxV8fgT_41uiJiCAeyXq-UhJ-xnxipOkgZSHnShtSRVdesaqTR8axQS" +
                "&text_format=html",
            method: 'GET'
        }).then(function (response) {
            var artistName = response.response.artist.name;
            $("#artist-name").html("<h5>" + artistName + "</h5>");
            var bioPic = $("<div>");
            bioPic.addClass("card-image");
            var img = $("<img>");
            var x = response.response;
            img.attr("src", x.artist.image_url);
            bioPic.append(img);
            $("#genius-biopic").prepend(bioPic);
            // console.log(x.artist.name);
            // console.log(x.artist.alternate_names);
            var name = x.artist.alternate_names;
            console.log(name);
            var moreName = $("<span>");
            moreName.addClass("card-title");
            moreName.text("Nicknames: ");
            for (var i = 0; i < name.length; i++) {
                moreName.append(name[i] + ", ");
            }
            $("#genius-biopic").append(moreName)

            var describe = x.artist.description.html;
            // console.log(describe)
            var bio = $("<div>");
            bio.append(describe);
            $("#genius").append(bio);

        })

    })




    function topTrack() {
        $.ajax({
            url: "https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=4eb509c03c98813c8a254fc061a34193&format=json",
            method: 'GET'
        }).then(function (response) {
            // console.log(response);
        })
    }

}

function topArtist() {
    $.ajax({
        url: "http://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=4eb509c03c98813c8a254fc061a34193&format=json",
        method: 'GET'
    }).then(function (response) {

        // console.log(response.artists.artist[0].name);
        $("#youtube").empty();
        $("#genius").empty();
        $("#rating").empty();
       

        var ol = $("<ol>")
        $("#list").append(ol)

        for (var i = 0; i < 10; i++) {

            var button = $("<button>");
            button.addClass("btn teal");
            button.attr("id", "toplist");
            button.html("<li class='list' data-artist=" + response.artists.artist[i].name + "> " + response.artists.artist[i].name + " </li>");
            ol.append(button);
            
           
        }


    })
}



topArtist();

$(document).on("click", ".list", function () {

   

  
    $("#rating").empty();

    var liLink = $(this).data("artist");
    function rating() {
        for (i = 0; i < 5; i++) {
            var starButton = $("<button>");
            starButton.addClass("star");
            starButton.attr("data-number", i + 1);
            starButton.attr("data-artist", liLink);
            starButton.append("<i class='far fa-star'></i>");
            console.log(starButton)
            $("#rating").append(starButton)

        }


        $(".star").on("click", function () {
            var artistRating = $(this).attr("data-number");
            console.log(artistRating);
            var artistName = $(this).attr("data-artist");
            console.log(artistName)

            
            database.ref("/ratings/" + artistName).push({

                artistRating: artistRating,

            })
            //      database.ref("/ratings/"+artistName).on("child_added",function(snapshot) {
            //     // console.log(snapshot.val())
            //     console.log(snapshot.val().artistRating)
            // })
            updateRating(artistName)
        })
    }
    rating();
    $.ajax({

        url: "https://api.genius.com/search?q=" + liLink +
            "&access_token=A3QFPk4RZGxV8fgT_41uiJiCAeyXq-UhJ-xnxipOkgZSHnShtSRVdesaqTR8axQS",
        method: 'GET'
    }).then(function (response) {

        // console.log(response);

        var artist = response.response.hits[0].result.primary_artist.api_path

        // console.log(artist);



        $.ajax({
            url: "https://api.genius.com" + artist +
                "/?access_token=A3QFPk4RZGxV8fgT_41uiJiCAeyXq-UhJ-xnxipOkgZSHnShtSRVdesaqTR8axQS" +
                "&text_format=html",
            method: 'GET'
        }).then(function (response) {
            $("#genius").empty();
            
            var bioPic = $("<div>");
            var img = $("<img>");
            var x = response.response;
            img.attr("src", x.artist.image_url);
            bioPic.append(img);
            $("#genius").prepend(bioPic);
            // console.log(x.artist.name);
            // console.log(x.artist.alternate_names);
            var name = x.artist.alternate_names;
            var moreName = $("<div>");
            moreName.append(name);
            $("#genius").append(moreName)

            var describe = x.artist.description.html;
            // console.log(describe)
            var bio = $("<div>");
            bio.append(describe);
            $("#genius").append(bio);

            $.ajax({
                url: "https://www.googleapis.com/youtube/v3/search?part=snippet&q="
                    + liLink + "&key=AIzaSyDTmuq2U1iwoNN7IDwnuJdPTClXjSUQc-o",
                method: 'GET'
            }).then(function (response) {


                

$("#youtube").empty();
                // console.log(response.items)
                for (i = 0; i < 5; i++) {
                    if (response.items[i].id.kind === "youtube#channel") {
                        continue
                    }
                    var vidId = response.items[i].id.videoId
                    // console.log(vidId);
                    $("#youtube").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + vidId + '" frameborder="100" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
                }
            })

        })
    })

})

// function updateRating(artistName){
// database.ref("/ratings/"+artistName).once("value",function(snapshot){
//     console.log(snapshot.val().artistRating)
// })}

function updateRating(artistName) {
    database.ref("/ratings/" + artistName).on("value", function (snapshot) {
        var ratingCount = snapshot.numChildren();
        var total = 0;
        snapshot.forEach(function (ratingSnapshot) {
               console.log(ratingSnapshot.val().artistRating);
               total += parseInt(ratingSnapshot.val().artistRating);
         
        });
        $("#rating").empty()

        console.log("Average=" + total / ratingCount);
        var aveRating = total/ratingCount;
        console.log(aveRating)
        console.log(ratingCount)
        console.log(total)
        var aveRounded = aveRating.toFixed(2);
        console.log(aveRounded)
        var aveDiv = $("<div>")
        aveDiv.text("Average Rating: "+aveRounded)
        $("#rating").append(aveDiv)
    })
};