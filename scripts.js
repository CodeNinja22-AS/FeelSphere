document.addEventListener('DOMContentLoaded', () => {
    // This code will only run on questions.html
    const moodForm = document.getElementById('mood-form');
    if (moodForm) {
        moodForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const selectedMood = document.querySelector('input[name="mood"]:checked');
            const emotionalInput = document.getElementById('mood-input').value;

            let moodData = {};
            if (selectedMood) {
                moodData.mood = selectedMood.value;
            }
            if (emotionalInput) {
                moodData.input = emotionalInput;
            }

            // Save the data to localStorage so it can be accessed on the next page
            localStorage.setItem('userMoodData', JSON.stringify(moodData));
            
            // Redirect to the story page
            window.location.href = 'story.html';
        });
    }

    // This code will only run on story.html
    const storyPage = document.querySelector('.story-page');
    if (storyPage) {
        // Retrieve the data from localStorage
        const moodData = JSON.parse(localStorage.getItem('userMoodData'));
        const storyTextElement = document.getElementById('story-text');
        
        if (moodData && moodData.input) {
            storyTextElement.textContent = `Based on your input ("${moodData.input}"), a story is being crafted just for you.`;
        } else if (moodData && moodData.mood) {
            storyTextElement.textContent = `Based on your mood ("${moodData.mood}"), a story is being crafted just for you.`;
        }
        
        // This is a placeholder for where the AI would generate content.
        // We'll replace this with actual AI integration later.
        console.log("User's emotional data:", moodData);
    }
});