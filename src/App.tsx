import './App.css';
import {Route, Routes, BrowserRouter } from 'react-router-dom';

import Vehicles from './components/vehicle/Vehicles';
import Review from './components/review/Review';
import Navbar from './components/Navbar';
import Contact from './components/Contact';
import About from './components/About';
import VehicleDetails from './components/VehicleDetails';
import Register from './components/user/Register';
import Login from './components/user/Login';
import UserProfile from './components/user/UserProfile';
import UpdateUserProfile from './components/user/UpdateUserProfile';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Vehicles />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/vehicle/:id" element={<VehicleDetails />} />
          <Route path="/reviews" element={<Review />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/update" element={<UpdateUserProfile />} />
        </Routes>
        <Footer />
        </BrowserRouter>  
    </div>
  );
}

export default App;
