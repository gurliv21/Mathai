import React from 'react'

function Footer() {
  return (
    <footer className="bg-blue-500 text-white py-6 mt-auto opacity-85">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          
        <div className="text-center mt-6">
          <p className="text-white text-xl font-semibold">
            &copy; {new Date().getFullYear()} Gurliv kaur Bajwa
          </p>
          </div>
        </div>
      </footer>

  )
}

export default Footer