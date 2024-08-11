import React, { useRef, useEffect, useState } from 'react'

import AddClient from '../../components/AddClient';
import { usePost } from '../../hooks/usePost';
import { closePopup } from '../../functions/closePopup';
import { useFetch } from '../../hooks/useFetch';

function AddIncome({ contactType, choose, incomeInfo, invoiceInfo, popupIncome, setPopup }) {

    const popupRef = useRef()
    const [clientInput, setClientInput] = useState('')
    const [clientId, setClientId] = useState()
    const [type, setType] = useState('Income')
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
    const { postData: postIncome, loading: loadingIncome } = usePost('income')
    const { postData: editIncome, loading: loadingEditIncome } = usePost('editIncome')
    const { postData: editInvoice, loading: loadingEditInvoice } = usePost('editInvoice')

    const clearState = () => {
        setClientInput('reset')
        setClientId()
        document.getElementById('AddIncome_div_form').reset()
        setType('Income'); setBank(''); setIBAN(''); setDate(''); setAmount(''); setNumber(''); setCategory(''); setNotes('')
    }

    useEffect(() => {
        setClientInput()
        popupIncome && popupRef.current.showModal()
    }, [popupIncome])

    useEffect(() => {
        closePopup(() => { popupRef.current.close(); setPopup(false); clearState(); }, popupRef)
    }, [])

    useEffect(() => {
        setClientId(invoiceInfo?.clientId?._id)
        setClientInput(invoiceInfo?.clientId?.name)
        setAmount(((invoiceInfo?.productList.reduce((a, v) => a = a + v.amount, 0) +
            invoiceInfo?.productList.reduce((a, v) => a = a + v.amount, 0) * 0.08).toFixed(2) -
            invoiceInfo?.payment.reduce((a, v) => a + v.amount, 0).toFixed(2)).toFixed(2))
        setMaxAmount(((invoiceInfo?.productList.reduce((a, v) => a = a + v.amount, 0) +
            invoiceInfo?.productList.reduce((a, v) => a = a + v.amount, 0) * 0.08).toFixed(2) -
            invoiceInfo?.payment.reduce((a, v) => a + v.amount, 0).toFixed(2)).toFixed(2))
    }, [invoiceInfo])

    useEffect(() => {
        setClientId(incomeInfo?.clientId?._id)
        setClientInput(incomeInfo?.clientId?.name)
        setAmount(incomeInfo?.amount); setBank(incomeInfo?.bank); setIBAN(incomeInfo?.IBAN); setCategory(incomeInfo?.category);
        setDate(incomeInfo?.date); setNumber(incomeInfo?.number); setNotes(incomeInfo?.notes); setType(incomeInfo?.type)
    }, [incomeInfo])

    return (
        <dialog ref={popupRef} className='CreateInv_div_popup' style={{ height: '72%' }}>
            <h1 style={{ marginBottom: '16px' }}>{incomeInfo ? 'Edit income' : 'Add income'}</h1>
            <form id='AddIncome_div_form' onSubmit={
                null
            }>
                <div className='CreateInv_div_popupInfo'>
                    <div className='CreateInv_div_popupInfoChild'>
                        <AddClient contactType={contactType} choose={choose} formId={'Income'}
                            clientCompany={clientInput} sendClient={data => setClientId(data)} />
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>TYPE</p>
                            <select className='CreateInv_select' value={type} onChange={e => setType(e.target.value)}>
                                <option value="Income">Income</option>
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
                            <input placeholder='Category' defaultValue={category} className='CreateInv_input'
                                onChange={e => setCategory(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>DATE</p>
                            <input placeholder='Date' required defaultValue={date} type='date' className='CreateInv_input'
                                onChange={e => setDate(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>AMOUNT</p>
                            <input placeholder='Amount' type='number' required defaultValue={amount} min='.1' step={'any'} max={maxAmount}
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
                        <button className='CreateInv_button_bottom' type='submit' onClick={

                            incomeInfo && date && amount && clientId ? () => {
                                editIncome({
                                    id: incomeInfo._id, data: {
                                        companyId: business?._id, clientId: clientId, invoice: invoiceInfo?._id,
                                        type, bank, IBAN, number, category, date, amount, notes
                                    }
                                }, () => { popupRef.current.close(); setPopup(false) })
                                clearState()
                            } : date && amount && clientId && amount >= 0.1 && amount <= maxAmount ? () => {
                                postIncome({
                                    companyId: business?._id, clientId: clientId, invoice: invoiceInfo?._id,
                                    type, bank, IBAN, number, category, date, amount, notes
                                }, () => { popupRef.current.close(); setPopup(false) })
                                clearState()
                            } : !clientId ? (e) => {
                                setClientInput('Please fill this'); e.preventDefault();
                            } : null
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