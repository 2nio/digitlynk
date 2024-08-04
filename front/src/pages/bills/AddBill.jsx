import React, { useRef, useEffect, useState } from 'react'

import AddClient from '../../components/AddClient';
import { usePost } from '../../hooks/usePost';
import { closePopup } from '../../functions/closePopup';
import { useFetch } from '../../hooks/useFetch';

function AddBill({ contactType, choose, billInfo, popupIncome, setPopup }) {

    const popupRef = useRef()
    const [clientInput, setClientInput] = useState('')
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
        document.getElementById('CreateInv_div_form').reset()
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
        fetchClient({ params: { id: billInfo?.clientId } })
        setClientInput(billInfo?.clientCompany)
        setAmount(billInfo?.amount); setDate(billInfo?.date); setDueDate(billInfo?.dueDate); setNumber(billInfo?.number); setNote(billInfo?.note)
    }, [billInfo])

    return (
        <dialog ref={popupRef} className='CreateInv_div_popup' style={{ height: '72%' }}>
            <h1 style={{ marginBottom: '40px' }}>{billInfo ? 'Edit bill' : 'Add bill'}</h1>
            <form id='CreateInv_div_form'>
                <div className='CreateInv_div_popupInfo'>
                    <div className='CreateInv_div_popupInfoChild'>
                        <AddClient contactType={contactType} choose={choose} clientCompany={clientInput}
                            sendClient={data => fetchClient({ params: { id: data } })} />
                        <input required value={client?._id} style={{ display: 'none' }} />
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
                        <button className='CreateInv_button_bottom' type='submit'
                            onClick={billInfo && number && date && dueDate && amount && client?._id ? () => {
                                editBill({
                                    id: billInfo._id, data: {
                                        companyId: business?._id, clientId: client?._id, clientCompany: client?.company,
                                        number, date, dueDate, amount, note
                                    }
                                }, () => { popupRef.current.close(); setPopup(false) })
                                clearState()
                                clearState()
                            } : number && date && dueDate && amount && client?._id ? () => {
                                postBill({
                                    companyId: business?._id, clientId: client?._id, clientCompany: client?.company,
                                    number, date, dueDate, amount, note
                                }, () => { popupRef.current.close(); setPopup(false) })
                                clearState()
                            } : !client?._id ? () => setClientInput('Please fill this') : null
                            }>Save</button>
                        <button type='button' className='CreateInv_button_bottom'
                            onClick={e => { popupRef.current.close(); setPopup(false); clearState() }}>Cancel</button>
                    </div>
                </div>
            </form>
        </dialog >
    )
}

export default AddBill