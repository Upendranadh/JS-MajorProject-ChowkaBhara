//Dom elements
let deg = 720;
const tokensArray = [
  `oneplayer1`,
  `twoplayer1`,
  `threeplayer1`,
  `fourplayer1`,
  `oneplayer3`,
  `twoplayer3`,
  `threeplayer3`,
  `fourplayer3`,
];
const domelements = {
  rollDice: document.querySelector(".dice_container-text"),
  cube: document.querySelector(".cube"),
  peices: document.querySelectorAll(`.player1`),
  peices: document.querySelectorAll(`.player2`),
  boardContainer: document.querySelector(".content_board_gridContainer"),
  iconContainer: document.querySelector(".content_board_gridContainer--item"),
  diceText: document.querySelector(".dice_container-text"),
};
console.log(domelements.iconContainer);

//State
let state = {
  currentRolledPerson: 1,
  currentdiceValue: 0,
};

// creating a Prototype or BluePrint i.e Class for Players

class Person {
  constructor(state, player, position) {
    this.state = state;
    this.player = player;
    this.currentDice = [];
    this.kills = 0;
    this.currentposition = position;
  }
}

let player1 = new Person({}, 1, { one: 1, two: 1, three: 1, four: 1 });

let player3 = new Person({}, 3, { one: 9, two: 9, three: 9, four: 9 });

/* Logic for rolling dice in the UI*/

// step1:
//Function to generate a Random number
const randomGenerator = () => {
  return Math.floor(Math.random() * 6 + 1);
};

// step2:
//Function to change the Dice face in the UI
let currentClass = "";
const changeDiceSide = (rolledNumber) => {
  domelements.cube.style.transform = ``;
  // console.log(rolledNumber);
  var showClass = "show-" + rolledNumber;
  if (currentClass) {
    domelements.cube.classList.remove(currentClass);
  }
  domelements.cube.classList.add(showClass);
  currentClass = showClass;
};

// step3:
//Function to roll the dice
const rollDice = () => {
  return new Promise((resolve, reject) => {
    let diceValue;
    const stopTimeInterval = setInterval(() => {
      domelements.cube.style.transform = `rotate3d(1, 1, 1,${deg + 1000}deg)`;
      deg += 720;
    }, 1000);
    setTimeout(() => {
      clearInterval(stopTimeInterval);
      diceValue = randomGenerator();
      changeDiceSide(diceValue);
      state.currentdiceValue = diceValue;
      resolve(state.currentdiceValue);
    }, 3000);
  });
};

const updatePlayer = (dice, playerNumber, stepsTobeAdded) => {
  domelements.diceText.textContent = `Player${playerNumber} roll the dice`;
  if (playerNumber === 1) {
    domelements.boardContainer.addEventListener("click", (event) => {
      state.currentRolledPerson = playerNumber;
      console.log(event.target.id);

      //Function to move the player
      let updateToken = (id, className) => {
        let movePosition;
        console.log(id, className);
        let classNameUpdated = className.split(" ");

        // classNameUpdated.forEach((el) => {
        //   document.querySelector(`.${el}`).classList.remove(el);
        // });
        console.log(document.querySelector(`#${id}`).parentNode);
        document
          .querySelector(`#${id}`)
          .parentNode.removeChild(document.querySelector(`#${id}`));

        if (state.currentRolledPerson === 1) {
          console.log(
            document.querySelector(
              `div[id="${
                state.currentdiceValue +
                player1.currentposition[classNameUpdated[0]]
              }"]`
            )
          );
          document
            .querySelector(
              `div[id="${
                state.currentdiceValue +
                player1.currentposition[classNameUpdated[0]]
              }"]`
            )
            .insertAdjacentHTML(
              "beforeEnd",
              `<div class="${classNameUpdated[0]} ${classNameUpdated[1]}"></div>`
            );
        }
      };
      if (tokensArray.includes(`${event.target.id}`))
        updateToken(event.target.id, event.target.className);
      else {
        alert("please select correct token to move");
      }
    });
  }
};

//Event listener for Rolling the dice
domelements.rollDice.addEventListener("click", async () => {
  let dice;
  await rollDice().then((data) => {
    dice = data;
  });
  switch (state.currentRolledPerson) {
    case 1: {
      console.log(dice);
      updatePlayer(dice, 1, 0);
      break;
    }
    case 3: {
      dice = rollDice();
      updatePlayer(dice);
      break;
    }
  }
});

// window.onload = function () {
//   alert("player 1 roll the dice");
// };
