import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [inputText, setInputText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    console.log(inputText);
  };

  const handleSolveClick = async () => {
    if (!inputText.trim()) {
      alert("Please enter text before solving.");
      return;
    } else {
      navigate('/create-ans', { state: { inputText, selectedImage } });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
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
              src={selectedImage}
              alt="Uploaded Preview"
              className='object-contain max-w-full max-h-full' // Adjust max-height as needed
            />
          </div>
        )}
      </div>

      <p className='italic text-slate-500'>Free now free forever</p>

      <h2 className='text-2xl sm:text-3xl md:text-4xl text-black mt-40 font-semibold'>Save time use MATHAI as an AI math tutor.</h2>
      <p >Turn hours of frustration into minutes on MATHAI.</p>
    </main>
  );
}

export default HomePage;
