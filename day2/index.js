//Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
const fs = require("fs");

let content = fs.readFileSync("input.txt", "utf-8").split("\n");

//content = fs.readFileSync("example.txt", "utf-8").split("\n");

/**
 * @param {string} numberString
 */
function getNumber(numberString) {
  return parseInt(numberString.replace(/\D/g, ""));
}

/**
 * @param {string} gameString
 * @param {string} color
 * @returns {number}
 */
function getCubeNumber(gameString, color) {
  return gameString.split(/;/).reduce(
    (max, set) =>
      Math.max(
        set
          .split(/,/)
          .reduce(
            (subsetSum, subset) =>
              subset.includes(color)
                ? subsetSum + getNumber(subset)
                : subsetSum,
            0
          ),
        max
      ),
    0
  );
}

let sum = 0;

function partOne() {
  content.forEach((line, index) => {
    line = line.split(": ")[1];
    const game = {
      index: index + 1,
      maxBlue: getCubeNumber(line, "blue"),
      maxRed: getCubeNumber(line, "red"),
      maxGreen: getCubeNumber(line, "green"),
    };
    if (game.maxRed <= 12 && game.maxGreen <= 13 && game.maxBlue <= 14) {
      sum += game.index;
    }
  });
  console.log(sum);
}

function partTwo() {
  content.forEach((line, index) => {
    line = line.split(": ")[1];
    const game = {
      index: index + 1,
      maxBlue: getCubeNumber(line, "blue"),
      maxRed: getCubeNumber(line, "red"),
      maxGreen: getCubeNumber(line, "green"),
    };
    sum += game.maxBlue * game.maxRed * game.maxGreen;
  });
  console.log(sum);
}

partTwo();
