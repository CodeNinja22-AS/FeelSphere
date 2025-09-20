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
    
    if (document.getElementById('quote-text')) {
        setQuote();
    }

    // --- Part 3: Akinator-style Question Logic (for questions.html) ---
    // --- Part 3: Akinator-style Question Logic (for questions.html) ---
const questions = [
  {
    id: 'q1',
    text: 'How would you describe your physical energy level right now?',
    options: [
      { text: 'Heavy and sluggish', value: 'low-energy' },
      { text: 'Restless and tense', value: 'high-energy' },
      { text: 'Calm and steady', value: 'steady-energy' },
      { text: 'Drained and empty', value: 'empty-energy' }
    ]
  },
  {
    id: 'q2',
    text: 'When you think about the last 24 hours, what feeling stands out the most?',
    options: [
      { text: 'Irritation or anger', value: 'anger' },
      { text: 'Sadness or disappointment', value: 'sadness' },
      { text: 'Anxiety or fear', value: 'fear' },
      { text: 'Boredom or apathy', value: 'boredom' }
    ]
  },
  {
    id: 'q3',
    text: 'Does this feeling have a physical sensation? Where do you feel it?',
    options: [
      { text: 'In my head or chest', value: 'head-chest' },
      { text: 'In my stomach or gut', value: 'stomach-gut' },
      { text: 'In my shoulders and back', value: 'shoulders-back' },
      { text: 'Nowhere in particular', value: 'no-sensation' }
    ]
  },
  {
    id: 'q4',
    text: 'What thought has been looping in your mind the most today?',
    options: [
      { text: 'Something about the past', value: 'past-thought' },
      { text: 'Something about the future', value: 'future-thought' },
      { text: 'Something about myself', value: 'self-thought' },
      { text: 'Random or scattered thoughts', value: 'random-thought' }
    ]
  },
  {
    id: 'q5',
    text: 'If your mood had a color right now, what would it be?',
    options: [
      { text: 'Red (tense/angry)', value: 'red' },
      { text: 'Blue (sad/calm)', value: 'blue' },
      { text: 'Yellow (hopeful/anxious)', value: 'yellow' },
      { text: 'Grey (dull/empty)', value: 'grey' }
    ]
  },
  {
    id: 'q6',
    text: 'How connected do you feel to the people around you today?',
    options: [
      { text: 'Very connected and supported', value: 'connected' },
      { text: 'Somewhat connected', value: 'somewhat-connected' },
      { text: 'Disconnected or isolated', value: 'isolated' },
      { text: 'Actively avoiding people', value: 'avoiding' }
    ]
  },
  {
    id: 'q7',
    text: 'If your feeling had a weather type, what would it be?',
    options: [
      { text: 'Stormy', value: 'stormy' },
      { text: 'Rainy', value: 'rainy' },
      { text: 'Sunny', value: 'sunny' },
      { text: 'Cloudy or foggy', value: 'cloudy' }
    ]
  },
  {
    id: 'q8',
    text: 'What’s your body posture like right now?',
    options: [
      { text: 'Tense and tight', value: 'tense-posture' },
      { text: 'Relaxed and open', value: 'relaxed-posture' },
      { text: 'Collapsed or slouched', value: 'collapsed-posture' },
      { text: 'Restless or fidgety', value: 'restless-posture' }
    ]
  },
  {
    id: 'q9',
    text: 'What’s been hardest for you to manage today?',
    options: [
      { text: 'My emotions', value: 'hard-emotions' },
      { text: 'My thoughts', value: 'hard-thoughts' },
      { text: 'My body/energy', value: 'hard-body' },
      { text: 'Nothing in particular', value: 'nothing-hard' }
    ]
  },
  {
    id: 'q10',
    text: 'Which metaphor best matches how you feel?',
    options: [
      { text: 'Like a balloon ready to pop', value: 'balloon' },
      { text: 'Like a heavy stone sinking', value: 'stone' },
      { text: 'Like a shaky bridge', value: 'bridge' },
      { text: 'Like an empty container', value: 'empty-container' }
    ]
  },
  {
    id: 'q11',
    text: 'If you could change one thing about this moment, what would it be?',
    options: [
      { text: 'My environment', value: 'environment' },
      { text: 'My relationships', value: 'relationships' },
      { text: 'My physical state', value: 'physical' },
      { text: 'My thoughts/emotions', value: 'mental' }
    ]
  },
  {
    id: 'q12',
    text: 'How safe do you feel in your body right now?',
    options: [
      { text: 'Very safe and grounded', value: 'safe' },
      { text: 'Somewhat uneasy', value: 'uneasy' },
      { text: 'On edge and unsafe', value: 'unsafe' },
      { text: 'Completely disconnected', value: 'disconnected' }
    ]
  },
  {
    id: 'q13',
    text: 'Which need feels most urgent to you right now?',
    options: [
      { text: 'Rest or relaxation', value: 'rest' },
      { text: 'Connection or comfort', value: 'connection' },
      { text: 'Clarity or understanding', value: 'clarity' },
      { text: 'Distraction or escape', value: 'escape' }
    ]
  },
  {
    id: 'q14',
    text: 'If your feeling could speak, what would it say?',
    options: [
      { text: '“Leave me alone”', value: 'leave-alone' },
      { text: '“Please help me”', value: 'help-me' },
      { text: '“I can’t handle this”', value: 'cant-handle' },
      { text: '“I just need space”', value: 'need-space' }
    ]
  },
  {
    id: 'q15',
    text: 'How much control do you feel you have over this feeling?',
    options: [
      { text: 'A lot of control', value: 'control-high' },
      { text: 'Some control', value: 'control-medium' },
      { text: 'Little control', value: 'control-low' },
      { text: 'No control at all', value: 'control-none' }
    ]
  },
  {
    id: 'q16',
    text: 'What do you usually do when this feeling shows up?',
    options: [
      { text: 'Talk to someone', value: 'coping-talk' },
      { text: 'Distract myself', value: 'coping-distract' },
      { text: 'Suppress or ignore it', value: 'coping-ignore' },
      { text: 'Try to understand it', value: 'coping-reflect' }
    ]
  },
  {
    id: 'q17',
    text: 'How long do you think this feeling will last?',
    options: [
      { text: 'Just a few minutes', value: 'short' },
      { text: 'A few hours', value: 'medium' },
      { text: 'The whole day', value: 'long' },
      { text: 'I don’t know', value: 'uncertain' }
    ]
  },
  {
    id: 'q18',
    text: 'Does this feeling remind you of a past experience?',
    options: [
      { text: 'Yes, strongly', value: 'past-strong' },
      { text: 'Yes, a little', value: 'past-weak' },
      { text: 'Not really', value: 'past-none' },
      { text: 'I’m not sure', value: 'past-uncertain' }
    ]
  },
  {
    id: 'q19',
    text: 'If you had to give your current state a title, what would it be?',
    options: [
      { text: '“The Battle Inside”', value: 'title-battle' },
      { text: '“Waves of Sadness”', value: 'title-sadness' },
      { text: '“Running in Circles”', value: 'title-anxiety' },
      { text: '“The Empty Space”', value: 'title-empty' }
    ]
  },
  {
    id: 'q20',
    text: 'Is there anything else you want to say or share?',
    options: [
      { text: 'No, that’s all for now.', value: 'done' }
    ],
    is_open_ended: true
  }
];


    let currentQuestionIndex = 0;
    let userResponses = {};
    const sessionId = localStorage.getItem('sessionId') || `session_${Date.now()}`;
    localStorage.setItem('sessionId', sessionId);

    const questionTitle = document.getElementById('question-title');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const nextButton = document.getElementById('next-button');
    const moreInputContainer = document.getElementById('more-input-container');
    const moreInput = document.getElementById('more-input');
    
    if (questionTitle && questionText && optionsContainer) {
        
        function showQuestion() {
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

        if (nextButton) {
            nextButton.addEventListener('click', async () => {
                const currentQuestion = questions[currentQuestionIndex];
                let answer = currentQuestion.is_open_ended ? moreInput.value : userResponses[currentQuestion.id];

                // Ensure answer is provided
                if (answer === undefined || answer.trim() === '') {
                    alert("Please select an option or enter a response before continuing.");
                    return;
                }

                try {
                    await fetch('http://localhost:5000/api/story/save-answer', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ sessionId, questionId: currentQuestion.id, answer })
                    });
                } catch (err) {
                    console.warn("Server not available, skipping save:", err);
                }

                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion();
                } else {
                    const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
                    window.location.href = `story.html?sessionId=${sessionId}&theme=${theme}`;
                }
            });
        }

        showQuestion();
    }
});
