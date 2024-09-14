import React from 'react'

function Header() {
  return ( 
    <header className='flex items-center justify-between gap-4 p-4'>
          <h1 className= 'font-semibold text-2xl sm:text-3xl md:text-4xl '>MATH<span className= 'text-blue-400 bold'>AI</span></h1>
          <button className='flex items-center gap-2 specialBtn px-4 py-2 rounded-lg text-blue-400' onClick={() => window.location.href = 'https://github.com/gurliv21/Mathai'}>
            <p className='font-semibold'>Code</p>
            
          </button>

        </header>
  )
}

export default Header
