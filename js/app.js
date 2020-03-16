 /* Project 4 - OOP Game App
 * app.js */

var game = new Game();

($("#btn__reset")).click(function(event) {
    game.startGame()
});



$(".key").click(function(event) {
    game.handleInteraction($(event.target).text(),$(event.target))
});

$("body").keyup(function(event){
    if(game.started) {
        game.handleInteraction(event.key,$(`.key:contains('${event.key}')`))
    }
});