import React, { useEffect } from 'react'

import Menu from '../../components/menu/Menu'
import './Dashboard.css'

import { useFetch } from '../../hooks/useFetch';
import { usePost } from '../../hooks/usePost';

function Dashboard() {

  const { data: business, loading: loadingBusiness, fetchData: fetchBussines } = useFetch('business')
  const { postData: editBusiness } = usePost('editBusiness')
  const { data: invoices, loading: loadingInvoices, fetchData: fetchInvoices } = useFetch('invoices')
  const { data: bills, loading: loadingBills, fetchData: fetchBills } = useFetch('bills')
  const { data: payments, loading: loadingPayments, fetchData: fetchPayments } = useFetch('payments')
  const { data: income, loading: loadingIncome, fetchData: fetchIncome } = useFetch('allIncome')

  const payByCat = {}
  payments?.forEach(item => {
    if (payByCat[item.category]) {
      payByCat[item.category] += item.amount;
    } else {
      payByCat[item.category] = item.amount;
    }
  });
  const payArr = Object.keys(payByCat).map(item => ({ category: item, amount: payByCat[item] }));

  const incByCat = {}
  income?.forEach(item => {
    if (incByCat[item.category]) {
      incByCat[item.category] += item.amount;
    } else {
      incByCat[item.category] = item.amount;
    }
  });
  const incArr = Object.keys(incByCat).map(item => ({ category: item, amount: incByCat[item] }));

  useEffect(() => {
    document.title = "DigitLynk | Dashboard"
  }, [])

  return (
    <div className='All_div_main'>
      <Menu />
      <div className='Dashboard_div_second'>
        <div className='Dashboard_div_invoices'>
          <div className='Dashboard_div_title'>
            <h1 className='Dashboard_h1_invoiceList'>Invoices</h1>
            <select className='CreateInv_select' value={business?.settings?.displayInvoices} style={{ width: '120px' }}
              onChange={e => editBusiness({ settings: { displayInvoices: e.target.value, displayBills: business?.settings?.displayBills } }, fetchBussines)}>
              <option value="Issued">Issued</option>
              <option value="Overdue">Overdue</option>
              <option value="Received">Received</option>
              <option value="Partially">Partially</option>
            </select>
          </div>
          <p className='Dashboard_p_invMoney'>{(invoices?.filter(item => item.status === business?.settings?.displayInvoices)
            .reduce((a, v) => a = a + v.productList
              .reduce((a, v) => a = a + v.amount, 0), 0) + invoices?.filter(item => item.status === business?.settings?.displayInvoices)
                .reduce((a, v) => a = a + v.productList
                  .reduce((a, v) => a = a + v.amount, 0), 0) * 0.08).toFixed(2)}€</p>
          <div className='Dashboard_div_allInv' style={{ maxHeight: '82%' }}>
            {invoices?.filter(item => item.status === business?.settings?.displayInvoices).map((item, index) =>
              <div className='Dashboard_div_oneInv'>
                <div className='Dashboard_div_invDetails'>
                  <p className='Dashboard_p_invFirm'>{item.clientId?.name}</p>
                  <p className='Dashboard_p_invEmail'>{item.number}</p>
                </div>
                <p className='Dashboard_p_invTotal'>{(item.productList.reduce((a, v) => a = a + v.amount, 0)
                  + item.productList.reduce((a, v) => a = a + v.amount, 0) * 0.08).toFixed(2)}€</p>
              </div>
            )}
          </div>
        </div>

        <div className='Dashboard_div_invoices'>
          <div className='Dashboard_div_title'>
            <h1 className='Dashboard_h1_invoiceList'>Bills</h1>
            <select className='CreateInv_select' value={business?.settings?.displayBills} style={{ width: '120px' }}
              onChange={e => editBusiness({ settings: { displayInvoices: business?.settings?.displayInvoices, displayBills: e.target.value } }, fetchBussines)}>
              <option value="Issued">Issued</option>
              <option value="Overdue">Overdue</option>
              <option value="Paid">Paid</option>
              <option value="Partially">Partially</option>
            </select>
          </div>
          <p className='Dashboard_p_invMoney'>{bills?.filter(item => item.status === business?.settings?.displayBills)
            .reduce((a, v) => a = a + v.amount, 0).toFixed(2)}€</p>
          <div className='Dashboard_div_allInv' style={{ maxHeight: '82%' }}>
            {bills?.filter(item => item.status === business?.settings?.displayBills).map((item, index) =>
              <div className='Dashboard_div_oneInv'>
                <div className='Dashboard_div_invDetails'>
                  <p className='Dashboard_p_invFirm'>{item.clientId?.name}</p>
                  <p className='Dashboard_p_invEmail'>{item.number}</p>
                </div>
                <p className='Dashboard_p_invTotal'>{item.amount.toFixed(2)}€</p>
              </div>
            )}
          </div>
        </div>

        <div className='Dashboard_div_rightColumn'>
          <div className='Dashboard_div_revenueAndExpenses'>
            <div className='Dashboard_div_revenue'>
              <h1 className='Dashboard_h1_invoiceList'>Revenue</h1>
              <p className='Dashboard_p_invMoney'>{incArr?.reduce((a, v) => a = a + v.amount, 0).toFixed(2)}€</p>
              <div className='Dashboard_div_allInv'>
                {incArr.map(item =>
                  <div className='Dashboard_div_oneInv'>
                    <div className='Dashboard_div_invDetails'>
                      <p className='Dashboard_p_invFirm'>{item.category}</p>
                    </div>
                    <p className='Dashboard_p_invTotal'>{item.amount?.toFixed(2)}€</p>
                  </div>
                )}
              </div>
            </div>

            <div className='Dashboard_div_revenue'>
              <h1 className='Dashboard_h1_invoiceList'>Expenses</h1>
              <p className='Dashboard_p_invMoney'>{payArr?.reduce((a, v) => a = a + v.amount, 0).toFixed(2)}€</p>
              <div className='Dashboard_div_allInv'>
                {payArr.map(item =>
                  <div className='Dashboard_div_oneInv'>
                    <div className='Dashboard_div_invDetails'>
                      <p className='Dashboard_p_invFirm'>{item.category}</p>
                    </div>
                    <p className='Dashboard_p_invTotal'>{item.amount?.toFixed(2)}€</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='Dashboard_div_profitAndLoss'>
            <h1 className='Dashboard_h1_invoiceList'>Profit & Loss</h1>
            <p className='Dashboard_p_invMoney'>{(incArr?.reduce((a, v) => a = a + v.amount, 0)
              - payArr?.reduce((a, v) => a = a + v.amount, 0)).toFixed(2)}€</p>
            <div className='Dashboard_div_allInv'>
              <div className='Dashboard_div_oneInv'>
                <div className='Dashboard_div_invDetails'>
                  <p className='Dashboard_p_invFirm'>Revenue</p>
                </div>
                <p className='Dashboard_p_invTotal'>{incArr?.reduce((a, v) => a = a + v.amount, 0).toFixed(2)}€</p>
              </div>

              <div className='Dashboard_div_oneInv'>
                <div className='Dashboard_div_invDetails'>
                  <p className='Dashboard_p_invFirm'>Expenses</p>
                </div>
                <p className='Dashboard_p_invTotal'>{payArr?.reduce((a, v) => a = a + v.amount, 0).toFixed(2)}€</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Dashboard