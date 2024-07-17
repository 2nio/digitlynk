import React from 'react'

import About from './components/About'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
    </div>
  )
}

export default Home