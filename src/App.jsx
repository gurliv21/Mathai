import React, { useState } from 'react';
import Header from './Components/Header';
import HomePage from './Components/HomePage';
import Info from './Components/Info';

import About from './Components/About';
import Footer from './Components/Footer';

function App() {



  return (
    <div>
      <div className="flex flex-col max-w-[1000px] mx-auto w-full min-h-screen">
        <section className="min-h-screen flex flex-col flex-1">
          <HomePage />
          <Info />
          <About />

        </section>
        
      </div>
      <Footer/>
    </div>
  );
}

export default App;

