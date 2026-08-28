import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';


function App() {
  return (
  <BrowserRouter>
  <Routes>
  <Route path="/register" element={<RegisterForm />} />
  </Routes>
  </BrowserRouter>
  );
}

export default App;
