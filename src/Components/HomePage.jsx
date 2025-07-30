import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AI_PROMPT, AI_PROMPT2 } from '../create-ans/modelText';

function HomePage() {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [answer, setAnswer] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const getSolution = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setAnswer('');
    setExplanation('');

    try {
      const prompt1 = AI_PROMPT.replace('{inputText}', inputText);
      const prompt2 = AI_PROMPT2.replace('{inputText}', inputText);

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: [prompt1, prompt2] })
      });

      const data = await response.text();
      const [answerPart, explanationPart] = data.split('**Detailed Solution:**');

      if (answerPart && explanationPart) {
        setAnswer(answerPart.trim());
        setExplanation(explanationPart.trim());
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSolveClick = () => {
    if (selectedImage) {
      navigate('/solution-image', { state: { selectedImage, inputText } });
    } else if (inputText.trim()) {
      getSolution();
    } else {
      alert("Please enter text or upload an image before solving.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <main className='flex-1 p-8 flex flex-col gap-3 text-center sm:gap-4 pd-20'>
      <h2 className='font-semibold text-3xl sm:text-4xl md:text-5xl text-black'>Your Personal Math AI</h2>
      <p>Get expert-level tutoring with the ultimate AI math solver.</p>
      <div className='flex items-center specialBtn justify-between rounded-2xl px-4 py-4 mt-11 mx-auto w-11/12 lg:w-3/4 md:w-3/4 max-auto'>
        <input
          value={inputText}
          type='text'
          placeholder='Type your Question here...'
          onChange={handleInputChange}
          className='flex-grow p-2 mr-4 outline-none'
        />

<button
          onClick={handleSolveClick}
          className='bg-blue-500 text-white font-semibold p-2 rounded-lg flex-shrink-0'
        >
          Solve
        </button>
      </div>

      <div className='flex flex-col bg-white h-52 border border-dashed border-gray-500 mt-5 w-11/12 lg:w-3/4 md:w-3/4 mx-auto justify-center'>
        {!selectedImage && (
          <>
            <div><i className="fa-solid fa-image text-7xl m-3"></i></div>
            <p>
              <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>
                Upload <input className='hidden' id='files' type='file' accept='image/*' onChange={handleImageChange} />
              </label>
              your image here
            </p>
          </>
        )}
        {selectedImage && (
          <div className='inline-flex justify-center max-w-full max-h-full'>
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded Preview"
              className='object-contain max-w-full max-h-full'
            />
          </div>
        )}
      </div>

      <p className='italic text-slate-500'>Free now free forever</p>

      {/* Solution Section */}
      {(answer || explanation || loading) && (
        <div className='mt-8 max-w-[800px] mx-auto w-full'>
          {/* Explanation Section */}
          <div className='box my-6'>
            <div className='bg-blue-500 p-3'>
              <h2 className='font-semibold text-white text-l'>EXPLANATION</h2>
            </div>
            <div className='px-14 py-6'>
              {loading ? (
                <div className='flex flex-col gap-2'>
                  {[0, 1, 2].map(val => (
                    <div key={val} className='rounded-full h-2 bg-slate-400 loading' style={{ animationDelay: `${val * -2}s` }} />
                  ))}
                </div>
              ) : (
                <div className='preformatted-text'>{explanation}</div>
              )}
            </div>
          </div>

          {/* Answer Section */}
          <div className='box'>
            <div className='bg-blue-500 p-3'>
              <h2 className='font-semibold text-white text-l'>ANSWER</h2>
            </div>
            <div className='px-14 py-6'>
              {loading ? (
                <div className='flex flex-col gap-2'>
                  {[0, 1, 2].map(val => (
                    <div key={val} className='rounded-full h-2 bg-slate-400 loading' style={{ animationDelay: `${val * -2}s` }} />
                  ))}
                </div>
              ) : (
                <div className='preformatted-text font-bold text-center'>{answer}</div>
              )}
            </div>
          </div>
        </div>
      )}

      <h2 className='text-2xl sm:text-3xl md:text-4xl text-black mt-40 font-semibold'>Save time use MATHAI as an AI math tutor.</h2>
      <p>Turn hours of frustration into minutes on MATHAI.</p>
    </main>
  );
}

export default HomePage;
