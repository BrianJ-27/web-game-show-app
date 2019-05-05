const overlay = document.querySelector('#overlay');
const startGame = document.getElementsByClassName('btn__reset')[0];
const missed = 0;
const qwerty = document.querySelector('qwerty');
const phrase = document.querySelector('phrase');
const gamePhrases = [
    'a dog walked to the park',
    'the boy ran outside the house',
    'Each man ran beyond the marker',
    'four gotas ate grass today',
    'The dog walked to the park'
];

//** when a user clicks on the start button, the screen overlay is hidden to show gameboard 
startGame.addEventListener('click', () => {
    overlay.style.display = 'none';
}); 



const getRandomPhraseAsArray = arr => {
   let randomNmbr = Math.floor(Math.random() * 6);
    return arr[randomNmbr]
   }


