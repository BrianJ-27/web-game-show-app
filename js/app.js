/*=-=-=-=-=-GLOBAL VARIABLES & CLASS FOR ALL VARIABLES =-=-=-=-=-*/
let missed = 0;
class Variables {
  constructor(){
    this.startGame = document.querySelector(".btn__reset");
    this.showClass = document.getElementsByClassName("show");
    this.qwerty = document.querySelector("#qwerty");
    this.startTitle = document.querySelector(".title");
    this.overlay = document.querySelector("#overlay");
    this.letters = document.getElementsByClassName("letter");
    this.phrase = document.querySelector("#phrase ul");
    this.phrases = [
      "avengers forever",
      "the black panther",
      "tony stark ironman",
      "the incredible hulk",
      "in the endgame now", 
      "the amazing spiderman",
      "thors hammer",
      "the mighty mjolnir"
    ];
  }
}

/*=-=-=-=-=-GAME UI FUNCTION/METHODS=-=-=-=-=-*/
class UI {
  getRandomPhraseAsArray (arr){
    let randomArray = arr[Math.floor(Math.random() * arr.length)];
    let randomPhrase = randomArray.split("");
    return randomPhrase;
  }

   addPhraseToDisplay (arr){
    for (let i = 0; i < arr.length; i += 1) {
      const variable = new Variables();
      let letter = document.createElement("li");
      letter.innerText = arr[i];
      variable.phrase.appendChild(letter);
      letter.innerHTML !== " " ? letter.className = "letter" : letter.className = "space";
    }
  }

  checkLetter (buttonPicked) {
    const variable = new Variables();
    let btn_match = false;
    for (let i = 0; i < variable.letters.length; i += 1) {
      let myLetter = variable.letters[i].textContent.toUpperCase();
      let myButton = buttonPicked.textContent.toUpperCase();
      if (myLetter === myButton) {
        variable.letters[i].className += " show";
        btn_match = true;
      }
    }
    return btn_match;
  }

  checkWin () {
    const variable = new Variables();
    if (variable.letters.length === variable.showClass.length) {
      variable.overlay.style.display = "flex";
      variable.overlay.className = "win";
      variable.startGame.textContent = "Another Round?";
      variable.startTitle.textContent = "You Won!";
      variable.startTitle.style.marginBottom = "0em";
    } else if (missed >= 5) {
      variable.overlay.style.display = "flex";
      variable.overlay.className = "lose";
      variable.startGame.textContent = "Try Again?";
      variable.startTitle.textContent = "Game Over";
      variable.startTitle.style.marginBottom = "0em";
    }
  }

  reset () {
    const variable = new Variables();
    missed = 0;
    let tries = document.querySelectorAll(".tries");
    tries.forEach(element => element.className = "tries");
  
    let oldPhraseLetters = document.querySelectorAll("#phrase ul > li");
    oldPhraseLetters.forEach(resetLetter => variable.phrase.removeChild(resetLetter));
  
    let keyboardKeys = document.querySelectorAll(".chosen");
    keyboardKeys.forEach(resetKeys => {
      resetKeys.className = resetKeys.className.replace("chosen", "");
      resetKeys.disabled = false;
    });
  }
}

/*=-=-=-=-=-EVENT LISTENERS=-=-=-=-=-*/
document.querySelector(".btn__reset").addEventListener("click", () => {
  const ui = new UI();
  const variable = new Variables();
  ui.reset();
  variable.overlay.style.display = "none";
  const addRandomPhrase = ui.getRandomPhraseAsArray(variable.phrases);
  ui.addPhraseToDisplay(addRandomPhrase);
});

document.querySelector("#qwerty").addEventListener('click', (e) =>{
  const ui = new UI();
  let correctButton = e.target;
  if (correctButton.tagName === "BUTTON") {
    correctButton.className = "chosen";
    correctButton.disabled = true;
    const letterFound = ui.checkLetter(correctButton);
    if (letterFound === false) { 
      let tries = document.querySelectorAll(".tries");
      let toHide = tries[missed];
      toHide.className += " hidden";
      missed += 1;
    }
    ui.checkWin();
  } 
});