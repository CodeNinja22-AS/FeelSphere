# FeelSphere

An AI-powered, interactive storytelling platform for youth mental wellness.

## About the Project

FeelSphere is a web application designed to support youth mental wellness through the power of storytelling. It provides a safe and anonymous space for users to explore their feelings by answering a series of carefully crafted questions. Based on their responses, FeelSphere's AI generates a unique, metaphorical short story and a calming image designed to offer comfort, perspective, and a sense of being understood.

The project was created with the belief that stories can be a powerful tool for self-reflection and emotional resilience. Instead of offering direct advice, FeelSphere provides narratives that allow users to see their challenges from a new perspective, empowering them to find their own way through.

## Features

- **Interactive Questionnaire:** A series of 20 questions to help users identify and articulate their feelings.
- **AI-Powered Story Generation:** Utilizes Google's Gemini Pro to create personalized, metaphorical short stories.
- **Custom Image Generation:** Creates a unique, calming image to accompany each story.
- **Theme-Based Analysis:** Analyzes user responses to identify core emotional themes.
- **Responsive Design:** A clean and intuitive interface that works on all devices.
- **Dark/Light Theme:** A theme toggle for user comfort.

## How It Works

1.  **Welcome:** The user is greeted with a welcoming page and a quote.
2.  **Questionnaire:** The user clicks "Start Your Journey" and is guided through a 20-question quiz about their current emotional and physical state.
3.  **Analysis:** The user's answers are sent to the backend, where they are analyzed to determine a core emotional theme (e.g., feeling stuck, anxious, disconnected).
4.  **Content Generation:** The backend uses the analysis to create a prompt for the Gemini API, which generates a short, metaphorical story and a corresponding image prompt.
5.  **Story Display:** The user is redirected to a story page where they can read their personalized story and view the calming image.

## Technical Stack

### Frontend

- HTML5
- CSS3 (with Tailwind CSS)
- JavaScript

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Google Generative AI (Gemini Pro)

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) (which includes npm)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Installation and Running the Project

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/feelsphere.git
    cd feelsphere
    ```

2.  **Set up the backend:**
    - Navigate to the `backend` directory:
      ```bash
      cd backend
      ```
    - Install the dependencies:
      ```bash
      npm install
      ```
    - Create a `.env` file in the `backend` directory and add the following environment variables:
      ```
      MONGO_URI=your_mongodb_connection_string
      GEMINI_API_KEY=your_google_gemini_api_key
      PORT=5000
      ```
    - Start the backend server:
      ```bash
      npm start
      ```

3.  **Run the frontend:**
    - Open the `index.html` file in your web browser. You can do this by right-clicking the file and selecting "Open with Live Server" if you have the VS Code extension, or by simply double-clicking the file.

## Project Structure

```
.
├── README.md
├── backend
│   ├── db.js
│   ├── models
│   │   └── Session.js
│   ├── package-lock.json
│   ├── package.json
│   ├── questions.js
│   ├── routes
│   │   ├── story.js
│   │   └── testAPI.js
│   └── server.js
├── index.html
├── questions.html
├── questions.js
├── scripts.js
├── story.html
└── styles.css
```

## API Endpoints

- `POST /api/story/save-answer`
  - Saves a user's answer to a question.
  - **Body:** `{ "sessionId": "string", "questionId": "string", "answer": "string" }`

- `GET /api/story/generate/:sessionId`
  - Generates a story and image URL based on the user's session data.
  - **Params:** `sessionId` (string)
  - **Returns:** `{ "story": "string", "imageUrl": "string" }`
