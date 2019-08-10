var Letter = require("./Letter.js");

function Word(word) {
    var objWord = word.split("");
    var wordArray = [];
    objWord.forEach(function(element) {
        var letter = new Letter(element);
        wordArray.push(letter);
    });

    this.stringWord = word;
    this.word = wordArray;

    this.display = function() {
        var display = [];
        this.word.forEach(function(element) {
            display.push(element.guessed());
        })
        return ("\n" + display.join(" ") + "\n");
    }

    this.update = function(letter) {
        var correct = false;
        this.word.forEach(function(element) {
            if (element.checking(letter)) {
                correct = true;
            }
            return correct;
        });
    };
};

module.exports = Word;