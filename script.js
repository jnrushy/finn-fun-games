// Tic Tac Toe Game
let isCatTurn = true;
let gameActive = true;
let catScore = 0;
let dogScore = 0;
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

const cells = document.querySelectorAll('[data-cell]');
const status = document.getElementById('tictactoe-status');
const catScoreElement = document.getElementById('catScore');
const dogScoreElement = document.getElementById('dogScore');

function initializeTicTacToe() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick);
    });
}

function handleCellClick(e) {
    const cell = e.target;
    
    // Check if the cell is already marked or if the game is not active
    if (cell.classList.contains('cat') || cell.classList.contains('dog') || !gameActive) {
        return;
    }
    
    // Place the mark
    const currentClass = isCatTurn ? 'cat' : 'dog';
    placeMark(cell, currentClass);
    
    // Check for win or draw
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass === 'cat' ? '🐱' : '🐶';
}

function swapTurns() {
    isCatTurn = !isCatTurn;
    status.textContent = isCatTurn ? "🐱 Cat's turn" : "🐶 Dog's turn";
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('cat') || cell.classList.contains('dog');
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        status.textContent = "Draw!";
    } else {
        if (isCatTurn) {
            catScore++;
            catScoreElement.textContent = catScore;
            status.textContent = "🐱 Cats win!";
        } else {
            dogScore++;
            dogScoreElement.textContent = dogScore;
            status.textContent = "🐶 Dogs win!";
        }
    }
}

function resetTicTacToe() {
    cells.forEach(cell => {
        cell.classList.remove('cat', 'dog');
        cell.textContent = '';
    });
    gameActive = true;
    isCatTurn = true;
    status.textContent = "🐱 Cat's turn";
}

// Word Scramble Game
const scrambleWords = [
    'JAVASCRIPT', 'PYTHON', 'PROGRAMMING', 'COMPUTER', 'DEVELOPER',
    'WEBSITE', 'INTERNET', 'KEYBOARD', 'MONITOR', 'SOFTWARE',
    'HARDWARE', 'NETWORK', 'DATABASE', 'SECURITY', 'ALGORITHM'
];

let scrambleScore = 0;
let currentScrambledWord = '';
let currentWord = '';

const scrambledWordElement = document.getElementById('scrambled-word');
const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-button');
const scrambleStatus = document.getElementById('scramble-status');
const scrambleScoreElement = document.getElementById('scrambleScore');

function scrambleWord(word) {
    const letters = word.split('');
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters.join('');
}

function startNewScramble() {
    currentWord = scrambleWords[Math.floor(Math.random() * scrambleWords.length)];
    currentScrambledWord = scrambleWord(currentWord);
    scrambledWordElement.textContent = currentScrambledWord;
    guessInput.value = '';
    scrambleStatus.textContent = 'Guess the word!';
    guessInput.focus();
}

function checkGuess() {
    const guess = guessInput.value.trim().toUpperCase();
    if (guess === currentWord) {
        scrambleScore++;
        scrambleScoreElement.textContent = scrambleScore;
        scrambleStatus.textContent = 'Correct!';
        setTimeout(startNewScramble, 1500);
    } else {
        scrambleStatus.textContent = 'Try again!';
    }
}

guessButton.addEventListener('click', checkGuess);
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkGuess();
});

// Spanish Translation Game
const spanishWords = [
    { spanish: 'HOLA', english: 'HELLO' },
    { spanish: 'ADIOS', english: 'GOODBYE' },
    { spanish: 'GRACIAS', english: 'THANK YOU' },
    { spanish: 'POR FAVOR', english: 'PLEASE' },
    { spanish: 'SÍ', english: 'YES' },
    { spanish: 'NO', english: 'NO' },
    { spanish: 'BUENOS DÍAS', english: 'GOOD MORNING' },
    { spanish: 'BUENAS NOCHES', english: 'GOOD NIGHT' },
    { spanish: 'AGUA', english: 'WATER' },
    { spanish: 'PAN', english: 'BREAD' }
];

let spanishScore = 0;
let currentSpanishWord = '';

const spanishWordElement = document.getElementById('spanish-word');
const translationInput = document.getElementById('translation-input');
const translationButton = document.getElementById('translation-button');
const spanishStatus = document.getElementById('spanish-status');
const spanishScoreElement = document.getElementById('spanishScore');

function startNewSpanishWord() {
    const wordPair = spanishWords[Math.floor(Math.random() * spanishWords.length)];
    currentSpanishWord = wordPair.spanish;
    spanishWordElement.textContent = currentSpanishWord;
    translationInput.value = '';
    spanishStatus.textContent = 'What is this word in English?';
    translationInput.focus();
}

function checkTranslation() {
    const guess = translationInput.value.trim().toUpperCase();
    const correctAnswer = spanishWords.find(pair => pair.spanish === currentSpanishWord).english;
    
    if (guess === correctAnswer) {
        spanishScore++;
        spanishScoreElement.textContent = spanishScore;
        spanishStatus.textContent = 'Correct!';
        setTimeout(startNewSpanishWord, 1500);
    } else {
        spanishStatus.textContent = 'Try again!';
    }
}

translationButton.addEventListener('click', checkTranslation);
translationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkTranslation();
});

// Rock Paper Scissors Game
let playerScore = 0;
let computerScore = 0;

const rpsStatus = document.getElementById('rps-status');
const rpsResult = document.getElementById('rps-result');
const playerScoreElement = document.getElementById('playerScore');
const computerScoreElement = document.getElementById('computerScore');
const rpsChoices = document.querySelectorAll('.rps-choice');

function handleRPSChoice(e) {
    const playerChoice = e.target.dataset.choice;
    const computerChoice = getComputerChoice();
    
    const result = getRPSResult(playerChoice, computerChoice);
    updateRPSDisplay(playerChoice, computerChoice, result);
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

function getRPSResult(player, computer) {
    if (player === computer) return 'tie';
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }
    return 'lose';
}

function updateRPSDisplay(player, computer, result) {
    const emojis = {
        rock: '✊',
        paper: '✋',
        scissors: '✌️'
    };
    
    rpsResult.textContent = `You: ${emojis[player]} vs Computer: ${emojis[computer]}`;
    
    if (result === 'win') {
        playerScore++;
        playerScoreElement.textContent = playerScore;
        rpsStatus.textContent = 'You win! 🎉';
    } else if (result === 'lose') {
        computerScore++;
        computerScoreElement.textContent = computerScore;
        rpsStatus.textContent = 'Computer wins! 🤖';
    } else {
        rpsStatus.textContent = "It's a tie! 🤝";
    }
}

function initializeRPS() {
    rpsChoices.forEach(choice => {
        choice.addEventListener('click', handleRPSChoice);
    });
}

// Hangman Game
const hangmanWords = [
    'JAVASCRIPT', 'PYTHON', 'PROGRAMMING', 'COMPUTER', 'DEVELOPER',
    'WEBSITE', 'INTERNET', 'KEYBOARD', 'MONITOR', 'SOFTWARE'
];

let hangmanScore = 0;
let currentHangmanWord = '';
let guessedLetters = new Set();
let remainingGuesses = 6;

const wordDisplay = document.getElementById('word-display');
const hangmanStatus = document.getElementById('hangman-status');
const hangmanScoreElement = document.getElementById('hangmanScore');
const keyboard = document.getElementById('keyboard');
const hangmanFigure = document.getElementById('hangman-figure');

function initializeHangman() {
    createKeyboard();
    startNewHangman();
}

function startNewHangman() {
    currentHangmanWord = hangmanWords[Math.floor(Math.random() * hangmanWords.length)];
    guessedLetters.clear();
    remainingGuesses = 6;
    updateWordDisplay();
    updateHangmanFigure();
    hangmanStatus.textContent = 'Guess the word!';
    resetKeyboard();
}

function updateWordDisplay() {
    wordDisplay.textContent = currentHangmanWord
        .split('')
        .map(letter => guessedLetters.has(letter) ? letter : '_')
        .join(' ');
}

function createKeyboard() {
    keyboard.innerHTML = '';
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
        const key = document.createElement('button');
        key.className = 'key';
        key.textContent = letter;
        key.addEventListener('click', () => handleLetterGuess(letter, key));
        keyboard.appendChild(key);
    });
}

function resetKeyboard() {
    const keys = keyboard.querySelectorAll('.key');
    keys.forEach(key => {
        key.classList.remove('used');
        key.disabled = false;
    });
}

function handleLetterGuess(letter, keyElement) {
    if (guessedLetters.has(letter) || remainingGuesses <= 0) return;

    guessedLetters.add(letter);
    keyElement.classList.add('used');
    keyElement.disabled = true;

    if (currentHangmanWord.includes(letter)) {
        updateWordDisplay();
        if (!wordDisplay.textContent.includes('_')) {
            hangmanScore++;
            hangmanScoreElement.textContent = hangmanScore;
            hangmanStatus.textContent = 'You won! 🎉';
            setTimeout(startNewHangman, 2000);
        }
    } else {
        remainingGuesses--;
        updateHangmanFigure();
        if (remainingGuesses === 0) {
            hangmanStatus.textContent = `Game Over! The word was ${currentHangmanWord}`;
            setTimeout(startNewHangman, 2000);
        }
    }
}

function updateHangmanFigure() {
    const parts = [
        'head', 'body', 'left-arm', 'right-arm', 'left-leg', 'right-leg'
    ];
    hangmanFigure.innerHTML = '';
    for (let i = 0; i < 6 - remainingGuesses; i++) {
        const part = document.createElement('div');
        part.className = `hangman-part ${parts[i]}`;
        hangmanFigure.appendChild(part);
    }
}

// State Capitals Trivia Game
const stateCapitals = [
    { state: 'Alabama', capital: 'Montgomery', abbreviation: 'AL' },
    { state: 'Alaska', capital: 'Juneau', abbreviation: 'AK' },
    { state: 'Arizona', capital: 'Phoenix', abbreviation: 'AZ' },
    { state: 'Arkansas', capital: 'Little Rock', abbreviation: 'AR' },
    { state: 'California', capital: 'Sacramento', abbreviation: 'CA' },
    { state: 'Colorado', capital: 'Denver', abbreviation: 'CO' },
    { state: 'Connecticut', capital: 'Hartford', abbreviation: 'CT' },
    { state: 'Delaware', capital: 'Dover', abbreviation: 'DE' },
    { state: 'Florida', capital: 'Tallahassee', abbreviation: 'FL' },
    { state: 'Georgia', capital: 'Atlanta', abbreviation: 'GA' },
    { state: 'Hawaii', capital: 'Honolulu', abbreviation: 'HI' },
    { state: 'Idaho', capital: 'Boise', abbreviation: 'ID' },
    { state: 'Illinois', capital: 'Springfield', abbreviation: 'IL' },
    { state: 'Indiana', capital: 'Indianapolis', abbreviation: 'IN' },
    { state: 'Iowa', capital: 'Des Moines', abbreviation: 'IA' }
];

let triviaScore = 0;
let currentQuestion = null;

const triviaQuestion = document.getElementById('trivia-question');
const triviaOptions = document.getElementById('trivia-options');
const triviaStatus = document.getElementById('trivia-status');
const triviaScoreElement = document.getElementById('triviaScore');

function initializeTrivia() {
    startNewTriviaQuestion();
}

function startNewTriviaQuestion() {
    // Randomly choose between asking for capital or abbreviation
    const questionType = Math.random() < 0.5 ? 'capital' : 'abbreviation';
    currentQuestion = stateCapitals[Math.floor(Math.random() * stateCapitals.length)];
    
    // Create the question text
    triviaQuestion.textContent = `What is the ${questionType} of ${currentQuestion.state}?`;
    
    // Generate options
    const correctAnswer = currentQuestion[questionType];
    const options = generateOptions(correctAnswer, questionType);
    
    // Display options
    displayOptions(options, correctAnswer);
    
    triviaStatus.textContent = 'Choose your answer!';
}

function generateOptions(correctAnswer, questionType) {
    const options = [correctAnswer];
    
    // Get other possible answers
    const otherAnswers = stateCapitals
        .map(state => state[questionType])
        .filter(answer => answer !== correctAnswer);
    
    // Shuffle and get 3 random wrong answers
    while (options.length < 4) {
        const randomAnswer = otherAnswers[Math.floor(Math.random() * otherAnswers.length)];
        if (!options.includes(randomAnswer)) {
            options.push(randomAnswer);
        }
    }
    
    // Shuffle the options
    return options.sort(() => Math.random() - 0.5);
}

function displayOptions(options, correctAnswer) {
    triviaOptions.innerHTML = '';
    
    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option, correctAnswer));
        triviaOptions.appendChild(button);
    });
}

function checkAnswer(selectedAnswer, correctAnswer) {
    const buttons = triviaOptions.querySelectorAll('.option');
    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.add('correct');
        } else if (button.textContent === selectedAnswer && selectedAnswer !== correctAnswer) {
            button.classList.add('incorrect');
        }
    });

    if (selectedAnswer === correctAnswer) {
        triviaScore++;
        triviaScoreElement.textContent = triviaScore;
        triviaStatus.textContent = 'Correct! 🎉';
    } else {
        triviaStatus.textContent = `Incorrect! The answer was ${correctAnswer}`;
    }

    setTimeout(startNewTriviaQuestion, 2000);
}

// Initialize games
document.addEventListener('DOMContentLoaded', () => {
    initializeTicTacToe();
    initializeRPS();
    initializeHangman();
    initializeTrivia();
    startNewScramble();
    startNewSpanishWord();
});

// Restart buttons
document.querySelectorAll('.restart-button').forEach(button => {
    button.addEventListener('click', () => {
        const game = button.dataset.game;
        switch (game) {
            case 'tictactoe':
                resetTicTacToe();
                break;
            case 'hangman':
                startNewHangman();
                break;
            case 'rps':
                playerScore = 0;
                computerScore = 0;
                playerScoreElement.textContent = '0';
                computerScoreElement.textContent = '0';
                rpsStatus.textContent = 'Choose your move!';
                rpsResult.textContent = '';
                break;
            case 'trivia':
                startNewTriviaQuestion();
                break;
            case 'scramble':
                startNewScramble();
                break;
            case 'spanish':
                startNewSpanishWord();
                break;
        }
    });
}); 