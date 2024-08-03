const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const verifyAccessToken = require('./middleware/verifyToken');
const verifyCurrentCompany = require('./middleware/verifyCurrentCompany')
const cookieParser = require('cookie-parser');
require('dotenv').config()
//Controllers
const { Signup, Login, getUser, Signout, setCurrentCompany, findUser } = require('./controllers/userController')
const { createBusiness, getBusiness, createClient, getAllClients, editBusiness, getClient } = require('./controllers/businessController')
const { createInvoice, getAllInvoices, getInvoice, editInvoice, deleteInvoice } = require('./controllers/invoiceController')
const { createIncome, getAllIncome, deleteIncome, getIncome, editIncome } = require('./controllers/incomeController')
const { createBill, getAllBills, deleteBill, getBill, editBill } = require('./controllers/billController')

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}))

mongoose.connect('mongodb+srv://cereals:antoni85A@cluster0.uf79cow.mongodb.net/DigitLynkDB?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(3001, () => {
            console.log(`Server is running on port 3001`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas: ', error);
    });

//User
app.post('/signup', Signup)
app.post('/login', Login)

app.use(verifyAccessToken)

//User
app.get('/user', getUser)
app.post('/signout', Signout)
app.post('/company', setCurrentCompany)

//Business
app.post('/business', createBusiness)

app.use(verifyCurrentCompany)

//User
app.get('user:id', findUser)

//Business
app.get('/business', getBusiness)
app.post('/client', createClient)
app.get('/clients', getAllClients)
app.get('/client', getClient)
app.post('/editBusiness', editBusiness)

//Invoice
app.post('/invoice', createInvoice)
app.get('/invoices', getAllInvoices)
app.get('/invoice', getInvoice)
app.post('/editInvoice', editInvoice)
app.post('/deleteInvoice', deleteInvoice)

//Income
app.post('/income', createIncome)
app.get('/allIncome', getAllIncome)
app.post('/deleteIncome', deleteIncome)
app.get('/income', getIncome)
app.post('/editIncome', editIncome)

//Bill
app.post('/bill', createBill)
app.get('/bills', getAllBills)
app.post('/deleteBill', deleteBill)
app.get('/bill', getBill)
app.post('/editBill', editBill)