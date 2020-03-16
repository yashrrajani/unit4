/* Project 4 - OOP Game App
 * Game.js */

 /**
  * Class that deals with the game logistics and screen display
  *
  * @class Game
  */

 class Game {

     /**
      *Creates an instance of Game.
      * @param {int} missed is the number of missed words
      * @param {string} phrases are contained inside an array of phrases
      * @param {Object} activePhrase the phrase object being handled
      * @memberof Game
      */

     constructor(missed, phrases, activePhrase) {
         this.missed = 0;
         this.phrases = ['yash rajani', 'jacob baer', 'mr ostrom', 'coding is fun'];
         this.activePhrase = null;
         this.started = false;
         $("#win").hide();
         $("#lose").hide();
     }


     /**
      * function that starts the game by hiding the final screen overlay and win or lose images
      * this function also creates a new phrase object called activePhrase and adds a random phrase to screen display
      * finally, it sets the "started" component of the game equal to true
      * @memberof Game
      */

     startGame() { //function that starts the game
        $('#overlay').hide();
        $("#win").hide();
        $("#lose").hide();
        this.activePhrase = new Phrase(this.getRandomPhrase());
        this.activePhrase.addPhraseToDisplay();
        this.started = true;
     }



     /**
      * function that uses logistical math and reasoning to get a random phrase from the array of phrases
      * @returns {string} a string that is one of the phrases in the phrases array
      * @memberof Game
      */

     getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
     }



     /**
      * this function checks if the key or selected letter matches a letter in the phrase
      * once it determines if the letter is correct, it plays a unique audio file and checks for a win
      * if all the letters are chosen and displayed, then it will call the gameOver function
      * @param {string} letter
      * @param {Object} key
      * @memberof Game
      */

     handleInteraction(letter, key) {
        $(key).prop("disabled", true);
        if (this.activePhrase.checkLetter(letter)) {
            let audioElement = document.createElement('audio');
            audioElement.setAttribute('src', "Sound effect 01-AudioClip Congratulation.mp3"); //correct answer audio
            audioElement.play();
            this.activePhrase.showMatchedLetter(letter);
            key.addClass("chosen");
            if (this.checkForWin()) {
                this.gameOver();
            }
        }
        else {
            let audioElement = document.createElement('audio');
            audioElement.setAttribute('src', "The Boo! You Suck! Sound Effect - UPDATED (1).mp3"); //incorrect answer audio
            audioElement.play();
            key.addClass("wrong");
            this.removeLife();
        }
     }

    /**
     * Removes the lives that are displayed on the screen by changing the source of life images
     * If the number of misses equals 5, then it triggers the gameOver function
     * @memberof Game
     */

    removeLife() {
        let timesWrong = 0;

        $(".tries").each(function(i,item) {
            if ($(item).children().attr("src") == "images/liveHeart.png" && timesWrong < 1) {
                $(item).children().attr("src", "images/lostHeart.png");
                timesWrong++;
            }
        });

        this.missed +=1
        if (this.missed >= 5) {
            this.gameOver();
        }
    }


     /**
      * Takes in all of the hidden letters that have class name hide
      * If the number of hidden letters is zero, then return true, meaning that the user won the game
      * Otherwise keep the users playing by returning false
      * @returns {boolean} true or false based on whether there are no more hidden letters
      * @memberof Game
      */

     checkForWin() {
        let $hiddenLetter = $(".hide");
        if ($hiddenLetter.length == 0) {
            return true;
        }
        return false;
     }


     /**
      * If the user won the game, then show the winner text display and display the winning image with fadeIn animation
      * Also, if the user loses the game, then add the losing text display and losing image with fadeIn animation
      * It also resets the game board and display
      * @memberof Game
      */

     gameOver(){
        if(this.checkForWin()){
            $("#overlay").show();
            $("#overlay").removeClass("start").removeClass("lose");
            $("#overlay").addClass("win");
            $("#overlay").children("h1").text("You are so incredibly brilliant! Great work!");
            $("#win").fadeIn(3000);
        }
        else {
            $("#overlay").show();
            $("#overlay").removeClass("start").removeClass("lose");
            $("#overlay").addClass("lose");
            $("#overlay").children("h1").text("Unfortunately, you were not smart enough. Try again!");
            $("#lose").fadeIn(3000);
        }
        this.resetGame();
    }


    /**
     * Function that removes the wrong class and sets the children array to empty
     * Restarts the missed number of letter counter
     * For each of the lives, set the hearts back to alive hearts
     * Set the started attribute to false until startGame restarts the game board
     * @memberof Game
     */

    resetGame() {
        $(".key").removeClass("chosen").removeClass("wrong").prop("disabled",false);
        $("#phrase").children("ul").empty()
        this.missed = 0;
        $(".tries").each( function(i,item){
        $(item).children("img").attr("src","images/liveHeart.png");
        });
        this.started = false;
       
    }
 }