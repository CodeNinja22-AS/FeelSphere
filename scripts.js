document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const headerContainer = document.getElementById('main-header');

    // Function to render the main header
    const renderHeader = () => {
        const headerHTML = `
            <nav class="modern-header">
                <a href="#" class="logo">FeelSphere</a>
                <div class="nav-links">
                    <a href="#">Home</a>
                    <a href="#">Stories</a>
                    <a href="#">About</a>
                    <a href="#">Community</a>
                </div>
            </nav>
        `;
        headerContainer.innerHTML = headerHTML;
    };

    // Function to render the welcome screen
    const renderWelcomeScreen = () => {
        const welcomeScreenHTML = `
            <div class="welcome-screen">
                <h1>Welcome to FeelSphere</h1>
                <h2>Your personal space for emotional well-being through interactive stories.</h2>
                <button class="start-button">Start Your Journey</button>
            </div>
        `;
        appContainer.innerHTML = welcomeScreenHTML;

        document.querySelector('.start-button').addEventListener('click', () => {
            renderEmotionalInputScreen();
        });
    };

    // Function for the emotional input screen
    const renderEmotionalInputScreen = () => {
        const emotionalInputHTML = `
            <div class="input-screen">
                <h2>How are you feeling right now?</h2>
                <p>Type in a few words about your mood, or what's on your mind. Our AI will use this to find a story for you.</p>
                <textarea id="emotional-input" placeholder="e.g., Anxious, stressed from exams, happy, confused..."></textarea>
                <button id="submit-input-btn">Generate a Story</button>
            </div>
        `;
        appContainer.innerHTML = emotionalInputHTML;

        // Add event listener to the "Generate a Story" button
        document.getElementById('submit-input-btn').addEventListener('click', () => {
            // Get the user's input
            const emotionalInput = document.getElementById('emotional-input').value;
            // For now, we'll just log the input and proceed to the next screen
            console.log("User input:", emotionalInput);
            renderStoryScreen(emotionalInput);
        });
    };

    // New function to render the interactive story screen
    const renderStoryScreen = (emotionalInput) => {
        const storyScreenHTML = `
            <div class="story-screen">
                <h2>Your Story Awaits...</h2>
                <p>Based on your input ("${emotionalInput}"), here is your story.</p>
                
                <div class="story-content">
                    <p>
                        The old city of Felt was always a little dusty, but today the sun seemed especially bright,
                        glinting off the windowpanes. You are walking down a street you've never seen before, feeling a
                        familiar weight in your chest. You come to a fork in the road.
                    </p>
                    <div class="story-image-placeholder">
                        <p>[AI-generated image placeholder]</p>
                    </div>
                </div>

                <div class="story-choices">
                    <button class="story-choice-btn">Turn left down a winding alley</button>
                    <button class="story-choice-btn">Turn right towards the bustling marketplace</button>
                </div>
            </div>
        `;
        appContainer.innerHTML = storyScreenHTML;
    };

    // Initial load
    renderHeader();
    renderWelcomeScreen();
});