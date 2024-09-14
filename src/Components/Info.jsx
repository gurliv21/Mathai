import React from 'react'

function Info() {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full max-w-9xl mx-auto p-6 m-9 mb-9'>

  <div className='bg-white p-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out shadow-md shadow-blue-200'>
    <h2 className='text-xl'>÷</h2>
    <h3 className='text-xl font-bold'>Equations</h3>
    <p>Solve for the value of unknown variables.</p>
  </div>
  <div className='bg-white p-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out shadow-md shadow-blue-200'>
    <h2>( )</h2>
    <h3 className='text-xl font-bold'>Factoring</h3>
    <p>Easily break down polynomials.</p>
  </div>
  <div className='bg-white p-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out shadow-md shadow-blue-200'>
    <h2>→</h2>
    <h3 className='text-xl font-bold'>Simplifying Expressions</h3>
    <p>Perform proper order of operations.</p>
  </div>
  <div className='bg-white p-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out shadow-md shadow-blue-200'>
    <h2>√</h2>
    <h3 className='text-xl font-bold'>Square Roots</h3>
    <p>Find the square root of any number.</p>
  </div>
  <div className='bg-white p-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out shadow-md shadow-blue-200'>
    <h2>∫</h2>
    <h3 className='text-xl font-bold'>Integration</h3>
    <p>Calculate integrals for complex functions.</p>
  </div>
  <div className='bg-white p-4 rounded-2xl hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out shadow-md shadow-blue-200'>
    <h2>∑</h2>
    <h3 className='text-xl font-bold'>Summation</h3>
    <p>Compute the sum of a sequence of numbers.</p>
  </div>
</div>

  )
}

export default Info
