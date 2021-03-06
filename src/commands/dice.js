const embedService = require("../services/embedService");
const DiceGame = require("./classes/Dice").Dice;

const config = require("./config/dice.json");
const colorsConfig = require("../config/constants/colors.json");

const embedMessage = (msg, args) => {
  let dice = new DiceGame(config, msg);

  // We do not want the game to continue before the "cooldown"
  if (DiceGame.hasStartedYet === false) {
    return embedService.embed(msg, args, {
      description: `The game has not started yet!`,
      color: colorsConfig.black,
      // should use global color
    });
  }

  // Perform a new roll
  let result = dice.roll();

  // Once we hit the points requirement, the game restarts
  // We will print the game contributors, sorted by their accumulated points in the current round
  let messageHeader = "";
  let totalPoints = DiceGame.points;

  if (DiceGame.gameFinished === true) {
    messageHeader = DiceGame.getContributors();
    DiceGame.restartGame();
  }

  return embedService.embed(msg, args, {
    description: `${messageHeader}` +
      `Total points: ${totalPoints} / ${dice.pointsRequired}\n\n` +
      `Your numbers: ${dice.diceRolls}\n` +
      `Rolled **${result.message}**: +${result.points} points`,
    color: result.color,
  });
};

const execute = (msg, args) => {
  embedMessage(msg, args);
}

const commandTemplate = {
  name: "dice",
  description: "Dice 10000 played differently.",
  execute: execute
}

export {
  commandTemplate
}
