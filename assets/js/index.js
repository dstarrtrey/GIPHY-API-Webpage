$(document).ready(function(){
    const topics = ["Blade Runner", "Blade Runner 2049", "Battlestar Gallactica", "Star Wars", "Star Trek TNG", "Altered Carbon", "Black Mirror", "Interstellar", "Ex Machina", "Avengers", "The Matrix", "Terminator", "Mad Max", "I, Robot", "Snowpiercer"];
    topics.forEach(topic => {
        $("#btn-collection").append($("<button>").text(topic).val(topic).addClass("topic-btn"));
    });
    const newGif = (rating, url) => {
        const gifElement = $("<div>").addClass("gif-element");
        const gifRating = $("<div>").text("Rating: "+rating.toUpperCase()).addClass("rating");
        const gif = $("<img>").attr("src", url).addClass("gif-img paused");
        $("#gif-collection").append(gifElement.append(gif, gifRating));
    }
    $(".topic-btn").on("click", function(){
        $.ajax({
            url:`https://api.giphy.com/v1/gifs/search?q=${this.value}&api_key=NzFSyDo9wgOybNvbdlUoqAwHtAINPDtx&limit=10`,
            method: "GET"
        }).then(function(response){
            console.log(response.data);
            $("#gif-collection").empty();
            response.data.forEach(element => {
                newGif(element.rating, element.images.original_still.url);
            });
            $(".gif-img").on("click", function(){
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
    });
});