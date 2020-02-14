/*-----------------------------------------------------------------------------------------------------*/ 
//                                        **VARIABLES**                                                //
/*-----------------------------------------------------------------------------------------------------*/
const startGame = document.getElementsByClassName('btn__reset')[0];
const startTitle = document.querySelector('.title');
const overlay = document.querySelector('#overlay');
const letters = document.getElementsByClassName('letter');
let phrase = document.querySelector('#phrase ul');
let missed = 0;
const phrases = [
    'avengers forever',
    'the black panther',
    'tony stark ironman',
    'the incredible hulk',
    'in the endgame now',
];

/*-----------------------------------------------------------------------------------------------------*/ 
//                                        **START GAME LISTENER**                                      //
/*-----------------------------------------------------------------------------------------------------*/

//** when a user clicks on the start button, the screen overlay is hidden to show gameboard 
startGame.addEventListener('click', () => {

  //resets the game board when the start button is clicked. It will reset whether the player wins or loses
  reset();  
  // hides the overlay screen and shows the game
  overlay.style.display = 'none';

  // Passing the phrases array as in argument to the function 
  const singleArray = getRandomPhraseAsArray(phrases);

  // pass the singleArray const variable into the function to add the phrase array to the game screen
  addPhraseToDisplay(singleArray);
}); 


// Note to self: character in the array is referring to the the arr[i] in my programming.. 

/*-----------------------------------------------------------------------------------------------------*/ 
//                                        **FUNCTIONS**                                                //
/*-----------------------------------------------------------------------------------------------------*/

// Resets the game when button is clicked **This function is called inside the start game listener
const reset = () => {
    missed = 0;
    let tries = document.querySelectorAll('.tries');
    tries.forEach((element) =>{
      element.className = 'tries';
  })

  let oldPhraseLetters = document.querySelectorAll('#phrase ul > li');
  for (let i = 0; i< oldPhraseLetters.length; i++){
    phrase.removeChild(oldPhraseLetters[i]);
  }

  let keyboardKeys = document.querySelectorAll('.chosen');
  for (let i=0; i < keyboardKeys.length; i++){
    keyboardKeys[i].className = keyboardKeys[i].className.replace('chosen', '');
    keyboardKeys[i].disabled = false;
  }
}

//passing the "arr" variable in will make function reusable to pass any array into this function
const getRandomPhraseAsArray = arr => { 
// generating a random number from 0-4 & using that number to access the index of any array
   let randomArray = arr[Math.floor((Math.random() * phrases.length))]; 
 // Return a new letter character array for that split the strings inside the array into a new single line array 
  let randomPhrase = randomArray.split('');
    return randomPhrase  // ["i","n", "", "t",]
   }

const addPhraseToDisplay = arr =>{
/* loop through an array and execute the following tasks: 
    1) create a list element for each array character
    2) each array character/letter & space is being assigned or placed into each newly created li element
    3) we then append/ add the newly created li element to the DOM 
    4) we test to see if the content with the li element is not equal to a space. If true then we add the className "letter" to the li element and its accompanying styles
       if it test to false then we apply the className "space" to the li element along with its accompanying styles 
*/    
    for (let i = 0; i < arr.length; i += 1) {
      let letter = document.createElement('li'); // Step 1
      letter.innerText = arr[i]; // Step 2
      phrase.appendChild(letter); // Step 3
      if (letter.innerHTML !== ' ' ){ // Step 4 
        letter.className = 'letter';
      }else {
        letter.className = 'space';
      }
  }
}

//** The checkLetter function will be used inside of the event listener you’ll write in the next step.
const checkLetter = buttonPicked => {
// should get all of the elements with a class of “letter” which was defined at the top of script
  let btn_match = false;
/*The function should loop over the letters and check if they match the letter in 
the button the player has chosen.*/
  for (let i = 0; i < letters.length; i += 1){
    if(letters[i].textContent.toUpperCase() === buttonPicked.textContent.toUpperCase()){
        letters[i].className += ' show';
        btn_match = true;
    }
  }
  // returns a boolean value of true or false
  return btn_match;
}

// Gets all elements with a class name of 'show' and assigns it the variable showClass
const showClass = document.getElementsByClassName('show');

//** the checkWin function will also be called inside the event listener
const checkWin = () => {
  //compare the length of the li characters in the array to the length of shown/correct letters in the phrase
  if(letters.length === showClass.length){
    overlay.style.display = 'flex';
    overlay.className = 'win';
    startGame.textContent = 'Another Round?';
    startTitle.textContent = 'You Won!';
    startTitle.style.marginBottom = '0em';
  //However if the user does not guess the right answer the 5th time, the user loses and the lose overlay is shown   
  }else if (missed >= 5) {
    overlay.style.display = 'flex';
    overlay.className = 'lose';
    startGame.textContent = 'Try Again?';
    startTitle.textContent = 'Game Over';
    startTitle.style.marginBottom = '0em';
  }
};


/*-----------------------------------------------------------------------------------------------------*/ 
//                                        **EVENT QUERTY BUTTON LISTENER**                                          //
/*-----------------------------------------------------------------------------------------------------*/
//Get the div element with the id of "qwerty" and assign it const variable "qwerty"
const qwerty = document.querySelector('#qwerty');

qwerty.addEventListener('click', e => {
  let correctButton = e.target;
  if(correctButton.tagName === 'BUTTON'){
   correctButton.className = 'chosen';
   correctButton.disabled = true;
   const  letterFound = checkLetter(correctButton);
    if (letterFound === false){
    /*gets the node lists of li elements with the class name of "tries" and assigns them 
          to the variable of tries */
          let tries = document.querySelectorAll('.tries');   
    /* missed variable is assinged the value of 0 which would grab the first heart on the 
          gameboard and assigns it to the variable of toHide */         
          let toHide = tries[missed];
    // the first indexed item gets the className of "hidden" which has the display property of hide      
          toHide.className += ' hidden';
     /*adds/increments the missed value by 1 so when the player clicks another wrong answer and it 
          will then be set to the next indexed item */    
          missed += 1;  
   }
  }
  checkWin(); 
});



