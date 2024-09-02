# MathAI - AI-Powered Math Tutor

MathAI is a web application that leverages AI to provide solutions and explanations for math problems. Users can input text questions and upload images of math problems to receive detailed answers and explanations.

## Features

- **Text-Based Questions**: Enter math questions in text form and receive AI-generated solutions.
- **Image-Based Questions**: Upload images containing math problems to get AI-generated solutions and explanations.
- **Responsive Design**: Fully responsive layout for both desktop and mobile devices.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js with Express
- **AI**: Google Generative AI
- **File Handling**: Multer
- **Styling**: Tailwind CSS

## Project Structure

- **`/frontend`**: Contains the React application.
- **`/backend`**: Contains the Express server and API integration.

## Getting Started

### Prerequisites

- Node.js and npm installed
- Google Generative AI API Key

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/MathAI.git
    cd MathAI
    ```

2. **Install  Dependencies:**

   The project uses npm  to manage dependencies.

    ```bash
    npm install
    ```
    This will install all the dependencies specified in package.json, including both regular dependencies and development dependencies.

3. **Set Up Environment Variables:**

    Create a `.env` file in the `backend` directory with the following content:

    ```env
    GEMINI_API_KEY=your_google_api_key
    ```

4. **Start the Backend Server:**

    ```bash
    node Server.js
    ```


5. **Start the Frontend Application:**

    ```bash
    npm run dev
    ```

    This will open the application in your default web browser.

## Usage

1. **Entering Text Questions:**

    - Go to the homepage.
    - Type your math question in the text input field and click "Solve."

2. **Uploading Images:**

    - Go to the homepage.
    - Click on the upload area to choose an image file with a math problem.
    - Click "Solve" to get the solution and explanation for the uploaded image.

## API Endpoint

- **POST `/gemini`**: Receives a text message or an image file and returns a generated solution.

    **Request Body:**
    
    - `message` (optional): A string containing the math question.
    - `image` (optional): A file upload containing the image of the math problem.

    **Response:**

    - The response contains the generated solution and explanation.

