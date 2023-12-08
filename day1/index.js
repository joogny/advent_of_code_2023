const fs = require("fs");

const content = fs.readFileSync("input.txt", "utf-8").split("\n");

/** * @param {string} char */
function isNumber(char) {
  return !isNaN(char);
}

function partOne() {
  let result = 0;
  content.forEach((line) => {
    const numbers = line.split("").filter((char) => isNumber(char));
    const calib_value = numbers[0] + numbers[numbers.length - 1];
    result += parseInt(calib_value);
  });
  console.log(result);
}

const stringToNumberMap = new Map([
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);
function getRegex() {
  const numbersString = Array.from(stringToNumberMap.keys());
  const numbersInteger = Array.from(stringToNumberMap.values());
  return new RegExp(
    "(?=(" + numbersString.join("|") + ")|" + numbersInteger.join("|") + ")(.)",
    "g"
  );
}

const regex = getRegex();
function getLineNumbers(line) {
  let numbers = [];
  //we have to use a loop cause .match cannot be used to find overlapping strings like "eight" and "two" in "eightwo"
  while ((match = regex.exec(line)) !== null) {
    numbers.push(match[1] || match[2]);
  }
  return numbers;
}
function partTwo() {
  let result = 0;
  content.forEach((line) => {
    let numbers = getLineNumbers(line);
    numbers = numbers.map((x) => (isNumber(x) ? x : stringToNumberMap.get(x)));
    const calibrationValue = parseInt(
      numbers[0] + "" + numbers[numbers.length - 1]
    );
    result += calibrationValue;
  });
  console.log(result);
}

partTwo();
