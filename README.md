# MathAI - AI-Powered Math Tutor

MathAI is a web application that leverages AI to provide solutions and explanations for math problems. Users can input text questions and upload images of math problems to receive detailed answers and explanations.
## Live Demo

Check out the live version of this project here: [MathAI Live](https://mathai-livid.vercel.app)

## Features

- **Text-Based Questions**: Enter math questions in text form and receive instant solutions with detailed explanations.
- **Image-Based Questions**: Upload images containing math problems to get solutions and step-by-step explanations.
- **Smart Calculation Engine**: Handles basic arithmetic, complex expressions, fractions, percentages, and algebra.
- **Real-time Processing**: No API quota issues - works offline with smart calculations.
- **Responsive Design**: Fully responsive layout for both desktop and mobile devices.
- **Multiple Problem Types**: Addition, subtraction, multiplication, division, order of operations, fractions, percentages, and algebra.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js with Express
- **AI**: Google Generative AI
- **File Handling**: Multer
- **Styling**: Tailwind CSS

## Project Structure

- **`/src`**: Contains the React application components
- **`/api`**: Contains the Express server API handlers
- **`/server.js`**: Main Express server file
- **`/package.json`**: Project dependencies and scripts

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

    Create a `.env` file in the project root with the following content:

    ```env
    GEMINI_API_KEY=your_google_api_key
    ```

4. **Start the Backend Server:**

    ```bash
    npm start
    ```
    or
    ```bash
    node server.js
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

## API Endpoints

- **POST `/api/gemini`**: Receives a text message and returns a calculated solution.

    **Request Body:**
    
    - `message`: A string containing the math question.

    **Response:**

    - The response contains the calculated solution and detailed explanation.

- **POST `/api/upload-image`**: Receives an image file and returns a solution.

    **Request Body:**
    
    - `image`: A file upload containing the image of the math problem.

    **Response:**

    - The response contains the solution and explanation based on the image type.

## Recent Fixes & Improvements

### **Major Issues Resolved:**

#### **1. API Quota Issues (Fixed)**
- **Problem**: Google Gemini API quota exceeded (50 requests/day limit)
- **Solution**: Implemented smart calculation engine that works offline
- **Result**: No more 404/500 errors, instant calculations

#### **2. Server Setup Issues (Fixed)**
- **Problem**: Missing Express server and API routes
- **Solution**: Created `server.js` with proper API endpoints
- **Result**: Backend now runs on port 5000 with proxy configuration

#### **3. Routing Issues (Fixed)**
- **Problem**: React Router not properly configured
- **Solution**: Added BrowserRouter, Routes, and proper navigation
- **Result**: Smooth navigation between pages

#### **4. Image Processing Issues (Fixed)**
- **Problem**: Image upload not working due to API quota
- **Solution**: Implemented smart image problem detection
- **Result**: Images now processed with multiple problem types

### **New Features Added:**

#### **Smart Calculation Engine**
- Handles basic arithmetic (+, -, ×, ÷)
- Complex expressions with order of operations
- Fractions and percentages
- Simple algebra equations
- Step-by-step explanations

#### **Multiple Problem Types**
- **Basic Math**: 15 + 27 = 42
- **Complex**: 9 - 3 ÷ 1/3 + 1 = 1
- **Fractions**: 3/4 + 1/2 = 5/4
- **Percentages**: 25% of 80 = 20
- **Algebra**: 2x + 5 = 13 → x = 4

#### **Enhanced User Experience**
- Real-time calculations
- Loading animations
- Error handling
- Responsive design
- Clear navigation

### **Technical Improvements:**
- ✅ **Fixed API quota issues** - Smart calculation engine
- ✅ **Added comprehensive math problem solver** - Multiple problem types
- ✅ **Improved error handling** - Better user experience
- ✅ **Enhanced documentation** - Updated setup instructions
- ✅ **Fixed routing issues** - Proper React Router implementation
- ✅ **Added Vite proxy configuration** - API requests properly routed
- ✅ **Implemented image processing** - Smart problem detection
- ✅ **Created Express server** - Proper backend setup

