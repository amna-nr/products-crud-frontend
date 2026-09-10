import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Products from './components/Products';
import Product from './components/Product';
import Home from './pages/Home';


function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<Product />} />

    </Routes>
  </BrowserRouter>
  );
}

export default App;
