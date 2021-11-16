/* Globala variabler */
const storyElement = document.getElementById("text");
const choiceButtonsElement = document.getElementById("choice-buttons");

/* håller koll på vilka objekt spelaren har */
let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}
