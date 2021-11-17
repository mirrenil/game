// Globala variabler
const storyElement = document.getElementById("story");
const choiceButtonsElement = document.getElementById("choice-btns");

/*Spela/pausa musiken på sidan*/
function audioToggle() {
  const audio = document.querySelector("audio");
  const paused = audio.paused;
  const playStart = document.querySelector("material-icons");
  if (paused) {
    audio.play();
    playStart.style.color = "white";
  } else {
    audio.pause();
    playStart.style.color = "grey";
  }
}

/* håller koll på vilket Property spelaren har */
let property = {};

function letsBegin() {
  property = {};
  showTextNode(1);
}
/* ser till att vi hamnar på rätt fråga baserat på vilket val man gör */
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  storyElement.innerText = textNode.text;
  while (choiceButtonsElement.firstChild) {
    choiceButtonsElement.removeChild(choiceButtonsElement.firstChild);
  }
  /* while/for each loop för att ta bort alternativen och ha olika alternativ beroende på vilken property man har */
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
  return choice.requiredProperty == null || choice.requiredProperty(property);
}
/* Om du svarar fel så kommer du tillbaka till index 0 och får starta om*/
function selectChoice(choice) {
  const nextTextNodeId = choice.nextText;
  if (nextTextNodeId <= 0) {
    return letsBegin();
  }
  /*Beroende på vilken property du har så får du olika val*/
  property = Object.assign(property, choice.setProperty);
  showTextNode(nextTextNodeId);
}

/* Frågor och svarsalternativ */
const textNodes = [{
    id: 1,
    text: "Detta är en textbaserad interaktiv upplevelse. För att lösa mysteriet i svampskogen måste du tänka utanför boxen och använda din fantasi! Är du redo?",
    choice: [{
      text: "Challenge accepted!",
      nextText: 2,
    }, ],
  },
  {
    id: 2,
    text: "Det är en mulen november eftermiddag och du är i svampskogen och du har plockat en hel korg med kantareller. Plötsligt får du syn på en röd flugsvamp, vad gör du? ",
    choice: [{
        text: "Plocka upp flugsvampen",
        setProperty: {
          flugSvamp: true
        },
        nextText: 3,
      },
      {
        text: "Usch, flugsvamp är giftigt. Gå vidare",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text: "På vägen ut från skogen så får du syn på den största kantarellen du någonsin sett! Du går närmare och ser att det ligger en sprillans ny Macbok Air med M1 chip brevid, För att plocka upp ett objekt måste du byta bort din flugsvamp.",
    choice: [{
        text: "Kasta flugsvampen och ta Macbook Air",
        requiredProperty: (currentProperty) => currentProperty.flugSvamp,
        setProperty: {
          flugSvamp: false,
          macbookAir: true
        },
        nextText: 4,
      },
      {
        text: "Kasta flugsvampen och ta kantarellen",
        requiredProperty: (currentProperty) => currentProperty.flugSvamp,
        setProperty: {
          flugSvamp: false,
          kantarell: true
        },
        nextText: 4,
      },
      {
        text: "Du plockade inte upp flugsvampen och måste därför gå vidare utan kantarellen eller macbook",
        nextText: 4,
      },
    ],
  },
  {
    id: 4,
    text: "Det börjar bli mörkt och du lämnar svampskogen. Du måste skynda dig hem innan solen går ner för då kommer alla zombies. På andra sidan vägen ser du en elektronisk sparkcykel, vad gör du?",
    choice: [{
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
  {
    id: 5,
    text: "Du har ingen täckning på mobilen och kan inte låsa upp sparkcykeln, du börjar gå hem när du plötsligt blir biten i nacken av en zombie",
    choice: [{
      text: "Bättre lycka nästa gång",
      nextText: -1,
    }, ],
  },
  {
    id: 6,
    text: 'Du börjar gå hem och du märker att du inte är ensam, det är någon som förföljer dig! Det är din granne som har blivit en zombie "Ahhhhhhh ta inte mig, ta mina kantareller istället!!',
    choice: [{
      text: "Kasta kantareller på zombien",
      nextText: 11,
    }, ],
  },
  {
    id: 7,
    text: "På vägen hem så stöter du på en zombie",
    choice: [{
        text: "Försök att fly",
        nextText: 8,
      },
      {
        text: "Kasta flugsvampen på zombien",
        requiredProperty: (currentProperty) => currentProperty.flugSvamp,
        nextText: 9,
      },
      {
        text: "Muta zombien med din nya Macbook Air",
        requiredProperty: (currentProperty) => currentProperty.macbookAir,
        nextText: 10,
      },
      {
        text: "Kasta kantareller på zombien",
        requiredProperty: (currentProperty) => currentProperty.kantarell,
        nextText: 11,
      },
    ],
  },
  {
    id: 8,
    text: "Ditt försök att fly är omöjligt, du blir ett enkelt byte för zombien.",
    choice: [{
      text: "Bättre lycka nästa gång",
      nextText: -1,
    }, ],
  },
  {
    id: 9,
    text: "Din pajas, trodde du verkligen att en flugsvamp skulle döda zombien?",
    choice: [{
      text: "Bättre lycka nästa gång",
      nextText: -1,
    }, ],
  },
  {
    id: 10,
    text: "Zombien skrattar åt dig, tar din Macbook Air och skonar dig",
    choice: [{
      text: "Du blev av med min nya Macbook Air men överlevde, grattis!!",
      requiredProperty: (currentProperty) => currentProperty.macbookAir,
      nextText: -1,
    }, ],
  },
  {
    id: 11,
    text: "Du kastade kantareller på zombien och zombien fick en allergiskreaktion. Plötsligt börjar zombien brinna och du tar din svampkorg och går hem och levde lyckligt i alla sina dagar.",
    choice: [{
      text: "Wohooo grattis!!! Vill du spela igen?",
      nextText: -1,
    }, ],
  },
];

/*Startar spelet*/
letsBegin();