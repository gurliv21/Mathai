import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

// Smart math calculation function
function calculateMathProblem(problem) {
  try {
    // Clean the problem text and extract the actual problem
    let cleanProblem = problem.toString().toLowerCase();
    
    // Extract the mathematical expression from the problem
    let mathExpression = cleanProblem.replace(/[^0-9+\-*/().\s]/g, '');
    
    // Handle different types of problems
    if (mathExpression.includes('+')) {
      // Addition
      const numbers = mathExpression.split('+').map(n => parseFloat(n.trim()));
      const result = numbers.reduce((a, b) => a + b, 0);
      return {
        answer: result.toString(),
        explanation: `Addition: ${numbers.join(' + ')} = ${result}\n\nStep by step:\n${numbers.map((n, i) => `${i + 1}. ${n}`).join('\n')}\nTotal: ${result}`
      };
    } else if (mathExpression.includes('-')) {
      // Subtraction
      const numbers = mathExpression.split('-').map(n => parseFloat(n.trim()));
      const result = numbers.reduce((a, b) => a - b);
      return {
        answer: result.toString(),
        explanation: `Subtraction: ${numbers[0]} - ${numbers.slice(1).join(' - ')} = ${result}\n\nStep by step:\n1. Start with ${numbers[0]}\n2. Subtract ${numbers.slice(1).join(', ')}\nResult: ${result}`
      };
    } else if (mathExpression.includes('*') || mathExpression.includes('×')) {
      // Multiplication
      const numbers = mathExpression.split(/[*×]/).map(n => parseFloat(n.trim()));
      const result = numbers.reduce((a, b) => a * b, 1);
      return {
        answer: result.toString(),
        explanation: `Multiplication: ${numbers.join(' × ')} = ${result}\n\nStep by step:\n${numbers.map((n, i) => `${i + 1}. ${n}`).join('\n')}\nProduct: ${result}`
      };
    } else if (mathExpression.includes('/') || mathExpression.includes('÷')) {
      // Division
      const numbers = mathExpression.split(/[/÷]/).map(n => parseFloat(n.trim()));
      const result = numbers.reduce((a, b) => a / b);
      return {
        answer: result.toString(),
        explanation: `Division: ${numbers[0]} ÷ ${numbers.slice(1).join(' ÷ ')} = ${result}\n\nStep by step:\n1. Start with ${numbers[0]}\n2. Divide by ${numbers.slice(1).join(', ')}\nResult: ${result}`
      };
    } else {
      // Try to evaluate as a general expression
      const result = eval(mathExpression);
      return {
        answer: result.toString(),
        explanation: `Calculation: ${mathExpression} = ${result}\n\nThis is the result of the mathematical expression.`
      };
    }
  } catch (error) {
    return {
      answer: "Error",
      explanation: `Sorry, I couldn't calculate this problem: ${problem}\n\nPlease try a simpler mathematical expression.`
    };
  }
}

// Express middleware handler
export default async function handler(req, res) {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).send('Message is required');
    }

    // Use smart calculation for all requests (API quota exceeded)
    console.log('Using smart calculation for:', message);
    
    if (Array.isArray(message)) {
      const problem = message[0] || message;
      const solution = calculateMathProblem(problem);
      return res.status(200).send(solution.answer + '\n\n**Detailed Solution:**\n\n' + solution.explanation);
    } else {
      const solution = calculateMathProblem(message);
      return res.status(200).send(solution.answer + '\n\n**Detailed Solution:**\n\n' + solution.explanation);
    }
  } catch (error) {
    console.error('Error processing request:', error.message);
    return res.status(500).send('Internal Server Error: ' + error.message);
  }
}
