import React, { useRef, useEffect, useState } from 'react'
import { IoAdd } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

import Menu from '../../components/menu/Menu'
import AddPayment from './AddPayment';
import { useFetch } from '../../hooks/useFetch';
import Dropdown from '../../components/dropdown-menu/Dropdown';
import { usePost } from '../../hooks/usePost';

function Payments() {

    const [menu, setMenu] = useState('')
    const [dropmenu, setDropMenu] = useState(false)
    const [popupPayment, setPopupPayment] = useState(false)
    const [paymentInfo, setPaymentInfo] = useState()

    const { data: payments, loading: loadingPayments, fetchData: fetchPayments } = useFetch('payments')
    const { postData: deletePayment } = usePost('deletePayment')

    return (
        <div className='All_div_main'>
            <Menu />

            <AddPayment contactType={'provider'} paymentInfo={paymentInfo} popupPayment={popupPayment}
                setPopup={data => { setPopupPayment(data); setPaymentInfo(false); fetchPayments() }} />

            {loadingPayments ? <div>Loading...</div>
                : payments &&
                <div className='Revenue_div_second'>
                    <h1 style={{ marginBottom: '24px' }}>Payments</h1>
                    <div className='Revenue_div_entryCrit'>
                        <p className='Revenue_p_crit'>NO</p>
                        <p className='Revenue_p_crit'>TYPE</p>
                        <p className='Revenue_p_crit'>DATE</p>
                        <p className='Revenue_p_crit'>TO</p>
                        <p className='Revenue_p_crit'>BILL</p>
                        <p className='Revenue_p_crit'>AMOUNT</p>
                        <div style={{ width: '20px' }}><IoAdd onClick={e => setPopupPayment(true)} size={'1.4rem'} /></div>
                    </div>

                    {payments?.map((item, index) =>
                        <div className='Revenue_div_entry'>
                            <p className='Revenue_p_critInfo'>{payments.indexOf(item) + 1}</p>
                            <p className='Revenue_p_critInfo'>{item.type}</p>
                            <p className='Revenue_p_critInfo'>{item.date}</p>
                            <p className='Revenue_p_critInfo'>{item.clientCompany}</p>
                            <p className='Revenue_p_critInfo'>{item.bill || '-'}</p>
                            <p className='Revenue_p_critAmount'>{item.amount}€</p>
                            <div style={{ width: '20px' }}>
                                <RiArrowDropDownLine className='Revenue_DropdownArrow'
                                    onClick={e => { setDropMenu(!dropmenu); setMenu(payments.indexOf(item) + 1) }} size={'1.6rem'} />
                                <Dropdown menuOptions={[
                                    {
                                        option: 'View',
                                        func: () => {
                                            setPopupPayment(true)
                                            setPaymentInfo(item)
                                        }
                                    },
                                    {
                                        option: 'Delete',
                                        func: () => deletePayment({ id: item._id }, fetchPayments)
                                    },

                                ]}
                                    parentState={value => setDropMenu(value)}
                                    displayMenu={dropmenu && menu === payments.indexOf(item) + 1} />
                            </div>
                        </div>
                    )}
                </div>}
        </div>
    )
}

export default Payments