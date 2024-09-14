let numberToGuess;
let maxAttempts;
let score;
let maxScore;
let attempts = 0;
let playerName = '';
let difficulty = 'easy';

// Initialize the game
function initGame() {
    playerName = document.getElementById('playerName').value;
    difficulty = document.getElementById('difficulty').value;
    attempts = 0;

    if (difficulty === 'easy') {
        numberToGuess = Math.floor(Math.random() * 10) + 1;
        maxAttempts = Infinity;  // Unlimited attempts
        maxScore = 50;
    } else if (difficulty === 'medium') {
        numberToGuess = Math.floor(Math.random() * 50) + 1;
        maxAttempts = 10;
        maxScore = 100;
    } else if (difficulty === 'hard') {
        numberToGuess = Math.floor(Math.random() * 100) + 1;
        maxAttempts = 5;
        maxScore = 150;
    }

    score = maxScore;
    document.getElementById('message').innerText = '';
    document.getElementById('hint').innerText = '';
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('guessInput').value = '';
}

// Provide a hint based on the number
function provideHint() {
    let hintMessage = '';
    if (numberToGuess % 2 === 0) {
        hintMessage = 'Hint: The number is even.';
    } else {
        hintMessage = 'Hint: The number is odd.';
    }

    for (let i = 2; i < 10; i++) {
        if (numberToGuess % i === 0) {
            hintMessage += ` Also, it is divisible by ${i}.`;
            break;
        }
    }
    document.getElementById('hint').innerText = hintMessage;
}

// Handle guess submission
document.getElementById('submitGuess').addEventListener('click', function () {
    const guess = parseInt(document.getElementById('guessInput').value);
    attempts++;

    if (isNaN(guess)) {
        document.getElementById('message').innerText = 'Please enter a valid number.';
        return;
    }

    if (guess < numberToGuess) {
        document.getElementById('message').innerText = 'Too low! Try again.';
    } else if (guess > numberToGuess) {
        document.getElementById('message').innerText = 'Too high! Try again.';
    } else {
        document.getElementById('message').innerText = `Congratulations, ${playerName}! You guessed it in ${attempts} attempts! Final score: ${score}.`;
        return;
    }

    score -= 5;
    document.getElementById('score').innerText = `Score: ${score}`;

    if (attempts % 3 === 0) {
        provideHint();
    }

    if (attempts >= maxAttempts && maxAttempts !== Infinity) {
        document.getElementById('message').innerText = `Game Over! The correct number was ${numberToGuess}. Final score: ${score}.`;
    }
});

// Handle game restart
document.getElementById('restartGame').addEventListener('click', function () {
    initGame();
});

// Initialize the game when the page loads
window.onload = initGame;
