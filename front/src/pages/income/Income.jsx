import React, { useRef, useEffect, useState } from 'react'
import { IoAdd } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

import Menu from '../../components/menu/Menu'
import AddIncome from './AddIncome';
import { useFetch } from '../../hooks/useFetch';
import Dropdown from '../../components/dropdown-menu/Dropdown';
import { usePost } from '../../hooks/usePost';

function Income() {

    const [menu, setMenu] = useState('')
    const [dropmenu, setDropMenu] = useState(false)
    const [popupIncome, setPopupIncome] = useState(false)
    const [incomeInfo, setIncomeInfo] = useState()

    const { data: income, loading: loadingIncome, fetchData: fetchIncome } = useFetch('allIncome')
    const { postData: deleteIncome, loading: loadingDeleteIncome } = usePost('deleteIncome')

    return (
        <div className='All_div_main'>
            <Menu />

            <AddIncome choose={incomeInfo?.invoice} contactType={'client'} incomeInfo={incomeInfo} popupIncome={popupIncome}
                setPopup={data => { setPopupIncome(data); setIncomeInfo(false); fetchIncome() }} />

            {loadingIncome ? <div>Loading...</div>
                : income &&
                <div className='Revenue_div_second'>
                    <h1 style={{ marginBottom: '24px' }}>Income</h1>
                    <div className='Revenue_div_entryCrit'>
                        <p className='Revenue_p_crit'>NO</p>
                        <p className='Revenue_p_crit'>TYPE</p>
                        <p className='Revenue_p_crit'>DATE</p>
                        <p className='Revenue_p_crit'>FROM</p>
                        <p className='Revenue_p_crit'>INVOICE</p>
                        <p className='Revenue_p_crit'>AMOUNT</p>
                        <div style={{ width: '20px' }}><IoAdd onClick={e => setPopupIncome(true)} size={'1.4rem'} /></div>
                    </div>

                    {income?.map((item, index) =>
                        <div className='Revenue_div_entry'>
                            <p className='Revenue_p_critInfo'>{income.indexOf(item) + 1}</p>
                            <p className='Revenue_p_critInfo'>{item.type}</p>
                            <p className='Revenue_p_critInfo'>{item.date}</p>
                            <p className='Revenue_p_critInfo'>{item.clientCompany}</p>
                            <p className='Revenue_p_critInfo'>{item.invoice?.number || '-'}</p>
                            <p className='Revenue_p_critAmount'>{item.amount}€</p>
                            <div style={{ width: '20px' }}>
                                <RiArrowDropDownLine className='Revenue_DropdownArrow'
                                    onClick={e => { setDropMenu(!dropmenu); setMenu(income.indexOf(item) + 1) }} size={'1.6rem'} />
                                <Dropdown menuOptions={[
                                    {
                                        option: 'View',
                                        func: () => {
                                            setPopupIncome(true)
                                            setIncomeInfo(item)
                                        }
                                    },
                                    {
                                        option: 'Delete',
                                        func: () => deleteIncome({ id: item._id }, fetchIncome)
                                    },

                                ]}
                                    parentState={value => setDropMenu(value)}
                                    displayMenu={dropmenu && menu === income.indexOf(item) + 1} />
                            </div>
                        </div>
                    )}
                </div>}
        </div>
    )
}

export default Income