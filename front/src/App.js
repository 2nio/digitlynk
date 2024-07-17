import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard'
import Invoices from './pages/invoices/Invoices'
import Payments from './pages/payments/Payments'
import Income from './pages/income/Income'
import Bills from './pages/bills/Bills'
import CreateInvoice from './pages/create-invoice/CreateInvoice'
import Signup from './pages/auth/signup/Signup'
import Login from './pages/auth/login/Login'
import MyAccount from './pages/my-account/MyAccount'


const App = () =>
(
  <>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/invoices' element={<Invoices />} />
      <Route path='/payments' element={<Payments />} />
      <Route path='/income' element={<Income />} />
      <Route path='/bills' element={<Bills />} />
      <Route path='/invoices/create/*' element={<CreateInvoice />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/myaccount' element={<MyAccount />} />
    </Routes>
  </>
)


export default App