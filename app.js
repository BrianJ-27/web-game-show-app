const startGame = document.getElementsByClassName('btn__reset')[0];
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

//** when a user clicks on the start button, the screen overlay is hidden to show gameboard 
startGame.addEventListener('click', () => {
  reset();  
  overlay.style.display = 'none';
  overlay.style.transition = '1.0s';
  // Passing the phrases array as in argument to the function 
  const singleArray = getRandomPhraseAsArray(phrases);
  // pass the singleArray const variable into the function to add the phrase array to the game screen
  addPhraseToDisplay(singleArray);
}); 


// Note to self: character in the array is referring to the the arr[i] in my programming.. 

/*-----------------------------------------------------------------------------------------------------*/ 
//                                        **FUNCTIONS**
/*-----------------------------------------------------------------------------------------------------*/
const reset = () => {
  let tries = document.querySelectorAll('.tries');
    tries.forEach((element) =>{
    element.style.display = 'inline';
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
// get ul element from document and store in the variable phraseUl within this arrow expression
    
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

//The checkLetter function will be used inside of the event listener you’ll write in the next step.
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
  return btn_match;
}

const showClass = document.getElementsByClassName('show');

const checkWin = () => {
  if(letters.length === showClass.length){
    overlay.style.display = 'flex';
    overlay.className = 'win';
    startGame.textContent = 'Another Round ?';
  }else if (missed >= 5) {
    overlay.style.display = 'flex';
    overlay.className = 'lose';
    startGame.textContent = 'Try Again?';
  }
};

//Get the 
const qwerty = document.querySelector('#qwerty');

qwerty.addEventListener('click', e => {
  let correctButton = e.target;
  if(correctButton.tagName === 'BUTTON'){
   correctButton.className = 'chosen';
   correctButton.disabled = true;
   const  letterFound = checkLetter(correctButton);
    if (letterFound === false){
          let tries = document.querySelectorAll("li[style='display:inline']");
          let toHide = tries[tries.length -1];
          toHide.style.display = 'none';
          missed += 1;  
   }
  }
  checkWin(); 
});



