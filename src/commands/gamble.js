const embedService = require("../services/embedService");
const rngService = require("../services/rngService");
import { UserModule, BetModule } from "../models";
const outcomes = require("./config/gamble.json");

const gamble = async (msg, args) => {
  const user = await UserModule.findOrCreateByDiscordId(msg.author.id);
  let value = parseInt(args[0]);
  if (args[0] === "all") value = user.balance;
  let message;
  if (value > 0) {
    if (value <= user.balance) {
      const outcome = rngService.getRandomInt(0, 1);
      if (outcome === 0) {
        const winnings = Math.ceil(value * 0.99);
        user.balance += winnings;
        const outcomeMessage = rngService.getRandomArrayIndex(outcomes["win"]);
        message = [
          `${outcomeMessage} **You won!**`,
          `You earned **${winnings}** Tsushobucks.`,
          `Your new balance is **${user.balance}**.`,
        ].join("\n\n");
      } else {
        user.balance -= value;
        const outcomeMessage = rngService.getRandomArrayIndex(outcomes["loss"]);
        message = [
          `${outcomeMessage} **You lost.**`,
          `You lost **${value}** Tsushobucks.`,
          `Your new balance is **${user.balance}**.`,
        ].join("\n\n");
      }
      await user.save().catch((err) => {
        console.error(err);
        return;
      });
      await BetModule.Bet
        .create({
          userId: user.id,
          outcome,
          amount: outcome === 0 ? Math.ceil(value * 0.99) : value,
        })
        .catch((err) => {
          console.error(err);
          return;
        });
    } else {
      message = "You can't bet more Tsushobucks than you have.";
    }
  } else {
    message = "You didn't enter a valid amount.";
  }
  return embedService.embedMessage(msg, args, message);
};

const execute = (msg, args) => {
  gamble(msg, args);
}

const commandTemplate = {
  name: "gamble",
  description: "See if you can win some Tsushobucks quick.",
  execute: execute
}

export {
  commandTemplate
}