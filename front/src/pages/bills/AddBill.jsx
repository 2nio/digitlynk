import React, { useRef, useEffect, useState } from 'react'

import AddClient from '../../components/AddClient';
import { usePost } from '../../hooks/usePost';
import { closePopup } from '../../functions/closePopup';
import { useFetch } from '../../hooks/useFetch';

function AddBill({ contactType, choose, billInfo, popupIncome, setPopup }) {

    const popupRef = useRef()
    const [clientInput, setClientInput] = useState('')
    const [clientId, setClientId] = useState()
    const [date, setDate] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [amount, setAmount] = useState('')
    const [number, setNumber] = useState('')
    const [note, setNote] = useState('')

    const { data: business, loading: loadingBusiness, fetchData: fetchBusiness } = useFetch('business')
    const { data: client, loading: loadingClient, fetchData: fetchClient } = useFetch('client')
    const { postData: postBill, loading: loadingPostBill } = usePost('bill')
    const { postData: editBill, loading: loadingEditBill } = usePost('editBill')

    const clearState = () => {
        setClientInput('reset')
        document.getElementById('AddBill_div_form').reset()
        setDate(''); setAmount(''); setNumber(''); setNote(''); setDueDate('')
    }

    useEffect(() => {
        setClientInput()
        popupIncome && popupRef.current.showModal()
    }, [popupIncome])

    useEffect(() => {
        closePopup(() => { popupRef.current.close(); setPopup(false); clearState() }, popupRef)
    }, [])

    useEffect(() => {
        setClientId(billInfo?.clientId?._id)
        setClientInput(billInfo?.clientId?.name)
        setAmount(billInfo?.amount); setDate(billInfo?.date); setDueDate(billInfo?.dueDate); setNumber(billInfo?.number); setNote(billInfo?.note)
    }, [billInfo])

    return (
        <dialog ref={popupRef} className='CreateInv_div_popup' style={{ height: '72%' }}>
            <h1 style={{ marginBottom: '40px' }}>{billInfo ? 'Edit bill' : 'Add bill'}</h1>
            <form id='AddBill_div_form' onSubmit={
                billInfo && number && date && dueDate && amount && clientId ? () => {
                    editBill({
                        id: billInfo._id, data: {
                            companyId: business?._id, clientId: clientId, number, date, dueDate, amount, note
                        }
                    }, () => { popupRef.current.close(); setPopup(false) })
                    clearState()
                    clearState()
                } : number && date && dueDate && amount && clientId ? () => {
                    postBill({
                        companyId: business?._id, clientId: clientId, number, date, dueDate, amount, note
                    }, () => { popupRef.current.close(); setPopup(false) })
                    clearState()
                } : !clientId ? (e) => {
                    setClientInput('Please fill this'); e.preventDefault();
                } : null
            }>
                <div className='CreateInv_div_popupInfo'>
                    <div className='CreateInv_div_popupInfoChild'>
                        <AddClient contactType={contactType} choose={choose} clientCompany={clientInput}
                            sendClient={data => setClientId(data)} />
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>DATE</p>
                            <input placeholder='Date' required defaultValue={date} type='date' className='CreateInv_input' onChange={e => setDate(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>DUE DATE</p>
                            <input placeholder='Due date' required defaultValue={dueDate} type='date' className='CreateInv_input' onChange={e => setDueDate(e.target.value)}></input>
                        </label>
                    </div>
                    <div className='CreateInv_div_popupInfoChild' >
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>NUMBER</p>
                            <input placeholder='Number' required defaultValue={number} className='CreateInv_input' onChange={e => setNumber(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>AMOUNT</p>
                            <input placeholder='Amount' required defaultValue={amount} className='CreateInv_input' onChange={e => setAmount(e.target.value)}></input>
                        </label>
                    </div>
                </div>
                <div className='CreateInv_div_popupInfoBottom'>
                    <label className='CreateInv_label'>
                        <p className='CreateInv_p_label'>NOTES</p>
                        <textarea onChange={e => setNote(e.target.value)} defaultValue={note} placeholder='Notes' />
                    </label>
                    <div className='CreateInv_div_bottomButtons'>
                        <button className='CreateInv_button_bottom' type='submit'>Save</button>
                        <button type='button' className='CreateInv_button_secondary'
                            onClick={e => { popupRef.current.close(); setPopup(false); clearState() }}>Cancel</button>
                    </div>
                </div>
            </form>
        </dialog >
    )
}

export default AddBill