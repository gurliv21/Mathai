import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Solution() {
  const location = useLocation();
  const { inputText } = location.state || {};
  const [chatHistory, setChatHistory] = useState([]);
  const [value, setValue] = useState("");
  const [responseText, setResponseText] = useState("");

  const getResponse = async () => {
    if (!value) {
      return;
    }
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          history: chatHistory,
          message: value // Use `value` instead of `inputText` here
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      // Rename `response` to `apiResponse` to avoid conflict
      const apiResponse = await fetch('http://localhost:3000/gemini', options);
      const data = await apiResponse.text();
      setResponseText(data);
      
      setChatHistory(oldChatHistory => [
        ...oldChatHistory,
        { role: "user", parts: value },
        { role: "model", parts: data }
      ]);
      setValue("");
    } catch (error) {
      console.log("There is an error", error);
    }
  };

  return (
    <main className='flex flex-col max-w-[800px] mx-auto w-full min-h-screen'>
      <section className="min-h-screen flex flex-col flex-1">
        <main className='flex-1 p-8 flex flex-col gap-3 text-center sm:gap-4 pd-20'>
          <div className='specialBtn p-2 border border-spacing-10 border-gray-200 rounded-lg'>
            <div className='flex items-center gap-6'>
              <input 
                type='text' 
                value={value} 
                onChange={(e) => setValue(e.target.value)} 
              />
              <button onClick={getResponse}>Send</button>
            </div>
          </div>
          <div className='specialBtn'>
            <h1 className='p-6 my-14' dangerouslySetInnerHTML={{ __html: responseText }}></h1>
          </div>
        </main>
      </section>
    </main>
  );
}

export default Solution;
