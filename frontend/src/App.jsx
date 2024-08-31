import React from 'react'
import { Routes, Route} from 'react-router-dom'
import PaymentDashbord from './pages/PaymentDashbord';
import CreatePayment from './pages/CreatePayments';
import ShowPayment from './pages/ShowPayment';
import EditPayment from './pages/EditPayment';
import DeletePayment from './pages/DeletePayment';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<PaymentDashbord />} />
      <Route path='/payments/create' element={<CreatePayment />} />
      <Route path='/payments/details/:id' element={<ShowPayment />} />
      <Route path='/payments/edit/:id' element={<EditPayment />} />
      <Route path='/payments/delete/:id' element={<DeletePayment />} />
    </Routes>
  )
}

export default App