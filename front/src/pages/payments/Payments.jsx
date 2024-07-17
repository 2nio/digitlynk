import React, { useRef, useEffect, useState } from 'react'

import axios from 'axios'
import { IoAdd } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";

import Menu from '../../components/menu/Menu'
import Dropdown from '../../components/dropdown-menu/Dropdown';
import AddPayment from './AddPayment';

function Payments() {
    axios.defaults.withCredentials = true

    const [menu, setMenu] = useState('')
    const [dropmenu, setDropMenu] = useState(false)
    const [popup, setPopup] = useState(false)

    useEffect(() => {
        document.title = "DigitLynk | Payments"
      }, [])

    const invoiceList = [
        {
            date: '16/8/2024',
            type: 'Payment',
            company: 'Augmenter Group',
            bill: '0001',
            amount: 2
        },
        {
            date: '10/6/2024',
            type: 'Payment',
            company: 'Amazon',
            bill: '0002',
            amount: 20
        },
        {
            date: '12/8/2024',
            type: 'Payment',
            company: 'Nucleao',
            bill: '0003',
            amount: 69
        }
    ]

    return (
        <div className='All_div_main'>
            <Menu />

            <AddPayment popup={popup} setPopup={value => setPopup(value)} />

            <div className='Revenue_div_second'>
                <h1 style={{ marginBottom: '24px' }}>Payments</h1>
                <div className='Revenue_div_entryCrit'>
                    <p className='Revenue_p_crit'>NO</p>
                    <p className='Revenue_p_crit'>TYPE</p>
                    <p className='Revenue_p_crit'>DATE</p>
                    <p className='Revenue_p_crit'>TO</p>
                    <p className='Revenue_p_crit'>BILL</p>
                    <p className='Revenue_p_crit'>AMOUNT</p>
                    <div style={{ width: '20px' }}><IoAdd size={'1.4rem'} onClick={e => setPopup(true)} /></div>
                </div>

                {invoiceList.map(item =>
                    <div className='Revenue_div_entry'>
                        <p className='Revenue_p_critInfo'>{invoiceList.indexOf(item) + 1}</p>
                        <p className='Revenue_p_critInfo'>{item.type}</p>
                        <p className='Revenue_p_critInfo'>{item.date}</p>
                        <p className='Revenue_p_critInfo'>{item.company}</p>
                        <p className='Revenue_p_critInfo'>{item.bill}</p>
                        <p className='Revenue_p_critAmount'>{item.amount}€</p>
                        <div style={{ width: '20px' }}>
                            <IoMdArrowDropdown onClick={e => { setDropMenu(true); setMenu(invoiceList.indexOf(item) + 1) }} size={'1.6rem'} />
                            <Dropdown menuOptions={['View', 'Receive', 'Edit', 'Delete']} parentState={value => setDropMenu(value)} displayMenu={dropmenu && menu === invoiceList.indexOf(item) + 1} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Payments