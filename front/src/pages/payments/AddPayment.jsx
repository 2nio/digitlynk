import React, { useRef, useEffect, useState } from 'react'

import AddClient from '../../components/AddClient';
import { usePost } from '../../hooks/usePost';
import { closePopup } from '../../functions/closePopup';
import { useFetch } from '../../hooks/useFetch';

function AddPayment({ contactType, choose, paymentInfo, billInfo, popupPayment, setPopup }) {

    const popupRef = useRef()
    const [clientInput, setClientInput] = useState('')
    const [clientId, setClientId] = useState()
    const [type, setType] = useState('Payment')
    const [bank, setBank] = useState('')
    const [IBAN, setIBAN] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [maxAmount, setMaxAmount] = useState('')
    const [number, setNumber] = useState('')
    const [category, setCategory] = useState('')
    const [notes, setNotes] = useState('')

    const { data: business, loading: loadingBusiness, fetchData: fetchBusiness } = useFetch('business')
    const { data: client, loading: loadingClient, fetchData: fetchClient } = useFetch('client')
    const { postData: postPayment, loading: loadingPayment } = usePost('payment')
    const { postData: editPayment, loading: loadingEditPayment } = usePost('editPayment')

    const clearState = () => {
        setClientInput('reset')
        document.getElementById('AddPayment_div_form').reset()
        setType('Payment'); setBank(''); setIBAN(''); setDate(''); setAmount(''); setNumber(''); setCategory(''); setNotes('')
    }

    useEffect(() => {
        setClientInput()
        popupPayment && popupRef.current.showModal()
    }, [popupPayment])

    useEffect(() => {
        closePopup(() => { popupRef.current.close(); setPopup(false); clearState(); }, popupRef)
    }, [])

    useEffect(() => {
        setClientId(billInfo?.clientId?._id)
        setClientInput(billInfo?.clientId?.name)
        setAmount((billInfo?.amount - billInfo?.payment?.reduce((a, v) => a + v.amount, 0)).toFixed(2))
        setMaxAmount((billInfo?.amount - billInfo?.payment?.reduce((a, v) => a + v.amount, 0)).toFixed(2))
    }, [billInfo])

    useEffect(() => {
        setClientId(paymentInfo?.clientId?._id)
        setClientInput(paymentInfo?.clientId?.name)
        setAmount(paymentInfo?.amount); setBank(paymentInfo?.bank); setIBAN(paymentInfo?.IBAN); setCategory(paymentInfo?.category);
        setDate(paymentInfo?.date); setNumber(paymentInfo?.number); setNotes(paymentInfo?.notes); setType(paymentInfo?.type)
    }, [paymentInfo])


    return (
        <dialog ref={popupRef} className='CreateInv_div_popup' style={{ height: '72%' }}>
            <h1 style={{ marginBottom: '16px' }}>{paymentInfo ? 'Edit payment' : 'Add payment'}</h1>
            <form id='AddPayment_div_form' onSubmit={
                paymentInfo && date && amount && clientId ? () => {
                    editPayment({
                        id: paymentInfo._id, data: {
                            companyId: business?._id, clientId: clientId, bill: billInfo?._id, type, bank, IBAN, number, category, date, amount, notes
                        }
                    }, () => { popupRef.current.close(); setPopup(false) })
                    clearState()
                } : date && amount && clientId ? () => {
                    postPayment({
                        companyId: business?._id, clientId: clientId, bill: billInfo?._id, type, bank, IBAN, number, category, date, amount, notes
                    }, () => { popupRef.current.close(); setPopup(false) })
                    clearState()
                } : !clientId ? (e) => {
                    setClientInput('Please fill this'); e.preventDefault();
                } : null
            }>
                <div className='CreateInv_div_popupInfo'>
                    <div className='CreateInv_div_popupInfoChild'>
                        <AddClient contactType={contactType} choose={choose}
                            clientCompany={clientInput}
                            sendClient={data => setClientId(data)} />
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>TYPE</p>
                            <select className='CreateInv_select' value={type} onChange={e => setType(e.target.value)}>
                                <option value="Payment">Payment</option>
                                <option value="Receipt">Receipt</option>
                                <option value="Card">Card</option>
                                <option value="Bank transfer">Bank transfer</option>
                                <option value="Cash">Cash</option>
                                <option value="Check">Check</option>
                            </select>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>BANK</p>
                            <input placeholder='Bank' defaultValue={bank} className='CreateInv_input' onChange={e => setBank(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>IBAN</p>
                            <input placeholder='IBAN' defaultValue={IBAN} className='CreateInv_input' onChange={e => setIBAN(e.target.value)}></input>
                        </label>
                    </div>
                    <div className='CreateInv_div_popupInfoChild' >
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>NUMBER</p>
                            <input placeholder='Number' defaultValue={number} className='CreateInv_input' onChange={e => setNumber(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>CATEGORY</p>
                            <input placeholder='Category' defaultValue={category} className='CreateInv_input' onChange={e => setCategory(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>DATE</p>
                            <input placeholder='Date' required defaultValue={date} type='date' className='CreateInv_input' onChange={e => setDate(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>AMOUNT</p>
                            <input placeholder='Amount' required defaultValue={amount} type='number' min='.1' step={'any'} max={maxAmount}
                                className='CreateInv_input' onChange={e => setAmount(e.target.value)}></input>
                        </label>
                    </div>
                </div>
                <div className='CreateInv_div_popupInfoBottom'>
                    <label className='CreateInv_label'>
                        <p className='CreateInv_p_label'>NOTES</p>
                        <textarea onChange={e => setNotes(e.target.value)} defaultValue={notes} placeholder='Notes' />
                    </label>
                    <div className='CreateInv_div_bottomButtons'>
                        <button className='CreateInv_button_bottom' type='submit'>Save</button>
                        <button type='button' className='CreateInv_button_bottom'
                            onClick={e => { popupRef.current.close(); setPopup(false); clearState() }}>Cancel</button>
                    </div>
                </div>
            </form>
        </dialog >
    )
}

export default AddPayment