import React from 'react'

function About() {
  return (
    <div className='my-20 p-2'>
        <h1 className='font-semibold text-2xl  text-black' >The most accurate AI math solver.</h1>
        <h2 className='font-semibold text-blue-600 mb-16'>Solving Math with Precision 🧠</h2>
    <div className='text-center grid grid-cols-2 gap-12'>
        
        <div>
            <p className='text-left'>
            Stuck on a math problem? Meet your new AI math helper and calculator with steps. MATHAI is the most accurate AI tool for solving math equations — in a recent test, 
            MATHAI was over 31% more accurate than GPT-4o.
            </p>
        </div>
        <div>
            <p className='text-left'>
            Our website harnesses the advanced capabilities of the Gemini API to deliver precise and reliable solutions for mathematical problems. By integrating Gemini's powerful algorithms,
             we ensure that users receive accurate answers and detailed explanations for their queries. 
            </p>
        </div>
      
    </div>
    </div>
  )
}

export default About
