import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Products from './components/Products';
import Product from './components/Product';
import ProductCreate from './components/ProductCreate';
import Home from './pages/Home';
import PaymentSuccess from './components/PaymentSuccess';


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<Product />} />
      <Route path="/products/create" element={<ProductCreate />} />
      <Route path="/payment-success" element={<PaymentSuccess />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
