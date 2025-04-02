import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import DetailPage from "./pages/Detail";
import { AuthProvider } from "../../../server/src/Authentication/Authentication.jsx"; 
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Users from "./pages/Users.jsx";
import Bookings from "./pages/Booking.jsx";
import Chatbot from "./pages/Chatbot.jsx";

function App() {
  return (
    <AuthProvider> 
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clean/:type" element={<DetailPage />} />
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/admin/users" element={<Users/>}/>
          <Route path="/admin/booking" element={<Bookings/>}/>
          <Route path="/chatbot" element={<Chatbot/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
