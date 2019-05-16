const overlay = document.querySelector('#overlay');
const startGame = document.getElementsByClassName('btn__reset')[0];
const missed = 0;
const qwerty = document.querySelector('qwerty');
const phrase = document.querySelector('phrase');

const phrases = [
    'avengers forever',
    'the black panther',
    'tony stark ironman',
    'the incredible hulk',
    'in the endgame now'
];

//** when a user clicks on the start button, the screen overlay is hidden to show gameboard 
startGame.addEventListener('click', () => {
    overlay.style.display = 'none';
}); 

// Note to self: character in the array is referring to the the arr[i] in my programming.. 

/*--------------FUNCTIONS----------------*/ 
//passing the "arr" variable in will make function reusable to pass any array into this function
const getRandomPhraseAsArray = arr => { 
// generating a random number from 1-5 & using that number to access the index of any array
   let randomArray = arr[Math.floor(Math.random() * 5) +1]; 
 // Return a new letter character array for  that split the strings inside the array into a new single line array  
    return randomArray.split('');  
   }

// Passing the phrases array as in argument to the function 
const singleArray = getRandomPhraseAsArray(phrases);

const addPhraseToDisplay = arr =>{
// get ul element from document and store in the variable phraseUl within this arrow expression
    let phraseUl = document.querySelector('#phrase ul');
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
      phraseUl.appendChild(letter); // Step 3
      if (letter.innerHTML !== ' ' ){ // Step 4 
        letter.className = 'letter';
      }else {
        letter.className = 'space';
      }
  }
}
// pass the singleArray const variable into the function to add the phrase array to the game screen
addPhraseToDisplay(singleArray);


const checkLetter = buttonPicked => {
  let letters = document.querySelectorAll('.letter');
  let match = null;
  for (let i = 0; i < letters.length; i += 1){
    if(letters[i].innerText === buttonPicked.innerText){
      letters[i].className = 'show';
      match = true;
    }else{
      letters[i].className = match;
    }
  }
}

checkLetter();


