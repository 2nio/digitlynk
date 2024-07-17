import React, { useRef, useEffect, useState } from 'react'

import AddClient from '../../components/AddClient';
import AddProvider from '../../components/AddProvider';

function AddPayment({ popup, setPopup }) {

    const popupRef = useRef()
    const [type, setType] = useState('')
    const [bank, setBank] = useState('')
    const [IBAN, setIBAN] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [billNr, setBillNr] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        popup && popupRef.current.showModal()
    }, [popup])

    useEffect(() => {
        popupRef.current.addEventListener('click', e => {
            const popupDimensions = popupRef.current.getBoundingClientRect()
            if (
                e.clientX < popupDimensions.left ||
                e.clientX > popupDimensions.right ||
                e.clientY < popupDimensions.top ||
                e.clientY > popupDimensions.bottom
            ) {
                popupRef.current.close()
                setPopup(false)
            }
        })
    }, [])

    return (
        <dialog ref={popupRef} className='CreateInv_div_popup' style={{ height: '72%' }}>
            <h1 style={{ marginBottom: '16px' }}>Add bill</h1>
            <div className='CreateInv_div_popupInfo'>
                <div className='CreateInv_div_popupInfoChild'>
                    <AddProvider />
                    <label className='CreateInv_label'>
                        <p className='CreateInv_p_label'>TYPE</p>
                        <select className='CreateInv_select' onChange={e => setType(e.target.value)}>
                            <option value="Income">Payment</option>
                            <option value="Receipt">Receipt</option>
                            <option value="Card">Card</option>
                            <option value="Card">Bank transfer</option>
                            <option value="Card">Cash</option>
                            <option value="Card">Check</option>
                        </select>
                    </label>
                    <label className='CreateInv_label'>
                        <p className='CreateInv_p_label'>BANK</p>
                        <input placeholder='Bank' className='CreateInv_input' onChange={e => setBank(e.target.value)}></input>
                    </label>
                    <label className='CreateInv_label'>
                        <p className='CreateInv_p_label'>IBAN</p>
                        <input placeholder='IBAN' className='CreateInv_input' onChange={e => setIBAN(e.target.value)}></input>
                    </label>
                </div>
                <div className='CreateInv_div_popupInfoChild' >
                    <label className='CreateInv_label'>
                        <p className='CreateInv_p_label'>BILL NUMBER</p>
                        <input placeholder='Number' className='CreateInv_input' onChange={e => setBillNr(e.target.value)}></input>
                    </label>
                    <label className='CreateInv_label'>
                        <p className='CreateInv_p_label'>CATEGORY</p>
                        <input placeholder='Category' className='CreateInv_input' onChange={e => setCategory(e.target.value)}></input>
                    </label>
                    <label className='CreateInv_label'>
                        <p className='CreateInv_p_label'>DATE</p>
                        <input placeholder='Date' type='date' className='CreateInv_input' onChange={e => setDate(e.target.value)}></input>
                    </label>
                    <label className='CreateInv_label'>
                        <p className='CreateInv_p_label'>AMOUNT</p>
                        <input placeholder='Amount' className='CreateInv_input' onChange={e => setAmount(e.target.value)}></input>
                    </label>
                </div>
            </div>
            <div className='CreateInv_div_popupInfoBottom'>
                <label className='CreateInv_label'>
                    <p className='CreateInv_p_label'>NOTES</p>
                    <textarea placeholder='Notes' />
                </label>
                <div className='CreateInv_div_bottomButtons'>
                    <button className='CreateInv_button_bottom'>SAVE</button>
                    <button className='CreateInv_button_bottom' onClick={e => { popupRef.current.close(); setPopup(false) }}>CANCEL</button>
                </div>
            </div>
        </dialog>
    )
}

export default AddPayment