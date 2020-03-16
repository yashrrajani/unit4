/* Project 4 - OOP Game App
 * Phrase.js */

 /**
  * Phrase class that deals with the logistics behind each of the phrases
  *
  * @class Phrase
  */

 class Phrase {

     /**
      *Creates an instance of Phrase in lower case
      * @param {string} phrase - string used for phrase
      * @memberof Phrase
      */

     constructor(phrase) {
        this.phrase = phrase.toLowerCase();
     }
     

     /**
      *
      *Takes a phrase and displays each of its letters onto the screen
      * @memberof Phrase
      */

     addPhraseToDisplay() {
         var $list = $('#phrase').children('ul'); //create variable list for phrase div with ul children

         for (let letter of this.phrase) { //for each letter in the phrase
            if (letter !== ' ') {
               let $letter = $(document.createElement('li')) //create li element
                                       .addClass(`hide letter ${letter}`) //with hide letter class using template literals
                                       .text(letter); //display the letter through text
               $list.append($letter); //append to list
            }
            else { //if a space...
               let $letter = $(document.createElement('li')) //create li element
                                       .addClass('space') //give it a space class name. no template literal needed
                                       .text(' '); //display the space through text
               $list.append($letter); //append to list
            }
         }
     }


     /**
      *
      *Determines whether the index of the guessed letter is greater than 0, meaning it is somewhere in the phrase
      * @param {string} letter - the specific letter that the player guessed
      * @returns {boolean} true or false based on whether the letter is somewhere in the phrase
      * @memberof Phrase
      */

     checkLetter(letter) {
        if (this.phrase.indexOf(letter) >= 0) { //if the guessed letter is somewhere in the phrase
           return true; //return true
        }
        else { 
           return false; //otherwise return false
        }
     }


     /**
      *
      *Displays the letter onto the board by changing the class name to show
      * @param {string} letter
      * @memberof Phrase
      */

     showMatchedLetter(letter) {
         $(`.${letter}`).removeClass('hide').addClass('show'); //remove the hidden class and add the show class
     }
 }