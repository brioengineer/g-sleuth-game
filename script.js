document.addEventListener('DOMContentLoaded', () => {
    const levels = [
        {
            challenge: "Find an email from 'sender@example.com'.",
            answers: ["from:sender@example.com"],
            hint: "Use the 'from:' operator to specify the sender."
        },
        {
            challenge: "Find files with the exact phrase 'Q4 Project Plan' in the title.",
            answers: ['title:"Q4 Project Plan"'],
            hint: "Use quotes for exact phrases and the 'title:' operator."
        },
        {
            challenge: "Find a message that contains 'update' but NOT 'meeting'.",
            answers: ["update -meeting"],
            hint: "Use the minus sign (-) to exclude a word."
        },
        {
            challenge: "Find calendar events from 'organizer@example.com' about 'review' OR 'sync'.",
            answers: [
                "from:organizer@example.com (review OR sync)",
                "from:organizer@example.com (sync OR review)"
            ],
            hint: "Use parentheses and the 'OR' keyword for multiple terms."
        },
        {
            challenge: "Find presentations about 'marketing strategy' created before 2023.",
            answers: [
                "marketing strategy before:2023-01-01 type:presentation",
                "type:presentation marketing strategy before:2023-01-01"
            ],
            hint: "Combine 'before:', a date, and 'type:'."
        },
        {
            challenge: "Find documents that have a PDF file attached.",
            answers: [
                "has:attachment filename:pdf",
                "filename:pdf has:attachment"
            ],
            hint: "Use 'has:attachment' and 'filename:'."
        },
        {
            challenge: "Find unread emails sent to 'contact@example.com'.",
            answers: [
                "to:contact@example.com is:unread",
                "is:unread to:contact@example.com"
            ],
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
        const correctAnswers = levels[currentLevel].answers.map(a => a.toLowerCase());

        if (correctAnswers.includes(userAnswer)) {
            score += 10;
            scoreEl.textContent = score;
            feedbackTextEl.textContent = "Correct! Great work, sleuth!";
            feedbackTextEl.className = 'feedback-correct';
            currentLevel++;
            setTimeout(loadLevel, 1500);
        } else {
            feedbackTextEl.textContent = "Not quite. Check your syntax and try again!";
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
