function Letter(letter) {
    this.letter = letter;

    var test = this.letter.toUpperCase();
    test = test.charCodeAt();

    if (test >= 65 && test <= 90) {
        this.guessCheck = false;
    } else {
        this.guessCheck = true;
    }

    this.guessed = function() {
        if (!this.guessCheck) {
            return "_";
        } else {
            return this.letter;
        }
    };

    this.checking = function(guess) {
        if (guess === this.letter.toUpperCase()) {
            this.guessCheck = true;
            return true;
        } else {
            return false;
        }
    }
};

module.exports = Letter;
