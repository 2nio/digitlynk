import React, { useRef, useEffect, useState } from 'react'

import { RiArrowDropDownLine } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import { closePopup } from '../functions/closePopup';
import { useFetch } from '../hooks/useFetch';
import { usePost } from '../hooks/usePost';
import Client from './Client';

function AddClient({ left, contactType, choose, clientCompany, sendClient, formId }) {

    //Dropmenu
    const [searchClient, setSearchClient] = useState("")
    const [client, setClient] = useState()
    const [dropmenu, setDropMenu] = useState(false)
    const dropmenuRef = useRef()
    const [showDialog, setShowDialog] = useState(false)

    const { data: clients, loading: loadingClients, fetchData: fetchClients } = useFetch('clients')
    const { postData: postClient, loading: loadingClient } = usePost('client')

    useEffect(() => {
        if (!dropmenu) setSearchClient('')

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
        if (clientCompany === 'reset') setClient('')
        else setClient(clientCompany)
    }, [clientCompany])



    return (
        <div className='CreateInv_div_info'>
            <label className='CreateInv_label'>
                <p className='CreateInv_p_label'>{contactType === 'client' ? 'CLIENT' : 'PROVIDER'}</p>
                <div className='CreateInv_div_client'>
                    {client || <p className='CreateInv_p_client'>Select {contactType === 'client' ? 'client' : 'provider'}</p>}
                    {loadingClients ? <div>Loading...</div> :
                        <div ref={dropmenuRef}>
                            {!choose && <RiArrowDropDownLine onClick={e => setDropMenu(!dropmenu)} size={'1.4rem'} />}
                            <div className='CreateInv_div_dropdown' style={{ display: dropmenu && 'flex', left: left }}>
                                <div className='CreateInv_div_dropdownAdd'>
                                    <input value={searchClient} onChange={e => setSearchClient(e.target.value)}
                                        placeholder={contactType === 'client' ? 'Search for client' : 'Search for provider'} />
                                    <IoAdd onClick={e => { setShowDialog(true); setDropMenu(false) }} size={'1.3rem'} />
                                </div>
                                {clients &&
                                    <div className='CreateInv_div_dropdownClients'>
                                        {clients.filter(item => (item?.company?.includes(searchClient) || item?.fullname?.includes(searchClient))
                                            && item.contactType === contactType).map(item =>
                                                <li onClick={e => { setClient(item.company || item.fullname); sendClient(item._id); setDropMenu(false) }}>
                                                    {item.company || item.fullname}</li>
                                            )}
                                    </div>}
                            </div>
                        </div>}
                </div>
            </label>
            <Client contactType={contactType} showDialog={showDialog} closeDialog={data => { setShowDialog(data); fetchClients() }} formId={formId} />
        </div>
    )
}

export default AddClient