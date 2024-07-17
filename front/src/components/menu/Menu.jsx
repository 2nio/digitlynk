import React, { useState } from 'react'

import './Menu.css'
import Overview from './overview/Overview'

function Navbar() {

  const [popup, setPopup] = useState(false)

  return (
    <nav className='Nav_nav_navbar'>
      <ul className='Nav_ul_navbar'>
        <li>
          <a href='/dashboard'>DASHBOARD</a>
        </li>
        <li>
          <div className='Nav_div_allRevenue'>
            <a style={{ cursor: 'pointer' }}>REVENUE</a>
            <div className='Nav_div_revenueAndExpenses'>
              <a href='/invoices' className='Nav_a_revenue'>INVOICES</a>
              <a href='/income' className='Nav_a_revenue'>INCOME</a>
            </div>
          </div>
        </li>
        <li>
          <div className='Nav_div_allExpenses'>
            <a style={{ cursor: 'pointer' }}>EXPENSES</a>
            <div className='Nav_div_revenueAndExpenses'>
              <a href='/bills' className='Nav_a_revenue'>BILLS</a>
              <a href='/payments' className='Nav_a_revenue'>PAYMENTS</a>
            </div>
          </div>
        </li>
        <li>
          <a style={{ cursor: 'pointer' }} onClick={e => setPopup(true)}>OVERVIEW</a>
          <Overview popupState={popup} setPopup={value => setPopup(value)} />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar