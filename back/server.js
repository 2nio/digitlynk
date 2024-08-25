const express = require('express');
const mongoose = require('mongoose')
//const cors = require('cors')
const verifyAccessToken = require('./middleware/verifyToken');
const verifyCurrentCompany = require('./middleware/verifyCurrentCompany')
const cookieParser = require('cookie-parser');
require('dotenv').config()
//Controllers
const { Signup, Login, getUser, Signout, setCurrentCompany, findUser, addUser, removeUser } = require('./controllers/userController')
const { createBusiness, getBusiness, editBusiness } = require('./controllers/businessController')
const { createInvoice, getAllInvoices, getInvoice, editInvoice, deleteInvoice } = require('./controllers/invoiceController')
const { createIncome, getAllIncome, deleteIncome, getIncome, editIncome } = require('./controllers/incomeController')
const { createBill, getAllBills, deleteBill, getBill, editBill } = require('./controllers/billController');
const { createPayment, getAllPayments, deletePayment, getPayment, editPayment } = require('./controllers/paymentController');
const { createClient, getAllClients, getClient, editClient, deleteClient } = require('./controllers/clientController');
const cors = require('./middleware/cors');

const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow your frontend domain
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS'); // Allow specific HTTP methods
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
    res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (e.g., cookies)

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200); // Respond with 200 OK
    }

    next();
});
/* app.use(cors({
    origin: ['https://fluxloop.vercel.app'],
    methods: ['POST', 'GET', 'DELETE', 'PUT'],
    credentials: true
})) */
app.use(express.json())
app.use(cookieParser())

mongoose.connect(`mongodb+srv://cereals:${process.env.DB_PASS}@cluster0.uf79cow.mongodb.net/DigitLynkDB?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(3001, () => {
            console.log(`Server is running on port 3001`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas: ', error);
    });

app.get('/', (req, res) => {
    res.json('hello from backend')
})

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
app.get('/user/:id', findUser)
app.post('/addUser', addUser)
app.post('/removeUser', removeUser)

//Business
app.get('/business', getBusiness)
app.post('/editBusiness', editBusiness)

//Client
app.post('/client', createClient)
app.get('/clients', getAllClients)
app.get('/client', getClient)
app.post('/editClient', editClient)
app.post('/deleteClient', deleteClient)

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

//Payment
app.post('/payment', createPayment)
app.get('/payments', getAllPayments)
app.post('/deletePayment', deletePayment)
app.get('/payment', getPayment)
app.post('/editPayment', editPayment)

module.exports = app