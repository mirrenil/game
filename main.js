/* Globala variabler */
const storyElement = document.getElementById("story");
const choiceButtonsElement = document.getElementById("choice-buttons");

/* håller koll på vilka objekt spelaren har */
let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}
/* ser till att vi hamnar på rätt fråga baserat på vilket val man gör */
/* while/for each loop för att ta bort alternativen och ha olika alternativ beroende på vilket state man är i */ 
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  storyElement.innerText = textNode.text;
  while (choiceButtonsElement.firstChild) {
    choiceButtonsElement.removeChild(choiceButtonsElement.firstChild);
  }

  textNode.choice.forEach((choice) => {
    if (showChoice(choice)) {
      const button = document.createElement("button");
      button.innerText = choice.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectChoice(choice));
      choiceButtonsElement.appendChild(button);
    }
  });
}
