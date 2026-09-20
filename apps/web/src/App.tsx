import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import ProtectedLayout from './layouts/ProtectedLayout';
import PublicLayout from './layouts/PublicLayout';
import LoginForm from './components/auth/LoginForm';

// Import Pages
import PatientRegistration from './pages/reception/PatientRegistration';
import QueueBoard from './pages/reception/QueueBoard';
import ConsultationRoom from './pages/doctor/ConsultationRoom';
import Dashboard from './pages/dashboard/Dashboard';
import TriageDashboard from './pages/nurse/TriageDashboard';
import LabDashboard from './pages/lab/LabDashboard';
import PharmacyDashboard from './pages/pharmacy/PharmacyDashboard';
import BillingDashboard from './pages/billing/BillingDashboard';

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginForm />} />
        </Route>
        
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={
            <div className="space-y-6">
              <PatientRegistration />
              <QueueBoard />
            </div>
          } />
          <Route path="/consultations" element={<ConsultationRoom />} />
          <Route path="/triage" element={<TriageDashboard />} />
          <Route path="/lab" element={<LabDashboard />} />
          <Route path="/pharmacy" element={<PharmacyDashboard />} />
          <Route path="/billing" element={<BillingDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
