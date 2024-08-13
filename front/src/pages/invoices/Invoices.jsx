import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

import { IoAdd } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

import Menu from '../../components/menu/Menu'
import InvoicePopup from './InvoicePopup';
import Dropdown from '../../components/dropdown-menu/Dropdown';
import './Invoices.css'
import { useFetch } from '../../hooks/useFetch';
import { usePost } from '../../hooks/usePost';
import AddIncome from '../income/AddIncome';

function Invoices() {

    const navigate = useNavigate()
    const [popupIncome, setPopupIncome] = useState(false)

    const today = new Date().toISOString().split('T')[0]
    const [menu, setMenu] = useState('')
    const [dropmenu, setDropMenu] = useState(false)
    const [view, setView] = useState(false)
    const [invoiceInfo, setInvoiceInfo] = useState()
    const [client, setClient] = useState()

    const { data, loading, fetchData } = useFetch('invoices')
    const { postData: editInvoice, loading: loadingEditInvoice } = usePost('editInvoice')
    const { data: invoice, loading: loadingInvoice, fetchData: fetchInvoice } = useFetch('invoice')
    const { postData: deleteInvoice, loading: loadingDeleteInvoice } = usePost('deleteInvoice')

    useEffect(() => {
        document.title = "DigitLynk | Invoices"
    }, [])

    useEffect(() => {
        data?.map(item => {
            const equalAmount = item.payment.reduce((a, v) => a + v.amount, 0).toFixed(2) ===
                (item.productList.reduce((a, v) => a = a + v.amount, 0) + item.productList.reduce((a, v) => a = a + v.amount, 0) * 0.08).toFixed(2)
            if (item.status !== 'Received' && equalAmount) {
                editInvoice({ id: item._id, data: { status: 'Received' } }, fetchData)
            }
            else if (item.status !== 'Partially' && item.payment.length && !equalAmount) {
                editInvoice({ id: item._id, data: { status: 'Partially' } }, fetchData)
            }
            else if (item.status === 'Overdue' && item.dueDate >= today || item.status !== 'Issued' && !equalAmount && item.dueDate >= today) {
                editInvoice({ id: item._id, data: { status: 'Issued' } })
            } else if (item.status !== 'Overdue' && !item.payment.length && item.dueDate < today) {
                editInvoice({ id: item._id, data: { status: 'Overdue' } }, fetchData)
            }
        })
    }, [data])

    useEffect(() => {
        !popupIncome && setInvoiceInfo(null);
        !popupIncome && fetchData();
    }, [popupIncome])

    return (
        <div className='All_div_main'>
            <Menu />

            {loading || loadingInvoice ? <div>Loading...</div>
                : data &&
                <div className='Revenue_div_second'>
                    <InvoicePopup view={view} setView={e => setView(e)} invoice={invoice} client={client} />
                    <AddIncome contactType={'client'} choose={true} invoiceInfo={invoiceInfo}
                        popupIncome={popupIncome} setPopup={data => setPopupIncome(data)} />
                    <h1 style={{ marginBottom: '24px' }}>Invoices</h1>
                    <div className='Revenue_div_entryCrit'>
                        <p className='Revenue_p_crit'>NO</p>
                        <p className='Revenue_p_crit'>DATE</p>
                        <p className='Revenue_p_crit'>DUE</p>
                        <p className='Revenue_p_crit'>TO</p>
                        <p className='Revenue_p_crit'>STATUS</p>
                        <p className='Revenue_p_crit'>AMOUNT</p>
                        <div style={{ width: '20px' }}><IoAdd onClick={e => navigate('create')} size={'1.4rem'} /></div>
                    </div>

                    {data?.map(item =>
                        <div key={item._id} className='Revenue_div_entry'>
                            <p className='Revenue_p_critInfo'>{data.indexOf(item) + 1}</p>
                            <p className='Revenue_p_critInfo'>{item.date}</p>
                            <p className='Revenue_p_critInfo'>{item.dueDate}</p>
                            <p className='Revenue_p_critInfo'>{item.clientId?.name}</p>
                            <p className='Revenue_p_critInfo'><span style={{
                                backgroundColor: item.status === 'Received' ? '#06402B'
                                    : item.status === 'Overdue' ? '#cc5a2a' : item.status === 'Partially' && '#ff7600'
                            }}></span>{item.status}</p>
                            <p className='Revenue_p_critAmount'>{(item.productList.reduce((a, v) => a = a + v.amount, 0)
                                + item.productList.reduce((a, v) => a = a + v.amount, 0) * 0.08).toFixed(2)}€</p>
                            <div style={{ width: '20px' }}>
                                <RiArrowDropDownLine className='Revenue_DropdownArrow'
                                    onClick={e => { setDropMenu(!dropmenu); setMenu(data.indexOf(item) + 1) }} size={'1.6rem'} />
                                <Dropdown menuOptions={[
                                    {
                                        option: 'View',
                                        func: () => {
                                            setView(true)
                                            fetchInvoice({ params: { id: item._id } })
                                            setClient(item.clientId)
                                            setDropMenu(false)
                                        }
                                    },
                                    item.status !== 'Received' && {
                                        option: 'Receive',
                                        func: () => { setInvoiceInfo(item); setPopupIncome(true) }

                                    },
                                    {
                                        option: 'Edit',
                                        func: () => navigate(`create`, { state: { id: item._id } })
                                    },
                                    {
                                        option: 'Delete',
                                        func: () => deleteInvoice({ id: item._id }, fetchData)
                                    },

                                ]}
                                    parentState={value => setDropMenu(value)}
                                    displayMenu={dropmenu && menu === data.indexOf(item) + 1} />
                            </div>
                        </div>

                    )}

                </div>}
        </div>
    )
}

export default Invoices