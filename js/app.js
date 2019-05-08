const overlay = document.querySelector('#overlay');
const startGame = document.getElementsByClassName('btn__reset')[0];
const missed = 0;
const qwerty = document.querySelector('qwerty');
const phrase = document.querySelector('phrase');
const phraseArray = getRandomPhraseAsArray(phrases);
const phrases = [
    'a dog walked to the park',
    'the boy ran outside the house',
    'Each man ran beyond the marker',
    'four goats ate grass today',
    'The dog walked to the park'
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
 // Return a new character array that split the strings inside the array into a new single line array  
    return randomArray.split();  
   }
// Passing the phrases array as in argument to the function 
getRandomPhraseAsArray(phrases);

function addPhraseToDisplay(arr){
    // do stuff any arr that is passed in, and add to `#phrase ul`
    let phraseUl = document.querySelector('#phrase ul');
    for(let i = 0; i < arr.length; i += 1) {
      let li = document.createElement('li');
      li.textContent = arr[i];
      phraseUl.appendChild(li);
      if (arr[i] == ' '){
        li.classList.add('letter');
      }else {
        li.classList.add('space');
      }
  }
}

addPhraseToDisplay(phraseArray);



