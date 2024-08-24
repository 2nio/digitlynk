import React from 'react'

import './Navbar.css'

function Navbar() {
  return (
    <nav className='Nav_nav_navbar'>
      <a href='/' className='Navbar_a_logo'>
        <div className='Navbar_div_logo'><img className='Navbar_img_logo' src='./linkincon_new.png'></img>Fluxloop</div>
      </a>
      <ul>
        <li>
          <a href='https://github.com/2nio' target='blank'>CONTACT</a>
        </li>
        <li>
          <a href='/signup'>SIGN UP</a>
        </li>

        <li>
          <a href='/myaccount'>LOG IN</a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar