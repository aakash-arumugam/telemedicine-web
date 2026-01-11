import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import BookAppointment from './pages/BookAppointment';
import AppointmentDetails from './pages/AppointmentDetails';

// Doctor View Imports
import DoctorLayout from './components/layout/DoctorLayout';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorAvailability from './pages/doctor/DoctorAvailability';
import PatientProfile from './pages/doctor/PatientProfile';
import DoctorProfile from './pages/doctor/DoctorProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Patient Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/appointment/:id" element={<AppointmentDetails />} />

        {/* Doctor Routes */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DoctorDashboard />} />
          <Route path="appointments" element={<DoctorAppointments />} />
          <Route path="availability" element={<DoctorAvailability />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="patient/:id" element={<PatientProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
