import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

import Menu from '../../components/menu/Menu'
import './Dashboard.css'

import axios from 'axios'
import { useFetch } from '../../hooks/useFetch';

function Dashboard() {

  const navigate = useNavigate()

  const { data: invoices, loading: loadingInvoices, fetchData: fetchInvoices } = useFetch('invoices')
  console.log(invoices)

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
            <select className='CreateInv_select' style={{ width: '120px' }}>
              <option value="Issued">Issued</option>
              <option value="Overdue">Overdue</option>
              <option value="Received">Received</option>
              <option value="Partially">Partially</option>
            </select>
          </div>
          <p className='Dashboard_p_invMoney'>600€</p>
          <div className='Dashboard_div_allInv'>
            {invoices?.map((item, index) =>
              <div className='Dashboard_div_oneInv'>
                <div className='Dashboard_div_invDetails'>
                  <p className='Dashboard_p_invFirm'>{item.clientId?.name}</p>
                  <p className='Dashboard_p_invEmail'>{item.email || item.phone}</p>
                </div>
                <p className='Dashboard_p_invTotal'>126€</p>
              </div>
            )}
          </div>
        </div>

        <div className='Dashboard_div_invoices'>
          <div className='Dashboard_div_title'>
            <h1 className='Dashboard_h1_invoiceList'>Bills</h1>
            <select className='CreateInv_select' style={{ width: '120px' }}>
              <option value="Issued">Issued</option>
              <option value="Overdue">Overdue</option>
              <option value="Received">Paid</option>
              <option value="Partially">Partially</option>
            </select>
          </div>          <p className='Dashboard_p_invMoney'>600€</p>
          <div className='Dashboard_div_allInv'>
            <div className='Dashboard_div_oneInv'>
              <div className='Dashboard_div_invDetails'>
                <p className='Dashboard_p_invFirm'>Amazon</p>
                <p className='Dashboard_p_invEmail'>amazon.com</p>
              </div>
              <p className='Dashboard_p_invTotal'>126€</p>
            </div>

            <div className='Dashboard_div_oneInv'>
              <div className='Dashboard_div_invDetails'>
                <p className='Dashboard_p_invFirm'>Netflix</p>
                <p className='Dashboard_p_invEmail'>netflix.com</p>
              </div>
              <p className='Dashboard_p_invTotal'>216€</p>
            </div>

            <div className='Dashboard_div_oneInv'>
              <div className='Dashboard_div_invDetails'>
                <p className='Dashboard_p_invFirm'>ECO CLIMA SOLUTIONS</p>
                <p className='Dashboard_p_invEmail'>ecoclima.com</p>
              </div>
              <p className='Dashboard_p_invTotal'>86€</p>
            </div>

            <div className='Dashboard_div_oneInv'>
              <div className='Dashboard_div_invDetails'>
                <p className='Dashboard_p_invFirm'>Deustersh</p>
                <p className='Dashboard_p_invEmail'>deuraserch@gmail.com</p>
              </div>
              <p className='Dashboard_p_invTotal'>248€</p>
            </div>
          </div>
        </div>

        <div className='Dashboard_div_rightColumn'>
          <div className='Dashboard_div_revenueAndExpenses'>
            <div className='Dashboard_div_revenue'>
              <h1 className='Dashboard_h1_invoiceList'>Revenue</h1>
              <p className='Dashboard_p_invMoney'>20.856€</p>
              <div className='Dashboard_div_allInv'>
                <div className='Dashboard_div_oneInv'>
                  <div className='Dashboard_div_invDetails'>
                    <p className='Dashboard_p_invFirm'>Sales</p>
                  </div>
                  <p className='Dashboard_p_invTotal'>6.200€</p>
                </div>

                <div className='Dashboard_div_oneInv'>
                  <div className='Dashboard_div_invDetails'>
                    <p className='Dashboard_p_invFirm'>Rent</p>
                  </div>
                  <p className='Dashboard_p_invTotal'>12.568€</p>
                </div>

                <div className='Dashboard_div_oneInv'>
                  <div className='Dashboard_div_invDetails'>
                    <p className='Dashboard_p_invFirm'>Subscriptions</p>
                  </div>
                  <p className='Dashboard_p_invTotal'>4.500€</p>
                </div>
              </div>
            </div>

            <div className='Dashboard_div_revenue'>
              <h1 className='Dashboard_h1_invoiceList'>Expenses</h1>
              <p className='Dashboard_p_invMoney'>8.650€</p>
              <div className='Dashboard_div_allInv'>
                <div className='Dashboard_div_oneInv'>
                  <div className='Dashboard_div_invDetails'>
                    <p className='Dashboard_p_invFirm'>Utilities</p>
                  </div>
                  <p className='Dashboard_p_invTotal'>2.800€</p>
                </div>

                <div className='Dashboard_div_oneInv'>
                  <div className='Dashboard_div_invDetails'>
                    <p className='Dashboard_p_invFirm'>Advertising</p>
                  </div>
                  <p className='Dashboard_p_invTotal'>5.600€</p>
                </div>

                <div className='Dashboard_div_oneInv'>
                  <div className='Dashboard_div_invDetails'>
                    <p className='Dashboard_p_invFirm'>Travel</p>
                  </div>
                  <p className='Dashboard_p_invTotal'>1.260€</p>
                </div>
              </div>
            </div>
          </div>

          <div className='Dashboard_div_profitAndLoss'>
            <h1 className='Dashboard_h1_invoiceList'>Profit & Loss</h1>
            <p className='Dashboard_p_invMoney'>12.250€</p>
            <div className='Dashboard_div_allInv'>
              <div className='Dashboard_div_oneInv'>
                <div className='Dashboard_div_invDetails'>
                  <p className='Dashboard_p_invFirm'>Revenue</p>
                </div>
                <p className='Dashboard_p_invTotal'>20.856€</p>
              </div>

              <div className='Dashboard_div_oneInv'>
                <div className='Dashboard_div_invDetails'>
                  <p className='Dashboard_p_invFirm'>Expenses</p>
                </div>
                <p className='Dashboard_p_invTotal'>8.650€</p>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Dashboard