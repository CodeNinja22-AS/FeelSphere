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

        // Add event listener to the button
        document.querySelector('.start-button').addEventListener('click', () => {
            renderStoryInputScreen();
        });
    };

    // New function to render the next screen based on the template
    const renderStoryInputScreen = () => {
        const storyInputHTML = `
            <div class="modern-layout">
                <div class="main-content">
                    <h1>Tell us what's on your mind.</h1>
                    <p>What are you feeling today? The AI will craft a story to guide your emotions.</p>
                    <textarea id="emotional-input" rows="6" placeholder="I'm feeling..."></textarea>
                    <button id="generate-story-button">Generate Story</button>
                </div>
                <div class="sidebar">
                    <h3>Wellness Prompts</h3>
                    <ul>
                        <li><a href="#">Mindfulness</a></li>
                        <li><a href="#">Journaling</a></li>
                        <li><a href="#">Breathing exercises</a></li>
                    </ul>
                </div>
            </div>
        `;
        appContainer.innerHTML = storyInputHTML;

        // Note: The AI integration logic will be added here later
    };

    // Initially render the header and welcome screen
    renderHeader();
    renderWelcomeScreen();
});