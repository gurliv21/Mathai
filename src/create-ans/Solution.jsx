import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AI_PROMPT, AI_PROMPT2 } from './modelText';

function Solution() {
  const location = useLocation();
  const { inputText } = location.state || {};
  const [responseText1, setResponseText1] = useState("");
  const [responseText2, setResponseText2] = useState("");
  const [loading, setLoading] = useState(true);
  
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

      const apiResponse = await fetch('/api/gemini', options);
      const data = await apiResponse.text();

      console.log("API Response: ", data);

      const [answer, explanation] = data.split('## Detailed Solution:');

      if (answer && explanation) {
        // Formatting the response text
        const formatText = (text) => {
          return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  
            .replace(/\*(?!\*)/g, '<br />')
            .replace('## Concise Answer:', '')                 // Replace single '*' with <br />
            .replace(/\n/g, '<br />');                         // Handle actual newlines
        };

        const formattedAnswer = formatText(answer.trim());
        const formattedExplanation = formatText(explanation.trim());

        setResponseText1(formattedAnswer);
        setResponseText2(formattedExplanation);
      } else {
        console.error("Unexpected API response structure: ", data);
      }
    } catch (error) {
      console.error("There is an error", error);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  useEffect(() => {
    getResponse(); // Fetch response on mount
  }, [inputText]);

  return (
    <main className='flex flex-col max-w-[800px] mx-auto w-full min-h-screen'>
      <section className="min-h-screen flex flex-col flex-1">
        <main className='flex-1 p-8 flex flex-col pd-20'>
          
          {/* Input Text Box */}
          <div className='box1 p-2 border border-spacing-10 border-gray-200 rounded-lg my-4'>
            <div className='flex items-center p-1'>
              <h1 className='text-xl'>{inputText}</h1>
            </div>
          </div>

          {/* Explanation Section */}
          <div className='box my-6 mb-20'>
            <div className='bg-blue-500  flex justify-between p-3'>
              <h2 className='font-semibold text-white text-l'>EXPLANATION</h2>
              
            </div>
            <div>
              {loading ? (
                <div className='flex flex-col gap-2 sm:gap-4 max-w-[800px] mx-auto w-full p-6 py-10'>
                  {[0, 1, 2].map(val => (
                    <div
                      key={val}
                      className={`rounded-full h-2 bg-slate-400 loading loading${val}`}
                      style={{ animationDelay: `${val * -2}s` }}
                    />
                  ))}
                </div>
              ) : (
                <div className='px-14 py-6 pb-16 preformatted-text' dangerouslySetInnerHTML={{ __html: responseText2 }} />
              )}
            </div>
          </div>

          {/* Answer Section */}
          <div className='box '>
            <div className='bg-blue-500  flex justify-between p-3'>
              <h2 className='font-semibold text-white text-l'>ANSWER</h2>
              
            </div>
            <div>
              {loading ? (
                <div className='flex flex-col gap-2 sm:gap-4 max-w-[800px] mx-auto w-full p-6 py-10'>
                  {[0, 1, 2].map(val => (
                    <div
                      key={val}
                      className={`rounded-full h-2 bg-slate-400 loading loading${val}`}
                      style={{ animationDelay: `${val * -2}s` }}
                    />
                  ))}
                </div>
              ) : (
                <div className='px-14  pb-6 preformatted-text font-bold text-center' dangerouslySetInnerHTML={{ __html: responseText1 }} />
              )}
            </div>
          </div>
        </main>
      </section>
    </main>
  );
}

export default Solution;