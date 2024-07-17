import React from 'react'

import './Navbar.css'

function Navbar() {
  return (
      <nav className='Nav_nav_navbar'>
        <a href='/' className='Navbar_a_logo'>
          <div className='Navbar_div_logo'><img className='Navbar_img_logo' src='./linkincon.png'></img>DigitLynk</div>
        </a>
        <ul>
          <li>
            <a href='/workflow'>WORKFLOW</a>
          </li>
          <li>
            <a href='/solutions'>SOLUTIONS</a>
          </li>
          <li>
            <a href='/pricing'>PRICING</a>
          </li>
          <li>
            <a href='/contact'>CONTACT</a>
          </li>
          <li>
            <a href='/login'>LOGIN</a>
          </li>

        </ul>
      </nav>
  )
}

export default Navbar