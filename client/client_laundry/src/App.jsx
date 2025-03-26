import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Register from './pages/Register';
import Header from './components/Header';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Login from './pages/Login';
import DetailPage from './pages/Detail';

function App() {
  return (
    <BrowserRouter>
  
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/clean/:type" element={<DetailPage/>} />
        </Routes>
        <Footer />
     
    </BrowserRouter>
  );
}

export default App;
