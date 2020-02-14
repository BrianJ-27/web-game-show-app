/*-----------------------------------------------------------------------------------------------------*/
//                                        **VARIABLES**                                                //
/*-----------------------------------------------------------------------------------------------------*/
const startGame = document.querySelector(".btn__reset");
const showClass = document.getElementsByClassName("show");
const qwerty = document.querySelector("#qwerty");
const startTitle = document.querySelector(".title");
const overlay = document.querySelector("#overlay");
const letters = document.getElementsByClassName("letter");
let phrase = document.querySelector("#phrase ul");
let missed = 0;
const phrases = [
  "avengers forever",
  "the black panther",
  "tony stark ironman",
  "the incredible hulk",
  "in the endgame now", 
  "the amazing spiderman",
  "thors hammer",
  "the mighty mjolnir"
];

/*-----------------------------------------------------------------------------------------------------*/
//                                        **EVENT LISTENERS**                                      //
/*-----------------------------------------------------------------------------------------------------*/

//** when a user clicks on the start button, the screen overlay is hidden to show gameboard
startGame.addEventListener("click", () => {
  reset();
  overlay.style.display = "none";
  const singleArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(singleArray);
});

qwerty.addEventListener("click", e => {
  let correctButton = e.target;
  if (correctButton.tagName === "BUTTON") {
    correctButton.className = "chosen";
    correctButton.disabled = true;
    const letterFound = checkLetter(correctButton);
    if (letterFound === false) {
      let tries = document.querySelectorAll(".tries");
      let toHide = tries[missed];
      toHide.className += " hidden";
      missed += 1;
    }
  }
  checkWin();
});

/*-----------------------------------------------------------------------------------------------------*/
//                                        **FUNCTIONS**                                                //
/*-----------------------------------------------------------------------------------------------------*/

// Resets the game when button is clicked **This function is called inside the start game listener
const reset = () => {
  missed = 0;
  let tries = document.querySelectorAll(".tries");
  tries.forEach(element => element.className = "tries");

  let oldPhraseLetters = document.querySelectorAll("#phrase ul > li");
  oldPhraseLetters.forEach(resetLetter => phrase.removeChild(resetLetter));

  let keyboardKeys = document.querySelectorAll(".chosen");
  keyboardKeys.forEach(resetKeys => {
    resetKeys.className = resetKeys.className.replace("chosen", "");
    resetKeys.disabled = false;
  });
};

//passing the "arr" variable in will make function reusable to pass any array into this function
const getRandomPhraseAsArray = arr => {
  let randomArray = arr[Math.floor(Math.random() * phrases.length)];
  let randomPhrase = randomArray.split("");
  return randomPhrase; // ["i","n", "", "t",]
};

// function to add random phras to game board
const addPhraseToDisplay = arr => {
  for (let i = 0; i < arr.length; i += 1) {
    let letter = document.createElement("li");
    letter.innerText = arr[i];
    phrase.appendChild(letter);
    letter.innerHTML !== " " ? letter.className = "letter" : letter.className = "space";
  }
};

//** This function will check if the button picked matches the letter in the phrase
const checkLetter = buttonPicked => {
  let btn_match = false;
  for (let i = 0; i < letters.length; i += 1) {
    let myLetter = letters[i].textContent.toUpperCase();
    let myButton = buttonPicked.textContent.toUpperCase();
    if (myLetter === myButton) {
      letters[i].className += " show";
      btn_match = true;
    }
  }
  return btn_match;
};

//** the checkWin function will also be called inside the event listener
const checkWin = () => {
  if (letters.length === showClass.length) {
    overlay.style.display = "flex";
    overlay.className = "win";
    startGame.textContent = "Another Round?";
    startTitle.textContent = "You Won!";
    startTitle.style.marginBottom = "0em";
  } else if (missed >= 5) {
    overlay.style.display = "flex";
    overlay.className = "lose";
    startGame.textContent = "Try Again?";
    startTitle.textContent = "Game Over";
    startTitle.style.marginBottom = "0em";
  }
};



