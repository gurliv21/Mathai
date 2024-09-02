import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AI_PROMPT, AI_PROMPT2 } from './modelText';

function Solution() {
  const location = useLocation();
  const { inputText } = location.state || {};
  const [responseText1, setResponseText1] = useState("");
  const [responseText2, setResponseText2] = useState("");

  const getResponse = async () => {
    if (!inputText) {
      return;
    }

    const promptWithInput1 = AI_PROMPT.replace('{inputText}', inputText);
    const promptWithInput2 = AI_PROMPT2.replace('{inputText}', inputText);
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          message: [promptWithInput1, promptWithInput2]
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const apiResponse = await fetch('http://localhost:3000/gemini', options);
      const data = await apiResponse.text(); // Assuming the response is a single string

      console.log("API Response: ", data); // Log the entire response to see its structure

      // Split the response string into two parts based on a delimiter or specific keywords
      const [answer, explanation] = data.split('## Detailed Explanation:');
      
      if (answer && explanation) {
        setResponseText1(answer.trim());
        setResponseText2(explanation.trim());
      } else {
        console.error("Unexpected API response structure: ", data);
      }
    } catch (error) {
      console.error("There is an error", error);
    }
  };

  useEffect(() => {
    getResponse(); // Call getResponse when component mounts
  }, [inputText]);

  return (
    <main className='flex flex-col max-w-[800px] mx-auto w-full min-h-screen'>
      <section className="min-h-screen flex flex-col flex-1">
        <main className='flex-1 p-8 flex flex-col gap-8 text-center sm:gap-4 pd-20'>
          <div className='box1 p-2 border border-spacing-10 border-gray-200 rounded-lg my-8'>
            <div className='flex items-center p-1'>
              <h1 className='text-xl'>{inputText}</h1>
            </div>
          </div>
          <div className='box rounded-xl'>
            <div className='bg-blue-500 rounded-xl flex justify-between p-3'>
              <h2 className='font-semibold text-white text-l flex justify-start'>ANSWER</h2>
              <button className='cursor-pointer'>
                <i className="fa-solid fa-copy flex justify-end text-white text-xl"></i>
              </button>
            </div>
            <h1>{responseText1}</h1>
          </div>
          <div className='box rounded-xl my-12'>
            <div className='bg-blue-500 rounded-xl flex justify-between p-3'>
              <h2 className='font-semibold text-white text-l flex justify-start'>EXPLANATION</h2>
              <button className='cursor-pointer'>
                <i className="fa-solid fa-copy flex justify-end text-white text-xl"></i>
              </button>
            </div>
            <h1>{responseText2}</h1>
          </div>
        </main>
      </section>
    </main>
  );
}

export default Solution;