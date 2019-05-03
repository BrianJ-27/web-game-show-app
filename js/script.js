const qwerty = document.querySelector('qwerty');
const phrase = document.querySelector('phrase');
const missed = 0;
const startButton = document.getElementsByClassName('btn_reset');

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';
})