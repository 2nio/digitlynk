import React, { useRef, useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch';
import { closePopup } from '../../functions/closePopup';
import Companies from '../../components/menu/overview/Companies';


function InvoicePopup({ view, setView, invoice, client }) {

    const popupRef = useRef()

    const { data: business, loading: loadingBusiness, fetchData: fetchBusiness } = useFetch('business')

    useEffect(() => {
        fetchBusiness()
        view && popupRef.current.showModal()
    }, [client])

    useEffect(() => {
        closePopup(() => { popupRef.current.close(); setView(false) }, popupRef)
    }, [])

    return (
        <dialog ref={popupRef} className='CreateInv_div_popup' style={{ height: '72%' }}>
            <h1 style={{ marginBottom: '16px' }}>View invoice</h1>
            {loadingBusiness ? <div>Loading..</div> :
                <main className='CreateInv_div_preview print'>
                    <h1 className='CreateInv_h1_previewTitle'>INVOICE</h1>
                    <div className='CreateInv_div_previewInfo'>
                        {business &&
                            <div className='CreateInv_div_previewClient'>
                                <h4>{business.company}</h4>
                                <p>{business.address}</p>
                                <p>{business.email}</p>
                                <p>{business.phone}</p>
                                <p>{business.website}</p>
                            </div>}
                        {client &&
                            <div className='CreateInv_div_previewCompany'>
                                <h4>BILLED TO</h4>
                                <p>{client.company}</p>
                                <p>{client.address}</p>
                                <p>{client.email}</p>
                                <p>{client.phone}</p>
                                <p>{client.website}</p>
                            </div>}
                    </div>
                    <div className='CreateInv_div_previewDetails'>
                        <p><span>INVOICE NR</span> &nbsp;&nbsp; {invoice?.number}</p>
                        <p><span>ISSUE DATE</span> &nbsp;&nbsp; {invoice?.date}</p>
                        <p><span>DUE DATE</span> &nbsp;&nbsp; {invoice?.dueDate}</p>
                    </div>
                    <div className='CreateInv_div_previewListCrit'>
                        <p className='CreateInv_p_peviewCrit'>NO</p>
                        <p className='CreateInv_p_peviewCrit' style={{ width: '400px' }}>PRODUCT/SERVICE</p>
                        <p className='CreateInv_p_peviewCrit'>QTY</p>
                        <p className='CreateInv_p_peviewCrit'>PRICE</p>
                        <p className='CreateInv_p_peviewCrit'>TOTAL</p>
                    </div>
                    {invoice?.productList.map(item =>
                        <div key={item.id} className='CreateInv_div_previewList'>
                            <p className='CreateInv_p_peviewList'>{invoice?.productList?.indexOf(item) + 1}</p>
                            <p className='CreateInv_p_peviewList' style={{ width: '400px' }}>{item.productName}</p>
                            <p value={item.qty} className='CreateInv_p_peviewList'>{item.qty}</p>
                            <p value={item.price} className='CreateInv_p_peviewList'>{item.price}€</p>
                            <p className='CreateInv_p_peviewList'>{item.qty * item.price}€</p>
                        </div>
                    )}
                    <div className='CreateInv_p_peviewBottom'>
                        <div style={{ width: '300px' }}>
                            <p style={{ fontSize: '15px' }}>{invoice?.note}</p>
                        </div>
                        <div>
                            <div className='CreateInv_p_peviewTotal'>
                                <h3>SUBTOTAL</h3>
                                <p>{invoice?.productList?.reduce((a, v) => a = a + v.amount, 0)}€</p>
                            </div>
                            <div className='CreateInv_p_peviewTotal'>
                                <h3>TAX</h3>
                                <p>{(invoice?.productList?.reduce((a, v) => a = a + v.amount, 0) * 0.08).toFixed(2)}€</p>
                            </div>
                            <div className='CreateInv_p_peviewTotal'>
                                <h3>TOTAL</h3>
                                <p>{(invoice?.productList?.reduce((a, v) => a = a + v.amount, 0) +
                                    invoice?.productList?.reduce((a, v) => a = a + v.amount, 0) * 0.08).toFixed(2)}€</p>
                            </div>
                        </div>
                    </div>
                </main>}
        </dialog >
    )
}

export default InvoicePopup