/* Globala variabler */
const storyElement = document.getElementById("story");
const choiceButtonsElement = document.getElementById("choice-btns");

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

function showChoice(choice) {
  return choice.requiredState == null || choice.requiredState(state)
}

function selectChoice(choice) {
  const nextTextNodeId = choice.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }

state = Object.assign(state, choice.setState)
showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    story: "Detta är en textbaserad interaktiv upplevelse. För att lösa mysteriet i svampskogen måste du tänka utanför boxen och använda din fantasi! Är du redo?",
    choice: [
      {
        text: "Challenge accepted!",
        nextText: 2,
      }
    ]
  },
  {
    id: 2,
    story: "Det är en mulen november eftermiddag och du är i svampskogen och du har plockat en hel korg med kantareller. Plötsligt får du syn på en röd flugsvamp, vad gör du? ",
    choice: [
      {
        text: "Plocka upp flugsvampen",
        setState: { flugsvamp: true },
        nextText: 3,
      },
      {
        text: "Usch, flugsvamp är giftigt. Gå vidare",
        setState: { flugsvamp: false },
        nextText: 3,
      }
    ]
  },
  {
    id: 3,
    story: "På vägen ut från skogen så får du syn på den största kantarellen du någonsin sett! Du går närmare och ser att det ligger en sprillans ny Macbok Air med M1 chip brevid, För att plocka upp ett objekt måste du byta bort din flugsvamp.",
    choice: [
      {
        text: "Kasta flugsvampen och ta Macbook Air",
        requiredState: (currentState) => currentState.flugsvamp,
        setState: { flugsvamp: false, macbook: true },
        nextText: 4,
      },
      {
        text: "Kasta flugsvampen och ta kantarellen",
        requiredState: (currentState) => currentState.flugsvamp,
        setState: { flugsvamp: false, kantarell: true },
        nextText: 4,
      },
      {
        text: "Du plockade inte upp flugsvampen och måste därför gå vidare utan kantarellen eller macbook",
        nextText: 4,
      }
    ]
  },
  {
  id: 4,
  text: "Det börjar bli mörkt och du lämnar svampskogen. Du måste skynda dig hem innan solen går ner för då kommer alla zombies. På andra sidan vägen ser du en elektronisk sparkcykel, vad gör du?",
  choice: [
    {
      text: "Ta sparkcykeln och åk hem",
      nextText: 5,
    },
    {
      text: "Eftersom att du hatar sparkcyklar så välter du den och svär högt",
      nextText: 6,
    },
    {
      text: "Du börjar springa för att du vet att du måste hinna hem innan du blir tagen av en zombie",
      nextText: 7,
    },
  ],
},




]