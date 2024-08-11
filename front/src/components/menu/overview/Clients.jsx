import React, { useState } from 'react'

import { IoAdd } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoChevronBack } from "react-icons/io5";
import { useFetch } from '../../../hooks/useFetch';
import Dropdown from '../../dropdown-menu/Dropdown';
import Client from '../../Client'

function Clients({ menuState, setMenuState }) {

    const [searchClient, setSearcClient] = useState('')
    const [menu, setMenu] = useState('')
    const [dropmenu, setDropMenu] = useState(false)
    const [showDialog, setShowDialog] = useState(false)
    const [client, setClient] = useState()

    const { data: clients, loading: loadingClients, fetchData: fetchClients } = useFetch('clients')
    const filteredClients = clients?.filter(item => item?.name?.includes(searchClient) &&
        item.contactType === (menuState === 'Clients' ? 'client' : 'provider'))

    return (

        <div style={{ display: menuState !== 'Clients' ? menuState !== 'Providers' && 'none' : null }}>
            <h1 style={{ marginBottom: '32px', fontSize: '32px', display: 'flex', alignItems: 'center' }}>
                <IoChevronBack onClick={e => setMenuState('Account')} size={'1.6rem'} style={{ marginRight: '4px' }} /> {menuState}
            </h1>
            <div className='Revenue_div_entryCrit'>
                <p className='Revenue_p_crit'>NO</p>
                <p className='Revenue_p_crit'>COMPANY</p>
                <p className='Revenue_p_crit'>PHONE</p>
                <div style={{ width: '20px' }}><IoAdd onClick={e => { setClient(); setShowDialog(true) }} size={'1.4rem'} /></div>
            </div>

            <Client contactType={menuState === 'Clients' ? 'client' : 'provider'} showDialog={showDialog} formId={'Clients'}
                closeDialog={data => { setShowDialog(data); fetchClients() }} client={client} />

            {loadingClients ? <div>Loading...</div> :
                clients &&
                filteredClients?.map(item =>
                    <div className='Revenue_div_entry'>
                        <p className='Revenue_p_critInfo'>{filteredClients?.indexOf(item) + 1}</p>
                        <p className='Revenue_p_critInfo'>{item.name}</p>
                        <p className='Revenue_p_critInfo'>{item.phone || '-'}</p>
                        <div style={{ width: '20px' }}>
                            <RiArrowDropDownLine className='Revenue_DropdownArrow'
                                onClick={e => { setDropMenu(!dropmenu); setMenu(filteredClients.indexOf(item) + 1) }} size={'1.6rem'} />
                            <Dropdown menuOptions={[
                                {
                                    option: 'View',
                                    func: () => {
                                        setClient(item)
                                        setShowDialog(true)
                                    }
                                },
                                {
                                    option: 'Delete',
                                    func: () => {
                                        setClient({ id: item._id })
                                        fetchClients()
                                    }
                                }
                            ]}
                                parentState={value => setDropMenu(value)}
                                displayMenu={dropmenu && menu === filteredClients.indexOf(item) + 1} />
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default Clients