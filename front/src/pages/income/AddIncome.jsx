import React, { useRef, useEffect, useState } from 'react'

import AddClient from '../../components/AddClient';
import { usePost } from '../../hooks/usePost';
import { closePopup } from '../../functions/closePopup';
import { useFetch } from '../../hooks/useFetch';

function AddIncome({ choose, invoiceInfo, popupIncome, setPopup }) {

    const popupRef = useRef()
    const [clientInput, setClientInput] = useState('')
    const [type, setType] = useState('Income')
    const [bank, setBank] = useState('')
    const [IBAN, setIBAN] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [number, setNumber] = useState('')
    const [category, setCategory] = useState('')
    const [notes, setNotes] = useState('')

    const { data: business, loading: loadingBusiness, fetchData: fetchBusiness } = useFetch('business')
    const { data: client, loading: loadingClient, fetchData: fetchClient } = useFetch('client')
    const { postData: postIncome, loading: loadingIncome } = usePost('income')

    const clearState = () => {
        setClientInput('reset')
        document.getElementById('CreateInv_div_form').reset()
        setType('Income'); setBank(''); setIBAN(''); setDate(''); setAmount(''); setNumber(''); setCategory(''); setNotes('')
    }

    useEffect(() => {
        setClientInput()
        popupIncome && popupRef.current.showModal()
    }, [popupIncome])

    useEffect(() => {
        closePopup(() => { popupRef.current.close(); setPopup(false) }, popupRef)
    }, [])

    useEffect(() => {
        fetchClient({ params: { id: invoiceInfo?.clientId } })
        setAmount(invoiceInfo?.productList.reduce((a, v) => a = a + v.amount, 0))
    }, [invoiceInfo])


    return (
        <dialog ref={popupRef} className='CreateInv_div_popup' style={{ height: '72%' }}>
            <h1 style={{ marginBottom: '16px' }}>Add income</h1>
            <form id='CreateInv_div_form'>
                <div className='CreateInv_div_popupInfo'>
                    <div className='CreateInv_div_popupInfoChild'>
                        <AddClient choose={choose} clientCompany={invoiceInfo?.clientCompany || clientInput} sendClient={data => fetchClient({ params: { id: data } })} />
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
                            <p className='CreateInv_p_label'>NUMBER</p>
                            <input placeholder='Number' className='CreateInv_input' onChange={e => setNumber(e.target.value)}></input>
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
                            <input placeholder='Amount' defaultValue={amount} className='CreateInv_input' onChange={e => setAmount(e.target.value)}></input>
                        </label>
                    </div>
                </div>
                <div className='CreateInv_div_popupInfoBottom'>
                    <label className='CreateInv_label'>
                        <p className='CreateInv_p_label'>NOTES</p>
                        <textarea onChange={e => setNotes(e.target.value)} placeholder='Notes' />
                    </label>
                    <div className='CreateInv_div_bottomButtons'>
                        <button className='CreateInv_button_bottom' type='button'
                            onClick={() => {
                                postIncome({
                                    companyId: business?._id, clientId: client?._id, clientCompany: client?.company,
                                    invoice: invoiceInfo?.number, type, bank, IBAN, number, category, date, amount, notes
                                }, () => { popupRef.current.close(); setPopup(false) })
                                clearState()
                            }
                            }>Save</button>
                        <button type='button' className='CreateInv_button_bottom'
                            onClick={e => { popupRef.current.close(); setPopup(false); clearState() }}>Cancel</button>
                    </div>
                </div>
            </form>
        </dialog >
    )
}

export default AddIncome