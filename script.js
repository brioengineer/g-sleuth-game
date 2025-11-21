document.addEventListener('DOMContentLoaded', () => {
    const levels = [
        {
            challenge: "Find an email from your colleague, 'sender@example.com'.",
            answer: "from:sender@example.com",
            hint: "Use the 'from:' operator to specify the sender."
        },
        {
            challenge: "Find files with the exact phrase 'Q4 Project Plan' in the title.",
            answer: 'subject:"Q4 Project Plan"',
            hint: "Use quotes for exact phrases and the 'subject:' operator for titles."
        },
        {
            challenge: "Find a chat message that contains 'update' but NOT the word 'meeting'.",
            answer: "update -meeting",
            hint: "Use the minus sign (-) to exclude a word."
        },
        {
            challenge: "Find calendar events from 'organizer@example.com' that are about 'review' OR 'sync'.",
            answer: "from:organizer@example.com (review OR sync)",
            hint: "Use parentheses and the 'OR' keyword to search for multiple terms."
        },
        {
            challenge: "Find presentations about 'marketing strategy' shared before 2023.",
            answer: "marketing strategy before:2023-01-01 type:presentation",
            hint: "Combine 'before:' with a date and 'type:presentation'."
        },
        {
            challenge: "Find documents that have a PDF file attached.",
            answer: "has:attachment filename:pdf",
            hint: "Use 'has:attachment' and 'filename:' to search for attachments of a certain type."
        },
        {
            challenge: "Find emails sent to 'contact@example.com' that are unread.",
            answer: "to:contact@example.com is:unread",
            hint: "Combine the 'to:' operator with 'is:unread'."
        }
    ];

    let currentLevel = 0;
    let score = 0;

    const levelNumberEl = document.getElementById('level-number');
    const totalLevelsEl = document.getElementById('total-levels');
    const scoreEl = document.getElementById('score');
    const challengeTextEl = document.getElementById('challenge-text');
    const hintTextEl = document.getElementById('hint-text');
    const answerInput = document.getElementById('answer-input');
    const submitBtn = document.getElementById('submit-btn');
    const feedbackTextEl = document.getElementById('feedback-text');
    const gameAreaEl = document.getElementById('game-area');
    const gameOverEl = document.getElementById('game-over');
    const finalScoreEl = document.getElementById('final-score');
    const restartBtn = document.getElementById('restart-btn');

    function loadLevel() {
        if (currentLevel < levels.length) {
            const level = levels[currentLevel];
            levelNumberEl.textContent = currentLevel + 1;
            totalLevelsEl.textContent = levels.length;
            challengeTextEl.textContent = level.challenge;
            hintTextEl.textContent = "";
            feedbackTextEl.textContent = "";
            answerInput.value = "";
            answerInput.focus();
        } else {
            showGameOver();
        }
    }

    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        const correctAnswer = levels[currentLevel].answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            score += 10;
            scoreEl.textContent = score;
            feedbackTextEl.textContent = "Correct! Great work, sleuth!";
            feedbackTextEl.className = 'feedback-correct';
            currentLevel++;
            setTimeout(loadLevel, 1500);
        } else {
            feedbackTextEl.textContent = "Not quite. Try again!";
            feedbackTextEl.className = 'feedback-incorrect';
            hintTextEl.textContent = `Hint: ${levels[currentLevel].hint}`;
        }
    }

    function showGameOver() {
        gameAreaEl.classList.add('hidden');
        gameOverEl.classList.remove('hidden');
        finalScoreEl.textContent = score;
    }
    
    function restartGame() {
        currentLevel = 0;
        score = 0;
        scoreEl.textContent = score;
        gameOverEl.classList.add('hidden');
        gameAreaEl.classList.remove('hidden');
        loadLevel();
    }

    submitBtn.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            checkAnswer();
        }
    });
    restartBtn.addEventListener('click', restartGame);

    loadLevel();
});
