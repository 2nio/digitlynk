import React, { useRef, useEffect, useState } from 'react'

import axios from 'axios'
import { IoAdd } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

import Nav from '../../components/menu/Menu'
import Dropdown from '../../components/dropdown-menu/Dropdown';
import AddBill from './AddBill';


function Bills() {
    axios.defaults.withCredentials = true

    const [menu, setMenu] = useState('')
    const [dropmenu, setDropMenu] = useState(false)
    const [popup, setPopup] = useState(false)

    useEffect(() => {
        document.title = "DigitLynk | Bills"
    }, [])

    const invoiceList = [
        {
            date: '16/8/2024',
            dueDate: '28/10/2004',
            company: 'Dedeman',
            category: 'Construction',
            amount: 280
        },
        {
            date: '10/6/2024',
            dueDate: '12/6/2004',
            company: 'SmartExpo',
            category: 'Rent',
            amount: 420
        },
        {
            date: '12/8/2024',
            dueDate: '18/8/2004',
            company: 'Nucleao',
            category: 'Utilities',
            amount: 69
        }
    ]

    return (
        <div className='All_div_main'>
            <Nav />

            <AddBill popup={popup} setPopup={value => setPopup(value)} />

            <div className='Revenue_div_second'>
                <h1 style={{ marginBottom: '24px' }}>Bills</h1>
                <div className='Revenue_div_entryCrit'>
                    <p className='Revenue_p_crit'>NO</p>
                    <p className='Revenue_p_crit'>DATE</p>
                    <p className='Revenue_p_crit'>DUE</p>
                    <p className='Revenue_p_crit'>TO</p>
                    <p className='Revenue_p_crit'>CATEGORY</p>
                    <p className='Revenue_p_crit'>AMOUNT</p>
                    <div style={{ width: '20px' }}><IoAdd size={'1.4rem'} onClick={e => setPopup(true)} /></div>
                </div>

                {invoiceList.map(item =>
                    <div className='Revenue_div_entry'>
                        <p className='Revenue_p_critInfo'>{invoiceList.indexOf(item) + 1}</p>
                        <p className='Revenue_p_critInfo'>{item.date}</p>
                        <p className='Revenue_p_critInfo'>{item.dueDate}</p>
                        <p className='Revenue_p_critInfo'>{item.company}</p>
                        <p className='Revenue_p_critInfo'>{item.category}</p>
                        <p className='Revenue_p_critAmount'>{item.amount}€</p>
                        <div style={{ width: '20px' }}>
                            <IoMdArrowDropdown onClick={e => { setDropMenu(!dropmenu); setMenu(invoiceList.indexOf(item) + 1) }} size={'1.6rem'} />
                            <Dropdown menuOptions={['View', 'Receive', 'Edit', 'Delete']} parentState={value => setDropMenu(value)}
                                displayMenu={dropmenu && menu === invoiceList.indexOf(item) + 1} />
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Bills
