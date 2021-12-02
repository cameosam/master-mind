// Mastermind Simple Strategy - JavaScript

// Determine the number of winning combinations per number of rounds
// Red = correct position and correct value
// White = incorrect position and correct value

// Winning combinations per # of rounds: 1,4,25,108,305,602,196,49,6,0
// Total: 7471, Expected: 5.764660493827161

function compare(guess, answer) {
  let tempAnswer = [...answer];
  let red = 0;
  let white = 0;
  for (let i = 0; i < guess.length; i++) {
    let position = tempAnswer.indexOf(guess[i]);
    if (position == -1) {
      continue;
    } else if (position == i || guess[position] == tempAnswer[position]) {
      red += 1;
    } else {
      white += 1;
    }
    tempAnswer[position] = -1;
  }
  return [red, white];
}

function filterPossComb(currGuess, redAns, whiteAns, possibleCombinations) {
  const badCombinations = [];
  for (let i = 0; i < possibleCombinations.length; i++) {
    [redPoss, whitePoss] = compare(currGuess, possibleCombinations[i]);
    if (redPoss != redAns || whitePoss != whiteAns) {
      badCombinations.push(possibleCombinations[i]);
    }
  }
  return possibleCombinations.filter((comb) => !badCombinations.includes(comb));
}

function start() {
  let numComToWin = new Array(10).fill(0);
  let total = 0;
  const allCombinations = [];

  for (let a = 0; a < 6; a++) {
    for (let b = 0; b < 6; b++) {
      for (let c = 0; c < 6; c++) {
        for (let d = 0; d < 6; d++) {
          allCombinations.push([a, b, c, d]);
        }
      }
    }
  }

  for (let i = 0; i < allCombinations.length; i++) {
    let possibleCombinations = [...allCombinations];
    let currGuess = possibleCombinations[0];
    let guess_number = 0;
    while (currGuess != allCombinations[i]) {
      guess_number += 1;
      [red, white] = compare(currGuess, allCombinations[i]);
      if (red != 4) {
        possibleCombinations = filterPossComb(
          currGuess,
          red,
          white,
          possibleCombinations
        );
        currGuess = possibleCombinations[0];
      }
    }
    numComToWin[guess_number] += 1;
    total += guess_number + 1;
  }
  console.log("Winning combinations per # of rounds: " + numComToWin);
  console.log(
    "Total: " + total + " Expected: " + total / allCombinations.length
  );
}

start();
