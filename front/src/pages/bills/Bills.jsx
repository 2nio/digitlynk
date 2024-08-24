import React, { useRef, useEffect, useState } from 'react'

import axios from 'axios'
import { IoAdd } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

import Menu from '../../components/menu/Menu'
import Dropdown from '../../components/dropdown-menu/Dropdown';
import { useFetch } from '../../hooks/useFetch';
import AddBill from './AddBill';
import { usePost } from '../../hooks/usePost';
import AddPayment from '../payments/AddPayment';


function Bills() {
    axios.defaults.withCredentials = true

    const today = new Date().toISOString().split('T')[0]
    const [menu, setMenu] = useState('')
    const [dropmenu, setDropMenu] = useState(false)
    const [popupIncome, setPopupIncome] = useState(false)
    const [popupPayment, setPopupPayment] = useState(false)
    const [billInfo, setBillInfo] = useState()

    const { data: business, loading: loadingBusiness, fetchData: fetchBusiness } = useFetch('business')
    const { data: bills, loading: loadingBills, fetchData: fetchBills } = useFetch('bills')
    const { postData: deleteBill, loading: loadingdeleteBill } = usePost('deleteBill')
    const { postData: editBill, loading: loadingEditBill } = usePost('editBill')
    const { data: payment, loading: loadingPayment, fetchData: fetchPayment } = useFetch('payment')

    useEffect(() => {
        bills?.map(item => {
            const equalAmount = item.payment.reduce((a, v) => a + v.amount, 0) === item.amount

            if (item.status !== 'Paid' && equalAmount) {
                editBill({ id: item._id, data: { status: 'Paid' } }, fetchBills)
            }
            else if (item.status !== 'Partially' && item.payment.length && !equalAmount) {
                editBill({ id: item._id, data: { status: 'Partially' } }, fetchBills)
            }
            else if (item.status === 'Overdue' && item.dueDate >= today || item.status !== 'Issued' && !equalAmount && item.dueDate >= today) {
                editBill({ id: item._id, data: { status: 'Issued' } }, fetchBills)
            } else if (item.status !== 'Overdue' && !item.payment.length && item.dueDate < today) {
                editBill({ id: item._id, data: { status: 'Overdue' } }, fetchBills)
            }
        })
    }, [bills])

    useEffect(() => {
        document.title = "Fluxloop | Bills"
    }, [])

    useEffect(() => {
        !popupPayment && setBillInfo(null)
    }, [popupPayment])

    return (
        <div className='All_div_main'>
            <Menu />
            <AddBill contactType={'provider'} billInfo={billInfo} popupIncome={popupIncome}
                setPopup={data => { setPopupIncome(data); setBillInfo(false); fetchBills() }} />
            <AddPayment choose={true} billInfo={billInfo} popupPayment={popupPayment} setPopup={data => setPopupPayment(data)} />

            {loadingBills ? <div>Loading...</div>
                : bills &&
                <div className='Revenue_div_second'>
                    <h1 style={{ marginBottom: '24px' }}>Bills</h1>
                    <div className='Revenue_div_entryCrit'>
                        <p className='Revenue_p_crit'>NO</p>
                        <p className='Revenue_p_crit'>DATE</p>
                        <p className='Revenue_p_crit'>DUE</p>
                        <p className='Revenue_p_crit'>FROM</p>
                        <p className='Revenue_p_crit'>STATUS</p>
                        <p className='Revenue_p_crit'>AMOUNT</p>
                        <div style={{ width: '20px' }}><IoAdd size={'1.4rem'} onClick={e => setPopupIncome(true)} /></div>
                    </div>

                    {bills?.map(item =>
                        <div className='Revenue_div_entry'>
                            <p className='Revenue_p_critInfo'>{bills.indexOf(item) + 1}</p>
                            <p className='Revenue_p_critInfo'>{item.date}</p>
                            <p className='Revenue_p_critInfo'>{item.dueDate}</p>
                            <p className='Revenue_p_critInfo'>{item.clientId?.name}</p>
                            <p className='Revenue_p_critInfo'><span style={{
                                backgroundColor: item.status === 'Paid' ? '#06402B'
                                    : item.status === 'Overdue' ? '#cc5a2a' : item.status === 'Partially' && '#ff7600'
                            }}></span>{item.status}</p>
                            <p className='Revenue_p_critAmount'>{item.amount}{business?.currency}</p>
                            <div style={{ width: '20px' }}>
                                <RiArrowDropDownLine className='Revenue_DropdownArrow'
                                    onClick={e => { setDropMenu(!dropmenu); setMenu(bills.indexOf(item) + 1) }} size={'1.6rem'} />
                                <Dropdown menuOptions={[
                                    {
                                        option: 'View',
                                        func: () => {
                                            setPopupIncome(true)
                                            setBillInfo(item)
                                        }
                                    },
                                    item.status !== 'Paid' && {
                                        option: 'Pay',
                                        func: () => { setBillInfo(item); setPopupPayment(true) }

                                    },
                                    {
                                        option: 'Delete',
                                        func: () => deleteBill({ id: item._id }, fetchBills)
                                    },
                                ]}
                                    parentState={value => setDropMenu(value)}
                                    displayMenu={dropmenu && menu === bills.indexOf(item) + 1} />
                            </div>
                        </div>
                    )}

                </div>}
        </div>
    )
}

export default Bills
