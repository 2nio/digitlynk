import React, { useRef, useEffect, useState } from 'react'

import { IoMdArrowDropdown } from "react-icons/io";
import { IoAdd } from "react-icons/io5";

function AddProvider() {

    //Dropmenu
    const [provider, setProvider] = useState("")
    const [dropmenu, setDropMenu] = useState(false)
    const dropmenuRef = useRef()

    //Popup inputs
    const popupRef = useRef()
    const [fullname, setFullname] = useState("")
    const [company, setCompany] = useState("")
    const [bank, setBank] = useState("")
    const [IBAN, setIBAN] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [website, setWebsite] = useState("")

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

    useEffect(() => {
        popupRef.current.addEventListener('click', e => {
            const popupDimensions = popupRef.current.getBoundingClientRect()
            if (
                e.clientX < popupDimensions.left ||
                e.clientX > popupDimensions.right ||
                e.clientY < popupDimensions.top ||
                e.clientY > popupDimensions.bottom
            ) popupRef.current.close()
        })
    }, [])

    const providers = ['Dedeman', 'Eurotools', 'BigGunz', 'Augmenter Group', 'Nuclea']

    return (
        <div className='CreateInv_div_info'>
            <label className='CreateInv_label'>
                <p className='CreateInv_p_label'>PROVIDERS</p>
                <div className='CreateInv_div_client'>
                    <p className='CreateInv_p_client'>Select provider</p>
                    <div ref={dropmenuRef}>
                        <IoMdArrowDropdown onClick={e => setDropMenu(!dropmenu)} size={'1.4rem'} />
                        <div className='CreateInv_div_dropdown' style={{ display: dropmenu && 'flex', backgroundColor: 'rgb(20,20,20' }}>
                            <div className='CreateInv_div_dropdownAdd'>
                                <input onChange={e => setProvider(e.target.value)} placeholder='Search for provider' style={{ backgroundColor: 'rgb(20,20,20' }} />
                                <IoAdd onClick={e => popupRef.current.showModal()} size={'1.3rem'} />
                            </div>
                            <div className='CreateInv_div_dropdownClients'>
                                {providers.filter(item => item.includes(provider)).map(item =>
                                    <li>{item}</li>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </label>
            <dialog ref={popupRef} className='CreateInv_div_popup'>
                <h1 style={{ marginBottom: '16px' }}>Add provider</h1>
                <div className='CreateInv_div_popupInfo'>
                    <div className='CreateInv_div_popupInfoChild'>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>CONTACT PERSON</p>
                            <input placeholder='Contact' className='CreateInv_input' onChange={e => setFullname(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>COMPANY</p>
                            <input placeholder='Company' className='CreateInv_input' onChange={e => setCompany(e.target.value)}></input>
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
                    <div className='CreateInv_div_popupInfoChild'>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>ADDRESS</p>
                            <input placeholder='Address' className='CreateInv_input' onChange={e => setAddress(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>PHONE</p>
                            <input placeholder='Phone' className='CreateInv_input' onChange={e => setPhone(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>EMAIL</p>
                            <input placeholder='Email' className='CreateInv_input' onChange={e => setEmail(e.target.value)}></input>
                        </label>
                        <label className='CreateInv_label'>
                            <p className='CreateInv_p_label'>WEBSITE</p>
                            <input placeholder='Website' className='CreateInv_input' onChange={e => setWebsite(e.target.value)}></input>
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
                        <button className='CreateInv_button_bottom' onClick={e => popupRef.current.close()}>CANCEL</button>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default AddProvider