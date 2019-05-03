const overlay = document.querySelector('#overlay');
const startGame = document.getElementsByClassName('btn__reset')[0];
const missed = 0;
const qwerty = document.querySelector('qwerty');
const phrase = document.querySelector('phrase');


//** when a user clicks on the start button, the screen overlay is hidden to show gameboard 
startGame.addEventListener('click', () => {
    overlay.style.display = 'none';
}); 
