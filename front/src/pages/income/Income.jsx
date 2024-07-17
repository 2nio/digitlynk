import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'
import { IoAdd } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

import Menu from '../../components/menu/Menu'
import AddIncome from './AddIncome';
import { useFetch } from '../../hooks/useFetch';

function Income() {

    const [menu, setMenu] = useState('')
    const [dropmenu, setDropMenu] = useState(false)
    const [popupIncome, setPopupIncome] = useState(false)
    const dropmenuRef = useRef([])

    const { data: income, loading: loadingIncome, fetchData: fetchIncome } = useFetch('income')

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!dropmenuRef.current.contains(e.target)) {
                setDropMenu(false)
            }
        }
        if (dropmenu) document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    })

    return (
        <div className='All_div_main'>
            <Menu />

            <AddIncome popupIncome={popupIncome} setPopup={data => setPopupIncome(data)} />

            {loadingIncome ? <div>Loading...</div>
                : income &&
                <div className='Revenue_div_second'>
                    <h1 style={{ marginBottom: '24px' }}>Income</h1>
                    <div className='Revenue_div_entryCrit'>
                        <p className='Revenue_p_crit'>NO</p>
                        <p className='Revenue_p_crit'>TYPE</p>
                        <p className='Revenue_p_crit'>DATE</p>
                        <p className='Revenue_p_crit'>TO</p>
                        <p className='Revenue_p_crit'>INVOICE</p>
                        <p className='Revenue_p_crit'>AMOUNT</p>
                        <div style={{ width: '20px' }}><IoAdd onClick={e => setPopupIncome(true)} size={'1.4rem'} /></div>
                    </div>

                    {income?.map((item, index) =>
                        <div className='Revenue_div_entry'>
                            <p className='Revenue_p_critInfo'>{income.indexOf(item) + 1}</p>
                            <p className='Revenue_p_critInfo'>{item.type}</p>
                            <p className='Revenue_p_critInfo'>{item.date}</p>
                            <p className='Revenue_p_critInfo'>{item.client}</p>
                            <p className='Revenue_p_critInfo'>{item.invoiceNr}</p>
                            <p className='Revenue_p_critAmount'>{item.amount}€</p>
                            <div ref={(element) => dropmenuRef.current[index] = element} style={{ width: '20px' }}>
                                <RiArrowDropDownLine onClick={e => { setDropMenu(!dropmenu); setMenu(index) }} size={'1.6rem'} />
                                <div className='Dropdown_div' style={{ display: menu === index && dropmenu && 'flex' }}>
                                    <ul>
                                        <li>View</li>
                                        <li>Receive</li>
                                        <li>Edit</li>
                                        <li>Delete</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>}
        </div>
    )
}

export default Income