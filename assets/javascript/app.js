$(document).ready(function () {

    var topics = [];

    function displayShow() {
        var x = $(this).data("search");
        console.log(x);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=I5brWCQE6ftUAyfyZwaBia07EzwaF2qM";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var showDiv = $("<div class='col-md-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                showImage.attr("src", staticSrc);
                showImage.addClass("giphy");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#placeGifHere").prepend(showDiv);

            }
        });
    };

    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-warning">');
            a.attr("id", "show");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        };
    }

    $("#addShow").on("click", function (event) {
        event.preventDefault();
        var newShow = $("#showInput").val().trim();
        topics.push(newShow);
        console.log(topics);
        $("#showInput").val('');
        displayButtons();
    });

    displayButtons();
    $(document).on("click", "#show", displayShow);
    $(document).on("click", ".giphy", pausePlayGifs);

    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});