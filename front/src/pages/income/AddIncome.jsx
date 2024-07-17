import React, { useRef, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import axios from 'axios'

import AddClient from '../../components/AddClient';
import { usePost } from '../../hooks/usePost';
import { closePopup } from '../../functions/closePopup';

function AddIncome({ popupIncome, setPopup }) {

    const navigate = useNavigate()

    const popupRef = useRef()
    const [client, setClient] = useState("")
    const [type, setType] = useState('Income')
    const [bank, setBank] = useState('')
    const [IBAN, setIBAN] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [invoiceNr, setInvoiceNr] = useState('')
    const [category, setCategory] = useState('')
    const [notes, setNotes] = useState('')

    const { postData: postIncome, loading: loadingIncome } = usePost('income')

    useEffect(() => {
        popupIncome && popupRef.current.showModal()
    }, [popupIncome])

    useEffect(() => {
        closePopup(() => { popupRef.current.close(); setPopup(false) }, popupRef)
    }, [])

    const createIncome = () => {
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/income`, { client, type, bank, IBAN, invoiceNr, category, date, amount, notes })
            .then(res => console.log(res))
            .catch(err => {
                console.log(err)
                if (err.response.data.error === 'ExpiredRefreshToken') {
                    navigate('/login')
                }
            })
    }

    return (
        <dialog ref={popupRef} className='CreateInv_div_popup' style={{ height: '72%' }}>
            <h1 style={{ marginBottom: '16px' }}>Add income</h1>
            <div className='CreateInv_div_popupInfo'>
                <div className='CreateInv_div_popupInfoChild'>
                    <AddClient sendClient={data => setClient(data)} />
                    <label className='CreateInv_label'>
                        <p className='CreateInv_p_label'>TYPE</p>
                        <select className='CreateInv_select' onChange={e => setType(e.target.value)}>
                            <option value="Income">Income</option>
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
                        <p className='CreateInv_p_label'>INVOICE NUMBER</p>
                        <input placeholder='Number' className='CreateInv_input' onChange={e => setInvoiceNr(e.target.value)}></input>
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
                    <textarea onChange={e => setNotes(e.target.value)} placeholder='Notes' />
                </label>
                <div className='CreateInv_div_bottomButtons'>
                    <button className='CreateInv_button_bottom' onClick={createIncome}>Save</button>
                    <button className='CreateInv_button_bottom' onClick={e => { popupRef.current.close(); setPopup(false) }}>Cancel</button>
                </div>
            </div>
        </dialog>
    )
}

export default AddIncome