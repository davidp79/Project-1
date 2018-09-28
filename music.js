//input artist/song/album
//need an onclick function when you click the search bar

// var database = firebase.database()

// database.ref("")

function musicDex(e) {
    e.preventDefault();
    alert(1);
    var searchStuff = $("#search-query").val().trim();


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
            $("#services").append('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + vidId + '" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>')
        }
    })
}


//needs different tabs that we can throw things into
//
//need to average the rating with reviews

$("#search").on("click", musicDex)
//firebase needs to record what genre
