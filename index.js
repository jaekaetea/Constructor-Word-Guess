var inquirer = require("inquirer");
var Word = require("./Word.js");

//Good Movies
var words = ["Jurassic Park", "Eternal Sunshine of the Spotless Mind", "Mr. Nobody", "The Matrix", "Windstruck",
"My Sassy Girl", "Harry Potter", "Lord of the Rings"];

var green = "\x1b[47m";
var red = "\x1b[31m";
var white = "\x1b[37m";
//console.log("\x1b[32m", "?", "\x1b[37m", "Guess a letter!");

var guessedLetters = [];
var guesses = 10;
var word;

function start() {
    guessedLetters = [];
    guesses = 10;

    word = words[Math.floor(Math.random() * words.length)];
    word = new Word(word);
    console.log(word.display());

    game();
}

console.log("Welcome to Constructor Word Guess \n\n");
start();

function game() {
    inquirer
    .prompt([
        {
            name: "gL",
            message: "Guess a letter!",
            validate: function(input) {
                if (input.length != 1) {
                    console.log("\n\nPlease enter only one character.\n\n");
                    return false;
                } else {
                    input = input.toUpperCase();
                    if (input.charCodeAt() >= 65 && input.charCodeAt() <= 90) {
                        return true;
                    } else {
                        console.log("\n\nPlease enter a valid letter.\n\n");
                        return false;
                    }
                }
            }
        }
    ])
    .then(function(input) {
        var previous = word.display();
        var input = input.gL.toUpperCase();
        if (guessedLetters.includes(input)) {
            console.log("\nYou already guessed " + input + "!\n");
            console.log(word.display());
        } else {
            guessedLetters.push(input);
            //console.log(guessedLetters);
            word.update(input);
            var now = word.display();

            console.log(word.display());

            if (previous === now) {
                guesses--;
                console.log("\nINCORRECT!!!");
                console.log("\nGuesses left: " + guesses + ".\n");
            } else {
                console.log("\nCORRECT!!!\n");
            }
        }

        if (!(word.display().includes("_"))) {
            console.log("You got it right! Next word!\n");
            start();
        } else if (guesses === 0) {
            console.log("You lose.\n\n");
            again();
        } else {
            game();
        }
    });
}

function again() {
    inquirer
    .prompt([
        {
            type: "list",
            name: "again",
            message: "Do you wanna build a snow. . .*ahem* Do you want to play again?",
            choices: ["Yes, I love this!", "No, I hate fun."]
        }
    ]).then(function(input) {
        if (input.again.includes("Yes")) {
            start();
        } else {
            console.log("\n\nSee you Space Cowboy!");
        }
    });
};

