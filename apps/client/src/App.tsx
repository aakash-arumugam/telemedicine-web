import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import BookAppointment from './pages/BookAppointment';
import AppointmentDetails from './pages/AppointmentDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/appointment/:id" element={<AppointmentDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
