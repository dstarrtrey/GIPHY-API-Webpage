$(document).ready(function(){
    const topics = ["Blade Runner", "Blade Runner 2049", "Battlestar Galactica", "Star Wars", "Star Trek: The Next Generation", "Altered Carbon", "Black Mirror", "Interstellar", "Ex Machina", "Avengers", "The Matrix", "Terminator", "Mad Max", "I, Robot", "Snowpiercer"];
    topics.forEach(topic => {
        $("#btn-collection").append($("<button>").text(topic).val(topic).addClass("topic-btn"));
    });
    const newGif = (rating, url) => {
        const gifElement = $("<div>").addClass("gif-element");
        const gifRating = $("<div>").text("Rating: "+rating.toUpperCase()).addClass("rating");
        const gif = $("<img>").attr("src", url).addClass("gif-img paused");
        $("#gif-collection").append(gifElement.append(gif, gifRating));
    };
    const fill = input => {
        $("#gif-collection").empty();
        input.data.forEach(element => {
            newGif(element.rating, element.images.original_still.url);
        });
    };
    const addMovieData = value =>{
        $("#movie-data").empty();
        const poster = $("<img>").attr("src",value.Poster).addClass("poster");
        const name = $("<h1>").text(value.Title);
        const yearGenre = $("<h3>").text(`(${value.Year}) Genre: ${value.Genre}`);
        const plot = $("<p>").text(value.Plot);
        $("#movie-data").append(poster, name, yearGenre, plot);
    }
    $("#search").submit(function(event){
        const searchText = $("#search-text").val();
        event.preventDefault();
        if(!topics.includes(searchText)){
            topics.push(searchText);
            $("#btn-collection").append($("<button>").text(searchText).val(searchText).addClass("topic-btn"));
        }
    });
    $(document).on("click", ".topic-btn", async function(){
        const movieReq = $.ajax({
            url: `https://www.omdbapi.com/?apikey=trilogy&t=${this.value}`,
            method: "GET"
        });
        const gifReq = $.ajax({
            url:`https://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=NzFSyDo9wgOybNvbdlUoqAwHtAINPDtx&limit=10`,
            method: "GET"
        });
        const [movie, gif] = await Promise.all([movieReq, gifReq]);
        addMovieData(movie);
        fill(gif);
    });
    $(document).on("click", ".gif-img", function(){
        if($(this).hasClass("paused")){
            $(this).addClass("playing").removeClass("paused");
            let src = this.src;
            src = src.substring(0, src.length-6)+'.gif';
            this.src = src;
        }else{
            $(this).addClass("paused").removeClass("playing");
            this.src = this.src.substring(0, this.src.length-4)+'_s.gif';
        }
    }); 
});