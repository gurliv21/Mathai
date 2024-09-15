import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';



const formatMathText = (text) => {
  return text
   
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold text
    .replace(/\n{2,}/g, '<br /><br />')  // Paragraph breaks for double newlines
    .replace(/\n/g, '<br />');  // Line breaks for single newlines
};

function SolutionImage() {
  const location = useLocation();
  const { selectedImage, inputText } = location.state || {};
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copySuccess, setCopySuccess] = useState('');  // State for copy status
  const hiddenDivRef = useRef(null);  // Ref for the hidden div

  const uploadImage = async () => {
    if (!selectedImage) {
      setError('No image selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    setLoading(true);

    try {
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json(); // Assuming the API response is JSON
      console.log("API Response: ", data);

      if (data.text) {
        // Formatting the response text with math formatting
        let formattedText = formatMathText(data.text.trim());
        console.log("Formatted Text: ", formattedText);
        setResponseText(formattedText);
      } else {
        throw new Error("Unexpected API response structure: Missing 'text' field");
      }

    } catch (error) {
      console.error('Error:', error.message);
      setError(`Error uploading image: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      uploadImage();
    }
  }, [selectedImage]);

  // Copy plain text content of the rendered math and text
  const copyToClipboard = () => {
    if (hiddenDivRef.current) {
      const plainText = hiddenDivRef.current.innerText;  // Get plain text from the hidden div
      navigator.clipboard.writeText(plainText)
        .then(() => {
          setCopySuccess('Copied to clipboard!');
          setTimeout(() => setCopySuccess(''), 2000); // Clear success message after 2 seconds
        })
        .catch(err => {
          console.error('Error copying text: ', err);
          setCopySuccess('Failed to copy');
        });
    }
  };

  return (
    <main className='flex flex-col max-w-[800px] mx-auto w-full min-h-screen'>
      <section className="min-h-screen flex flex-col flex-1">
        <main className='flex-1 p-8 flex flex-col pd-20'>
          {/* Input Text Box */}
          <div className='box1 p-2 border border-spacing-10 border-gray-200 rounded-lg my-4'>
            <div className='flex items-center p-1'>
              <div className='flex flex-row gap-6'>
                <div className='border border-gray-200'>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Uploaded Preview"
                    className='object-contain max-w-32 min-h-10'
                  />
                </div>
                <h1 className='text-xl'>{inputText}</h1>
              </div>
            </div>
          </div>

          {/* Explanation Section */}
          <div className='box my-6 mb-20'>
            <div className='bg-blue-500 flex justify-between p-3'>
              <h2 className='font-semibold text-white text-l'>EXPLANATION</h2>
              <button onClick={copyToClipboard} className='cursor-pointer'>
                <i className="fa-solid fa-copy text-white text-xl"></i>
              </button>
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
                <div className='px-14 py-6 pb-16 preformatted-text'>
                  {/* Render formatted text with math expressions */}
                  <div dangerouslySetInnerHTML={{ __html: responseText }} />

                  {/* Hidden div for plain text content */}
                  <div
                    ref={hiddenDivRef}
                    style={{ display: 'none' }}
                    dangerouslySetInnerHTML={{ __html: responseText }}
                  />
                </div>
              )}
              {/* Display copy status */}
              {copySuccess && <div className="text-green-500 mt-2">{copySuccess}</div>}
            </div>
          </div>
        </main>
      </section>
    </main>
  );
}

export default SolutionImage;
