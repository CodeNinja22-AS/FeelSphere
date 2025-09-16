// FeelSphere - JavaScript file for dynamic functionality

document.addEventListener('DOMContentLoaded', () => {

    // --- Part 1: Theme Toggling and Persistence ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');

    function applyTheme(isDark) {
        document.body.classList.toggle('dark-theme', isDark);
        document.body.classList.toggle('light-theme', !isDark);
        if (themeIcon) {
            themeIcon.textContent = isDark ? '☀️' : '🌙';
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme === 'dark');
    } else {
        const userPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(userPrefersDark);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeIcon.textContent = isDark ? '☀️' : '🌙';
        });
    }

    // --- Part 2: Random Quote Generator (for index.html) ---
    const quotes = [
        { text: "We are architects of our own experience. We don't recognize emotions; we construct them.", author: "Lisa Feldman Barrett" },
        { text: "Your beliefs, and even your emotional attitude, may change when you learn that the risk of an activity you disliked is smaller than you thought.", author: "Daniel Kahneman" },
        { text: "The conscience of a people is their power. A sense of obligation based on emotional attachment is at the core of all humanizing functions.", author: "Martha Stout" },
        { text: "The Child fosters creativity and enjoyment; the Adult ensures survival through critical thinking and decision-making.", author: "Eric Berne" },
        { text: "The brain’s most important mission is predicting your body’s energy needs, so you can stay alive and well.", author: "How Emotions Are Made" },
        { text: "Regret is a counterfactual emotion, triggered when we can easily imagine ourselves doing something other than what we did.", author: "Thinking, Fast and Slow" },
    ];

    function setQuote() {
        const quoteTextElement = document.getElementById('quote-text');
        const quoteAuthorElement = document.getElementById('quote-author');
        
        if (quoteTextElement && quoteAuthorElement) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            quoteTextElement.textContent = randomQuote.text;
            quoteAuthorElement.textContent = `- ${randomQuote.author}`;
        }
    }
    setQuote();


    // --- Part 3: Akinator-style Question Logic (for questions.html) ---
    const questions = [
    // Phase 1: Emotional & Physical State (Interoception & Affect)
    {
        id: 'q1',
        text: 'How would you describe your physical energy level right now?',
        options: [
            { text: 'Heavy and sluggish', value: 'low-energy' },
            { text: 'Restless and tense', value: 'high-energy' },
            { text: 'Calm and steady', value: 'steady-energy' },
            { text: 'Drained and empty', value: 'empty-energy' }
        ],
        theme_map: { 'low-energy': 'stuck', 'high-energy': 'anxiety', 'steady-energy': 'disconnected', 'empty-energy': 'stuck' }
    },
    {
        id: 'q2',
        text: 'When you think about the last 24 hours, what feeling stands out the most?',
        options: [
            { text: 'Irritation or anger', value: 'anger' },
            { text: 'Sadness or disappointment', value: 'sadness' },
            { text: 'Anxiety or fear', value: 'fear' },
            { text: 'Boredom or apathy', value: 'boredom' }
        ],
        theme_map: { 'anger': 'blame', 'sadness': 'disconnected', 'fear': 'anxiety', 'boredom': 'stuck' }
    },
    {
        id: 'q3',
        text: 'Does this feeling have a physical sensation? Where do you feel it?',
        options: [
            { text: 'In my head or chest', value: 'head-chest' },
            { text: 'In my stomach or gut', value: 'stomach-gut' },
            { text: 'In my shoulders and back', value: 'shoulders-back' },
            { text: 'Nowhere in particular', value: 'no-sensation' }
        ],
        theme_map: { 'head-chest': 'anxiety', 'stomach-gut': 'stuck', 'shoulders-back': 'blame', 'no-sensation': 'disconnected' }
    },
    {
        id: 'q4',
        text: 'Which metaphor best describes your current state of mind?',
        options: [
            { text: 'A crowded room with a lot of noise', value: 'crowded-mind' },
            { text: 'A still lake on a cloudy day', value: 'still-mind' },
            { text: 'A road with a lot of twists and turns', value: 'twisting-road' },
            { text: 'A house with a few too many empty rooms', value: 'empty-house' }
        ],
        theme_map: { 'crowded-mind': 'anxiety', 'still-mind': 'stuck', 'twisting-road': 'blame', 'empty-house': 'disconnected' }
    },
    {
        id: 'q5',
        text: 'When you consider your day, which of these is most true?',
        options: [
            { text: 'I felt overwhelmed by the pace of things.', value: 'overwhelmed' },
            { text: 'I felt disconnected from people around me.', value: 'disconnected' },
            { text: 'I felt trapped by a particular situation.', value: 'trapped' },
            { text: 'I felt calm, but without much purpose.', value: 'no-purpose' }
        ],
        theme_map: { 'overwhelmed': 'anxiety', 'disconnected': 'disconnected', 'trapped': 'stuck', 'no-purpose': 'stuck' }
    },
    
    // Phase 2: Social & Relational Dynamics (Games & Affect Heuristic)
    {
        id: 'q6',
        text: 'How do you typically react when a problem arises with another person?',
        options: [
            { text: 'I blame them for the problem.', value: 'blame-them' },
            { text: 'I feel I should have known better.', value: 'self-blame' },
            { text: 'I withdraw and avoid the conflict.', value: 'avoid-conflict' },
            { text: 'I try to find a solution together.', value: 'solve-together' }
        ],
        theme_map: { 'blame-them': 'blame', 'self-blame': 'anxiety', 'avoid-conflict': 'disconnected', 'solve-together': 'default' }
    },
    {
        id: 'q7',
        text: 'Do you feel you often play a role for other people?',
        options: [
            { text: 'Yes, I feel I have to be strong for them.', value: 'strong-role' },
            { text: 'Yes, I feel I have to be the funny one.', value: 'funny-role' },
            { text: 'No, I feel I am myself most of the time.', value: 'authentic' },
            { text: 'I am not sure what role I play.', value: 'unclear-role' }
        ],
        theme_map: { 'strong-role': 'disconnected', 'funny-role': 'disconnected', 'authentic': 'default', 'unclear-role': 'stuck' }
    },
    {
        id: 'q8',
        text: 'Have you recently felt a need to "prove yourself" to someone?',
        options: [
            { text: 'Yes, I feel I am always on trial.', value: 'on-trial' },
            { text: 'Yes, but it was for a specific, important goal.', value: 'specific-goal' },
            { text: 'No, not recently.', value: 'not-recently' },
            { text: 'I am not sure why I do this, but I do.', value: 'unconscious-prove' }
        ],
        theme_map: { 'on-trial': 'anxiety', 'specific-goal': 'default', 'not-recently': 'default', 'unconscious-prove': 'stuck' }
    },
    {
        id: 'q9',
        text: 'When you are praised, what is your first thought?',
        options: [
            { text: 'I wonder what they really want from me.', value: 'suspicious' },
            { text: 'I feel proud and motivated.', value: 'proud' },
            { text: 'I feel a bit uncomfortable with the attention.', value: 'uncomfortable' },
            { text: 'I think about the things I could have done better.', value: 'self-critical' }
        ],
        theme_map: { 'suspicious': 'blame', 'proud': 'default', 'uncomfortable': 'anxiety', 'self-critical': 'stuck' }
    },
    {
        id: 'q10',
        text: 'Do you ever find yourself telling stories that cast you as a victim?',
        options: [
            { text: 'Yes, I feel people should understand my struggles.', value: 'victim-narrative' },
            { text: 'No, I prefer to focus on solutions.', value: 'solution-focused' },
            { text: 'I am not sure, it just happens sometimes.', value: 'unaware-victim' },
            { text: 'I try my best to avoid it.', value: 'avoid-victim' }
        ],
        theme_map: { 'victim-narrative': 'blame', 'solution-focused': 'default', 'unaware-victim': 'stuck', 'avoid-victim': 'anxiety' }
    },

    // Phase 3: Cognitive & Narrative Bias (System 1/System 2)
    {
        id: 'q11',
        text: 'When making a choice, do you rely more on your gut feeling or a careful analysis?',
        options: [
            { text: 'My gut feeling, it’s usually right.', value: 'gut-feeling' },
            { text: 'A careful analysis of pros and cons.', value: 'analysis' },
            { text: 'A mix of both, depending on the situation.', value: 'mixed-approach' },
            { text: 'I get stuck and can’t decide.', value: 'stuck-decision' }
        ],
        theme_map: { 'gut-feeling': 'default', 'analysis': 'default', 'mixed-approach': 'anxiety', 'stuck-decision': 'stuck' }
    },
    {
        id: 'q12',
        text: 'How do you handle an unexpected event that disrupts your plans?',
        options: [
            { text: 'I feel a strong sense of panic and lose control.', value: 'panic-response' },
            { text: 'I take a deep breath and try to adapt.', value: 'calm-adaptation' },
            { text: 'I get angry and frustrated at the interruption.', value: 'anger-frustration' },
            { text: 'I accept it as a challenge to be overcome.', value: 'challenge' }
        ],
        theme_map: { 'panic-response': 'anxiety', 'calm-adaptation': 'default', 'anger-frustration': 'blame', 'challenge': 'default' }
    },
    {
        id: 'q13',
        text: 'Do you find yourself replaying negative past conversations in your head?',
        options: [
            { text: 'Yes, all the time.', value: 'replaying-yes' },
            { text: 'Sometimes, but I can stop it.', value: 'replaying-sometimes' },
            { text: 'Rarely or never.', value: 'replaying-never' },
            { text: 'I wish I could stop, but it feels out of my control.', value: 'replaying-uncontrolled' }
        ],
        theme_map: { 'replaying-yes': 'stuck', 'replaying-sometimes': 'anxiety', 'replaying-never': 'default', 'replaying-uncontrolled': 'stuck' }
    },
    {
        id: 'q14',
        text: 'Which of these statements about success do you believe more?',
        options: [
            { text: 'Success is mostly about luck.', value: 'luck-driven' },
            { text: 'Success is entirely about hard work and skill.', value: 'skill-driven' },
            { text: 'It\'s a mix of both, but hard work matters more.', value: 'mixed-driven' },
            { text: 'I am not sure.', value: 'uncertain-driven' }
        ],
        theme_map: { 'luck-driven': 'disconnected', 'skill-driven': 'anxiety', 'mixed-driven': 'default', 'uncertain-driven': 'stuck' }
    },
    {
        id: 'q15',
        text: 'Do you feel you have a clear plan for your future?',
        options: [
            { text: 'Yes, I have a detailed plan.', value: 'detailed-plan' },
            { text: 'I have some ideas, but they are not concrete.', value: 'vague-plan' },
            { text: 'No, I feel lost and uncertain.', value: 'lost-plan' },
            { text: 'I had a plan, but it fell apart.', value: 'plan-failed' }
        ],
        theme_map: { 'detailed-plan': 'anxiety', 'vague-plan': 'stuck', 'lost-plan': 'disconnected', 'plan-failed': 'blame' }
    },
    
    // Phase 4: Core Values & Identity (Conscience & Connection)
    {
        id: 'q16',
        text: 'What is more important to you: being loved or being respected?',
        options: [
            { text: 'Being loved by people close to me.', value: 'loved' },
            { text: 'Being respected for my work and choices.', value: 'respected' },
            { text: 'A balance of both is needed.', value: 'balance' },
            { text: 'Neither, I just want to feel content.', value: 'content' }
        ],
        theme_map: { 'loved': 'disconnected', 'respected': 'anxiety', 'balance': 'default', 'content': 'stuck' }
    },
    {
        id: 'q17',
        text: 'Do you ever feel a sense of obligation to help others, even when it\'s inconvenient?',
        options: [
            { text: 'Yes, almost all the time.', value: 'high-obligation' },
            { text: 'Only if I feel a personal connection to them.', value: 'personal-connection' },
            { text: 'Rarely, I prioritize my own needs.', value: 'low-obligation' },
            { text: 'I feel this, but I\'m often too drained to act.', value: 'drained' }
        ],
        theme_map: { 'high-obligation': 'anxiety', 'personal-connection': 'default', 'low-obligation': 'disconnected', 'drained': 'stuck' }
    },
    {
        id: 'q18',
        text: 'Have you recently found joy in a simple, unplanned interaction with someone?',
        options: [
            { text: 'Yes, these moments are very meaningful to me.', value: 'meaningful-joy' },
            { text: 'No, most of my interactions feel transactional.', value: 'transactional' },
            { text: 'I am not sure. I don\'t pay attention to it.', value: 'inattentive' },
            { text: 'I feel I have to plan for joy.', value: 'plan-joy' }
        ],
        theme_map: { 'meaningful-joy': 'default', 'transactional': 'disconnected', 'inattentive': 'stuck', 'plan-joy': 'anxiety' }
    },
    {
        id: 'q19',
        text: 'Which of these is the most significant struggle for you right now?',
        options: [
            { text: 'Feeling like my voice is not heard.', value: 'not-heard' },
            { text: 'Feeling like my life lacks purpose.', value: 'no-purpose' },
            { text: 'Feeling disconnected from my own feelings.', value: 'disconnected-feelings' },
            { text: 'Feeling like I am constantly being judged.', value: 'judged' }
        ],
        theme_map: { 'not-heard': 'blame', 'no-purpose': 'stuck', 'disconnected-feelings': 'disconnected', 'judged': 'anxiety' }
    },
    {
        id: 'q20',
        text: 'Is there anything else you want to say or share?',
        options: [{ text: 'No, that’s all for now.', value: 'done' }],
        is_open_ended: true,
        theme_map: {}
    },
];

    let currentQuestionIndex = 0;
    let userResponses = {};
    let sessionId = Date.now().toString(); // Simple session ID for demo

    const questionTitle = document.getElementById('question-title');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const moreInputContainer = document.getElementById('more-input-container');
    const moreInput = document.getElementById('more-input');

    // Function to display the current question
    function showQuestion() {
        if (!questionTitle || !questionText || !optionsContainer) return;

        const currentQuestion = questions[currentQuestionIndex];
        questionTitle.textContent = `Question ${currentQuestionIndex + 1}:`;
        questionText.textContent = currentQuestion.text;
        optionsContainer.innerHTML = '';
        moreInputContainer.classList.add('hidden');
        nextButton.classList.add('hidden');

        if (currentQuestion.is_open_ended) {
            moreInputContainer.classList.remove('hidden');
            nextButton.classList.remove('hidden');
        } else {
            currentQuestion.options.forEach(option => {
                const optionBtn = document.createElement('button');
                optionBtn.textContent = option.text;
                optionBtn.classList.add('w-full', 'px-6', 'py-4', 'border', 'rounded-lg', 'text-lg', 'font-medium', 'transition-colors', 'duration-200', 'text-gray-700', 'hover:bg-blue-100', 'border-gray-300', 'dark:text-gray-300', 'dark:border-gray-600', 'dark:hover:bg-gray-700');
                optionBtn.dataset.value = option.value;

                optionBtn.addEventListener('click', () => {
                    document.querySelectorAll('#options-container button').forEach(btn => {
                        btn.classList.remove('bg-blue-500', 'text-white', 'dark:bg-blue-600', 'dark:text-white');
                    });
                    optionBtn.classList.add('bg-blue-500', 'text-white', 'dark:bg-blue-600', 'dark:text-white');
                    userResponses[currentQuestion.id] = option.value;
                    nextButton.classList.remove('hidden');
                });
                optionsContainer.appendChild(optionBtn);
            });
        }
    }

    function analyzeResponses(responses) {
        let scores = {
            'stuck': 0,
            'anxiety': 0,
            'disconnected': 0,
            'blame': 0
        };

        for (const qId in responses) {
            const responseValue = responses[qId];
            const question = questions.find(q => q.id === qId);
            if (question && question.theme_map) {
                const themeKey = question.theme_map[responseValue];
                if (themeKey && scores[themeKey] !== undefined) {
                    scores[themeKey]++;
                }
            }
        }
        
        let winningTheme = 'default';
        let maxScore = 0;
        for (const theme in scores) {
            if (scores[theme] > maxScore) {
                maxScore = scores[theme];
                winningTheme = theme;
            }
        }
        return winningTheme;
    }

    if (nextButton) {
        nextButton.addEventListener('click', async () => {
            console.log('Next button clicked');
            const currentQuestion = questions[currentQuestionIndex];
            if (currentQuestion.is_open_ended) {
                userResponses[currentQuestion.id] = moreInput.value;
            }

            try {
                // Save the answer via API call
                await fetch('http://localhost:5000/api/story/save-answer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        sessionId,
                        questionId: currentQuestion.id,
                        answer: userResponses[currentQuestion.id]
                    })
                });
            } catch (error) {
                console.error('Error saving answer:', error);
            }

            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                const storyTheme = analyzeResponses(userResponses);
                // Redirect to story page with theme. The story.html will then call the backend to generate the story.
                window.location.href = `story.html?theme=${storyTheme}&sessionId=${sessionId}`;
            }
        });
    }

    // Initialize the first question
    if (document.getElementById('question-title')) {
        showQuestion();
    }
});
