import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

import Nav from '../../components/menu/Menu'
import AddClient from '../../components/AddClient';
import './CreateInv.css'

import { IoAdd } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";
import { useFetch } from '../../hooks/useFetch';
import { usePost } from '../../hooks/usePost';


function CreateInvoice() {

    const navigate = useNavigate()
    const location = useLocation()
    const invoiceId = location.state?.id

    const [productList, setProductList] = useState([])
    const [edit, setEdit] = useState(false)
    const [preview, setPreview] = useState(false)

    //Main div inputs
    const [clientId, setClientId] = useState()
    const [invoice, setInvoice] = useState("")
    const [date, setDate] = useState("")
    const [dueDate, setDue] = useState("")
    const [number, setNumber] = useState("")
    const [note, setNote] = useState("")

    const { data: business, loading: loadingBusiness, fetchData: fetchBusiness } = useFetch('business')
    const { data: client, loading: loadingClient, fetchData: fetchClient } = useFetch('client')
    //const { data: invoice, loading: loadingInvoice, fetchData: fetchInvoice } = useFetch('invoice')
    const { postData, loading } = usePost('invoice')
    const { postData: editInvoice, loading: loadingEditInvoice } = usePost('editInvoice')

    const sendClient = (client) => {
        setClientId(client)
        fetchClient({ params: { id: client } })
    }

    useEffect(() => {
        document.title = "DigitLynk | Create Invoice"
        /* fetchInvoice({ params: { id: invoiceId } }, () => {
            fetchClient({ params: { id: invoice?.clientId } })
            setClientId(invoice?.clientId)
            setProductList(invoice?.productList)
        }) */
        if (invoiceId) {
            const editInvoice = async () => {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/invoice`, { params: { id: invoiceId } })
                    setInvoice(res.data)
                    setDate(res.data.date)
                    setDue(res.data.dueDate)
                    setNumber(res.data.number)
                    setNote(res.data.note)
                    setProductList(res.data.productList)
                    fetchClient({ params: { id: res.data.clientId } })
                } catch (error) {
                    console.log(error)
                    if (error.response.data.error === 'ExpiredRefreshToken') {
                        navigate('/login')
                    }
                }
            }
            editInvoice()
        }
    }, [])

    const AddProduct = () => {
        const qty = ""
        const productName = ''
        const price = ""
        const amount = ""
        const product = {
            id: Math.floor(Math.random() * 10000000),
            productName,
            qty,
            price,
            amount
        }
        setProductList([...productList, product])
    }


    useEffect(() => setEdit(false))

    const handlePrint = () => {
        window.print()
    }

    return (
        loadingBusiness ? <div>Loading...</div> :
            business &&
            <div>
                <div className='All_div_main' style={{ display: preview && 'none' }}>
                    <Nav />
                    <div className={preview ? 'none' : 'Revenue_div_second'}>
                        <h1 style={{ marginBottom: '40px' }}>{invoiceId ? 'Edit invoice' : 'Create invoice'}</h1>
                        <div className='CreateInv_div_info'>
                            <AddClient formId={'CreateInv'} left={'5.2%'} contactType={'client'} clientCompany={invoice?.clientCompany} sendClient={sendClient} />
                            <label className='CreateInv_label'>
                                <p className='CreateInv_p_label'>DATE</p>
                                <input defaultValue={invoice?.date} placeholder='Date' type='date' className='CreateInv_input' onChange={e => setDate(e.target.value)}></input>
                            </label>
                            <label className='CreateInv_label'>
                                <p className='CreateInv_p_label'>DUE DATE</p>
                                <input defaultValue={invoice?.dueDate} placeholder='Due Date' type='date' className='CreateInv_input' onChange={e => setDue(e.target.value)}></input>
                            </label>
                            <label className='CreateInv_label'>
                                <p className='CreateInv_p_label'>NUMBER</p>
                                <input defaultValue={invoice?.number} placeholder='Invoice number' className='CreateInv_input' onChange={e => setNumber(e.target.value)}></input>
                            </label>
                        </div>
                        <div className='CreateInv_div_products'>
                            <div className='Revenue_div_entryCrit'>
                                <p className='Revenue_p_crit'>NO</p>
                                <p className='Revenue_p_crit' style={{ width: '400px' }}>PRODUCT/SERVICE</p>
                                <p className='Revenue_p_crit'>QTY</p>
                                <p className='Revenue_p_crit'>PRICE</p>
                                <p className='Revenue_p_crit'>TOTAL</p>
                                <div style={{ width: '20px' }}><IoAdd onClick={AddProduct} size={'1.4rem'} /></div>
                            </div>

                            {productList.map(item =>
                                <div key={item.id} className='Revenue_div_entry'>
                                    <p className='Revenue_p_crit'>{productList.indexOf(item) + 1}</p>
                                    <input className='CreateInv_input_critInfo' placeholder='Enter name' style={{ width: '400px' }}
                                        onChange={e => {
                                            const itemIndex = productList.findIndex(entry => entry.id === item.id)
                                            productList[itemIndex].productName = e.target.value
                                            setEdit(true)
                                        }}
                                        value={item.productName}
                                    />
                                    <input value={item.qty} className='CreateInv_input_critInfo' placeholder='Qty'
                                        onChange={e => {
                                            const itemIndex = productList.findIndex(entry => entry.id === item.id)
                                            productList[itemIndex].qty = e.target.value
                                            productList[itemIndex].amount = e.target.value * productList[itemIndex].price
                                            setEdit(true)
                                        }} ></input>
                                    <input value={item.price} className='CreateInv_input_critInfo' placeholder='Price'
                                        onChange={e => {
                                            const itemIndex = productList.findIndex(entry => entry.id === item.id)
                                            productList[itemIndex].price = e.target.value
                                            productList[itemIndex].amount = e.target.value * productList[itemIndex].qty
                                            setEdit(true)
                                        }}
                                    ></input>
                                    <p className='Revenue_p_critAmount'>{item.qty * item.price}€</p>
                                    <div style={{ width: '20px' }}><IoCloseOutline onClick={e => {
                                        setProductList((current) => current.filter(obj => obj.id !== item.id))
                                        setEdit(true)
                                    }} size={'1.4rem'} /></div>
                                </div>
                            )}
                        </div>
                        <div className='CreateInv_div_bottom'>
                            <label className='CreateInv_label'>
                                <p className='CreateInv_p_label'>NOTES</p>
                                <input defaultValue={invoice.note} placeholder='Add note' className='CreateInv_input' style={{ width: '600px' }}
                                    onChange={e => setNote(e.target.value)}></input>
                            </label>

                            <div className='CreateInv_div_bottomButtons'>
                                <button className='CreateInv_button_secondary' onClick={e => setPreview(true)}>Preview</button>
                                <button className='CreateInv_button_bottom' onClick={invoiceId ?
                                    () => editInvoice({
                                        id: invoiceId, data: {
                                            clientId, clientCompany: client?.company || client?.fullname,
                                            date, dueDate, number, note, productList
                                        }
                                    },
                                        () => navigate('/invoices')) :
                                    () => postData({
                                        companyId: business._id, clientId, clientCompany: client?.company || client?.fullname,
                                        date, dueDate, number, note, productList
                                    },
                                        () => navigate('/invoices'))
                                }>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={preview ? 'All_div_main' : 'none'} style={{ justifyContent: preview ? 'flex-start' : '' }}>
                    <div className='CreateInv_div_previewButtons'>
                        <div className='CreateInv_div_bottomButtons'>
                            <button className='CreateInv_button_bottom' onClick={e => setPreview(false)}>Back</button>
                            <button className='CreateInv_button_bottom' onClick={handlePrint}>Print</button>
                            <button className='CreateInv_button_bottom'>Download</button>
                        </div>
                    </div>
                    <main className='CreateInv_div_preview print'>
                        <h1 className='CreateInv_h1_previewTitle'>INVOICE</h1>
                        <div className='CreateInv_div_previewInfo'>
                            <div className='CreateInv_div_previewClient'>
                                <h4>{business.company}</h4>
                                <p>{business.address}</p>
                                <p>{business.email}</p>
                                <p>{business.phone}</p>
                                <p>{business.website}</p>
                            </div>
                            <div className='CreateInv_div_previewCompany'>
                                <h4>BILLED TO</h4>
                                <p>{client?.company || client?.fullname}</p>
                                <p>{client?.address}</p>
                                <p>{client?.email}</p>
                                <p>{client?.phone}</p>
                                <p>{client?.website}</p>
                            </div>
                        </div>
                        <div className='CreateInv_div_previewDetails'>
                            <p><span>INVOICE NR</span> &nbsp;&nbsp; {number}</p>
                            <p><span>ISSUE DATE</span> &nbsp;&nbsp; {date}</p>
                            <p><span>DUE DATE</span> &nbsp;&nbsp; {dueDate}</p>
                        </div>
                        <div className='CreateInv_div_previewListCrit'>
                            <p className='CreateInv_p_peviewCrit'>NO</p>
                            <p className='CreateInv_p_peviewCrit' style={{ width: '400px' }}>PRODUCT/SERVICE</p>
                            <p className='CreateInv_p_peviewCrit'>QTY</p>
                            <p className='CreateInv_p_peviewCrit'>PRICE</p>
                            <p className='CreateInv_p_peviewCrit'>TOTAL</p>
                        </div>
                        {productList?.map(item =>
                            <div key={item.id} className='CreateInv_div_previewList'>
                                <p className='CreateInv_p_peviewList'>{productList.indexOf(item) + 1}</p>
                                <p className='CreateInv_p_peviewList' style={{ width: '400px' }}>{item.productName}</p>
                                <p value={item.qty} className='CreateInv_p_peviewList'>{item.qty}</p>
                                <p value={item.price} className='CreateInv_p_peviewList'>{item.price}€</p>
                                <p className='CreateInv_p_peviewList'>{item.qty * item.price}€</p>
                            </div>
                        )}
                        <div className='CreateInv_p_peviewBottom'>
                            <div style={{ width: '300px' }}>
                                <p style={{ fontSize: '15px' }}>{note}</p>
                            </div>
                            <div>
                                <div className='CreateInv_p_peviewTotal'>
                                    <h3>SUBTOTAL</h3>
                                    <p>{productList?.reduce((a, v) => a = a + v.amount, 0)}€</p>
                                </div>
                                <div className='CreateInv_p_peviewTotal'>
                                    <h3>TAX</h3>
                                    <p>{(productList?.reduce((a, v) => a = a + v.amount, 0) * 0.08).toFixed(2)}€</p>
                                </div>
                                <div className='CreateInv_p_peviewTotal'>
                                    <h3>TOTAL</h3>
                                    <p>{productList?.reduce((a, v) => a = a + v.amount, 0) + productList?.reduce((a, v) => a = a + v.amount, 0) * 0.08}€</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>

    )
}

export default CreateInvoice