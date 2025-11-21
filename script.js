document.addEventListener('DOMContentLoaded', () => {
    const levels = [
        {
            challenge: "Find an email from 'sender@example.com'.",
            choices: ["from:sender@example.com", "to:sender@example.com", "subject:sender@example.com", "sender@example.com"],
            answer: "from:sender@example.com"
        },
        {
            challenge: "Find files with the exact phrase 'Q4 Project Plan' in the title.",
            choices: ['title:"Q4 Project Plan"', "title:Q4 Project Plan", 'subject:"Q4 Project Plan"', "file:Q4 Project Plan"],
            answer: 'title:"Q4 Project Plan"'
        },
        {
            challenge: "Find a message that contains 'update' but NOT 'meeting'.",
            choices: ["update -meeting", "update NOT meeting", "update !meeting", "update and -meeting"],
            answer: "update -meeting"
        },
        {
            challenge: "Find calendar events from 'organizer@example.com' about 'review' OR 'sync'.",
            choices: ["from:organizer@example.com (review OR sync)", "from:organizer@example.com review OR sync", "from:organizer@example.com (review AND sync)", "from:organizer@example.com review,sync"],
            answer: "from:organizer@example.com (review OR sync)"
        },
        {
            challenge: "Find presentations about 'marketing strategy' created before 2023.",
            choices: ["type:presentation marketing strategy before:2023-01-01", "type:presentation marketing strategy date<2023", "doc marketing strategy before:2023", "presentation AND marketing strategy"],
            answer: "type:presentation marketing strategy before:2023-01-01"
        },
        {
            challenge: "Find documents that have a PDF file attached.",
            choices: ["has:attachment filename:pdf", "attachment:pdf", "filetype:pdf", "has:pdf"],
            answer: "has:attachment filename:pdf"
        },
        {
            challenge: "Find unread emails sent to 'contact@example.com'.",
            choices: ["to:contact@example.com is:unread", "to:contact@example.com unread", "from:contact@example.com is:unread", "is:unread AND contact@example.com"],
            answer: "to:contact@example.com is:unread"
        },
        {
            challenge: "Find emails received AFTER January 1st, 2024.",
            choices: ["after:2024-01-01", "since:2024", "from:2024-01-01", "date>2024-01-01"],
            answer: "after:2024-01-01"
        },
        {
            challenge: "Find messages with words that start with 'proj' (like 'project' or 'projection').",
            choices: ["proj*", "proj?", "proj%", "proj..."],
            answer: "proj*"
        },
        {
            challenge: "Search for 'Q1 results' EVERYWHERE, including trash and spam folders.",
            choices: ["in:anywhere Q1 results", "search:all Q1 results", "Q1 results folder:all", "anywhere:Q1 results"],
            answer: "in:anywhere Q1 results"
        },
        {
            challenge: "Find emails that contain a link to a Google Drive file.",
            choices: ["has:drive", "link:drive", "attachment:drive", "is:drive"],
            answer: "has:drive"
        }
    ];

    let currentLevel = 0;
    let score = 0;

    const levelNumberEl = document.getElementById('level-number');
    const totalLevelsEl = document.getElementById('total-levels');
    const scoreEl = document.getElementById('score');
    const challengeTextEl = document.getElementById('challenge-text');
    const choicesContainerEl = document.getElementById('choices-container');
    const feedbackTextEl = document.getElementById('feedback-text');
    const gameAreaEl = document.getElementById('game-area');
    const gameOverEl = document.getElementById('game-over');
    const finalScoreEl = document.getElementById('final-score');
    const restartBtn = document.getElementById('restart-btn');

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function loadLevel() {
        if (currentLevel < levels.length) {
            const level = levels[currentLevel];
            levelNumberEl.textContent = currentLevel + 1;
            totalLevelsEl.textContent = levels.length;
            challengeTextEl.textContent = level.challenge;
            feedbackTextEl.textContent = "";
            choicesContainerEl.innerHTML = '';

            level.choices.forEach(choice => {
                const button = document.createElement('button');
                button.textContent = choice;
                button.classList.add('choice-btn');
                button.addEventListener('click', () => handleChoice(choice, button, level));
                choicesContainerEl.appendChild(button);
            });
        } else {
            showGameOver();
        }
    }

    function handleChoice(selectedChoice, clickedButton, level) {
        const allChoiceButtons = choicesContainerEl.querySelectorAll('.choice-btn');
        allChoiceButtons.forEach(btn => btn.disabled = true);

        let transitionDelay = 1500;

        if (selectedChoice === level.answer) {
            score += 10;
            scoreEl.textContent = score;
            clickedButton.classList.add('correct');
            feedbackTextEl.textContent = "Correct! Great work, sleuth!";
        } else {
            transitionDelay = 3000; // Increased delay to read the answer
            clickedButton.classList.add('incorrect');
            // --- THIS IS THE NEW LOGIC ---
            feedbackTextEl.innerHTML = `Not quite. The correct answer was: <br><strong>${level.answer}</strong>`;
        }

        setTimeout(() => {
            currentLevel++;
            loadLevel();
        }, transitionDelay);
    }

    function showGameOver() {
        gameAreaEl.classList.add('hidden');
        gameOverEl.classList.remove('hidden');
        finalScoreEl.textContent = score;
    }
    
    function startGame() {
        currentLevel = 0;
        score = 0;
        scoreEl.textContent = score;
        shuffleArray(levels);
        gameOverEl.classList.add('hidden');
        gameAreaEl.classList.remove('hidden');
        loadLevel();
    }

    restartBtn.addEventListener('click', startGame);
    startGame();
});
