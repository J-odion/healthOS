import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import ProtectedLayout from './layouts/ProtectedLayout';
import PublicLayout from './layouts/PublicLayout';
import LoginForm from './components/auth/LoginForm';

// Import Pages
import PatientRegistration from './pages/reception/PatientRegistration';
import QueueBoard from './pages/reception/QueueBoard';
import ConsultationRoom from './pages/doctor/ConsultationRoom';
import { LabDashboard, PharmacyDashboard, BillingDashboard, TriageDashboard } from './pages/stubs/DepartmentStubs';

const DashboardStub = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
    <h2 className="text-xl font-semibold text-slate-800 mb-4">Welcome to HospiOS</h2>
    <p className="text-slate-600">Your premium hospital management dashboard is ready. Select a module from the sidebar.</p>
  </div>
);

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
          <Route path="/" element={<DashboardStub />} />
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
