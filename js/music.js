//input artist/song/album
//need an onclick function when you click the search bar

// var database = firebase.database()

// database.ref("")

$(".submit").on("click", function(event){
    event.preventDefault();
    musicDex();
})

function musicDex() {

    alert(1);
    var searchStuff = $("#search").val().trim();
console.log(searchStuff)

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
            $("#youtube").append('<iframe width="500" height="315" src="https://www.youtube.com/embed/' + vidId + '" frameborder="100" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
        }
    })
}


//needs different tabs that we can throw things into
//
//need to average the rating with reviews

//firebase needs to record what genre
