import React, { useEffect, useRef, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { usePost } from '../hooks/usePost'
import { closePopup } from '../functions/closePopup'

function Client({ contactType, showDialog, closeDialog, client, formId }) {

    const { postData: postClient, loading: loadingClient } = usePost('client')
    const { postData: editClient } = usePost('editClient')
    const { postData: deleteClient } = usePost('deleteClient')

    const popupRef = useRef()
    const [name, setName] = useState("")
    const [CIN, setCIN] = useState("")
    const [bank, setBank] = useState("")
    const [IBAN, setIBAN] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [website, setWebsite] = useState("")
    const [notes, setNotes] = useState("")

    const clearState = () => {
        document.getElementById(`${formId}_form`).reset()
        setName(); setCIN(); setBank(); setIBAN(); setAddress(); setPhone(); setEmail(); setWebsite(); setNotes()
    }

    useEffect(() => {
        closePopup(() => {
            popupRef.current.close()
            clearState()
            closeDialog(false)
        }, popupRef)
    }, [])

    useEffect(() => {
        showDialog && popupRef.current.showModal();
    }, [showDialog])

    useEffect(() => {
        client?.id && deleteClient({ id: client?.id })
        setName(client?.name); setCIN(client?.CIN); setBank(client?.bank); setIBAN(client?.IBAN); setAddress(client?.address);
        setPhone(client?.phone); setEmail(client?.email); setWebsite(client?.website); setNotes(client?.notes)
    }, [client])

    const createClient = (e) => {
        clearState()
        closeDialog(false)
        popupRef.current.close()
    }

    return (
        <dialog ref={popupRef} className='CreateInv_div_popup'>
            <h1 style={{ marginBottom: '16px' }}>Add {contactType === 'client' ? 'client' : 'provider'}</h1>
            <form id={`${formId}_form`} onSubmit={
                null
            }>
                <div className='CreateInv_div_popupInfo'>
                    <div className='CreateInv_div_popupInfoChild'>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>NAME</p>
                            <input placeholder='Name' defaultValue={name} className='CreateInv_input' onChange={e => setName(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>CIN</p>
                            <input placeholder='Company' defaultValue={CIN} className='CreateInv_input' onChange={e => setCIN(e.target.value)}></input>
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
                    <div className='CreateInv_div_popupInfoChild'>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>ADDRESS</p>
                            <input placeholder='Address' defaultValue={address} className='CreateInv_input' onChange={e => setAddress(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>PHONE</p>
                            <input placeholder='Phone' defaultValue={phone} className='CreateInv_input' onChange={e => setPhone(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>EMAIL</p>
                            <input placeholder='Email' defaultValue={email} className='CreateInv_input' onChange={e => setEmail(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>WEBSITE</p>
                            <input placeholder='Website' defaultValue={website} className='CreateInv_input' onChange={e => setWebsite(e.target.value)}></input>
                        </label>
                    </div>
                </div>
                <div className='CreateInv_div_popupInfoBottom'>
                    <label className='CreateInv_label'>
                        <p className='CreateInv_p_label' onChange={e => setNotes(e.target.value)}>NOTES</p>
                        <textarea placeholder='Notes' />
                    </label>
                    <div className='CreateInv_div_bottomButtons'>
                        <button className='CreateInv_button_bottom' type='button' onClick={
                            client ?
                                () => editClient({
                                    id: client?._id, data: {
                                        contactType, name, CIN, bank, IBAN, address, phone, email, website, notes
                                    }
                                }, createClient)
                                : () => {
                                    postClient({ contactType, name, CIN, bank, IBAN, address, phone, email, website, notes }, createClient);
                                }
                        }>Save</button>
                        <button className='CreateInv_button_secondary' type='button'
                            onClick={e => { createClient(); clearState() }}>Cancel</button>
                    </div>
                </div>
            </form>

        </dialog >)
}

export default Client