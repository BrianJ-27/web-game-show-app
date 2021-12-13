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
      "the mighty mjolnir",
      "shang chi",
      "the ten rings"
    ];
  }
}

/*=-=-=-=-=-GAME UI FUNCTION/METHODS=-=-=-=-=-*/
class UI {
  constructor(){
    this.variable = new Variables();
  }
   
  getRandomPhraseAsArray (arr){
    let randomArray = arr[Math.floor(Math.random() * arr.length)];
    let randomPhrase = randomArray.split("");
    return randomPhrase;
  }

   addPhraseToDisplay (arr){
    for (let i = 0; i < arr.length; i += 1) {
      let letter = document.createElement("li");
      letter.innerText = arr[i];
      this.variable.phrase.appendChild(letter);
      letter.innerHTML !== " " ? letter.className = "letter" : letter.className = "space";
    }
  }

  checkLetter (buttonPicked) {
    let btn_match = false;
    for (let i = 0; i < this.variable.letters.length; i += 1) {
      let myLetter = this.variable.letters[i].textContent.toUpperCase();
      let myButton = buttonPicked.textContent.toUpperCase();
      if (myLetter === myButton) {
        this.variable.letters[i].className += " show";
        btn_match = true;
      }
    }
    return btn_match;
  }

  checkWin () {
    if (this.variable.letters.length === this.variable.showClass.length) {
      this.variable.overlay.style.display = "flex";
      this.variable.overlay.className = "win";
      this.variable.startGame.textContent = "Another Round?";
      this.variable.startTitle.textContent = "You Won!";
      this.variable.startTitle.style.marginBottom = "0em";
    } else if (missed >= 5) {
      this.variable.overlay.style.display = "flex";
      this.variable.overlay.className = "lose";
      this.variable.startGame.textContent = "Try Again?";
      this.variable.startTitle.textContent = "Game Over";
      this.variable.startTitle.style.marginBottom = "0em";
    }
  }

  resetGame () {
    missed = 0;
    let tries = document.querySelectorAll(".tries");
    tries.forEach(element => element.className = "tries");
  
    let oldPhraseLetters = document.querySelectorAll("#phrase ul > li");
    oldPhraseLetters.forEach(resetLetter => this.variable.phrase.removeChild(resetLetter));
  
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
  ui.resetGame();
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