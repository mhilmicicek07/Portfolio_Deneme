// DOM Elements
const userScoreSpan = document.getElementById("userScore");
const computerScoreSpan = document.getElementById("computerScore");
const resultDiv = document.getElementById("result");
const rockDiv = document.getElementById("rock");
const paperDiv = document.getElementById("paper");
const scissorsDiv = document.getElementById("scissors");
const resetBtn = document.querySelector(".reset");
const scoreBoard = document.querySelector(".score-board");
const choicesDiv = document.querySelector(".choices");
const difficultyBtns = document.querySelectorAll(".difficulty-btn");

// Variables
let userScore = 0;
let computerScore = 0;
let winningScore = 5;

// Konfeti Canvas
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// Konfeti parçacıkları
let confetti = [];
const colors = ["#e74c3c", "#3498db", "#f1c40f", "#2ecc71", "#9b59b6"];

// Konfeti Başlat
const startConfetti = () => {
    confetti = Array.from({ length: 300 }, () => ({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * confettiCanvas.height - confettiCanvas.height,
        r: Math.random() * 6 + 3,
        d: Math.random() * 10 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncrement: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
    }));
    animateConfetti();
    setTimeout(() => confetti = [], 2500);
};

// Konfeti Animasyonu
const animateConfetti = () => {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach(p => {
        p.tiltAngle += p.tiltAngleIncrement;
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
        p.x += Math.sin(0);
        p.tilt = Math.sin(p.tiltAngle) * 15;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();
    });

    if (confetti.length > 0) {
        requestAnimationFrame(animateConfetti);
    }
};

// Random Computer Choice
const getComputerChoice = () => {
    const choices = ["rock", "paper", "scissors"];
    return choices[Math.floor(Math.random() * 3)];
};

// Update Score
const updateScore = (winner, userChoice, computerChoice) => {
    if (winner === "user") {
        userScore++;
        userScoreSpan.textContent = userScore;
        resultDiv.innerHTML = `<span>${userChoice}</span> beats <span>${computerChoice}</span> 🎉`;
    }
    else if (winner === "computer") {
        computerScore++;
        computerScoreSpan.textContent = computerScore;
        resultDiv.innerHTML = `<span>${computerChoice}</span> beats <span>${userChoice}</span> 😢`;
    }
    else {
        resultDiv.innerHTML = `Both chose <span>${userChoice}</span>, It's a Draw 🤝`;
    }
    checkWinner();
};

// Check Winner
const checkWinner = () => {
    if (userScore === winningScore || computerScore === winningScore) {
        const winner = userScore === winningScore ? "You Won the Game! 🏆" : "Computer Wins the Game 😢";
        resultDiv.textContent = winner;
        startConfetti();
        setTimeout(resetGame, 3000);
    }
};

// Game Logic
const game = (userChoice) => {
    const computerChoice = getComputerChoice();
    document.querySelectorAll(".choice").forEach(choice => choice.classList.remove("selected"));
    document.getElementById(userChoice).classList.add("selected");

    switch (userChoice + computerChoice) {
        case "paperrock":
        case "rockscissors":
        case "scissorspaper":
            updateScore("user", userChoice, computerChoice);
            break;

        case "scissorsrock":
        case "paperscissors":
        case "rockpaper":
            updateScore("computer", userChoice, computerChoice);
            break;

        default:
            updateScore("draw", userChoice, computerChoice);
    }
};

// Reset Game
const resetGame = () => {
    userScore = 0;
    computerScore = 0;
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = computerScore;
    resultDiv.textContent = "Game Starts Now!";
    document.querySelectorAll(".choice").forEach(choice => choice.classList.remove("selected"));
};

// Zorluk Seçimi
difficultyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        winningScore = Number(btn.dataset.score);
        document.querySelector(".difficulty-container").classList.add("hidden");
        scoreBoard.classList.remove("hidden");
        choicesDiv.classList.remove("hidden");
        resultDiv.classList.remove("hidden");
        resetBtn.classList.remove("hidden");
    });
});

// Event Listeners
rockDiv.addEventListener("click", () => game("rock"));
paperDiv.addEventListener("click", () => game("paper"));
scissorsDiv.addEventListener("click", () => game("scissors"));
resetBtn.addEventListener("click", resetGame);