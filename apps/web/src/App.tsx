import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import ProtectedLayout from './layouts/ProtectedLayout';
import PublicLayout from './layouts/PublicLayout';
import LoginForm from './components/auth/LoginForm';

// Import Pages
import PatientRegistration from './pages/reception/PatientRegistration';
import QueueBoard from './pages/reception/QueueBoard';
import ConsultationRoom from './pages/doctor/ConsultationRoom';
import VirtualConsultationRoom from './pages/doctor/VirtualConsultationRoom';
import Dashboard from './pages/dashboard/Dashboard';
import TriageDashboard from './pages/nurse/TriageDashboard';
import LabDashboard from './pages/lab/LabDashboard';
import PharmacyDashboard from './pages/pharmacy/PharmacyDashboard';
import BillingDashboard from './pages/billing/BillingDashboard';
import ExecutiveDashboard from './pages/dashboard/ExecutiveDashboard';
import WardManagementBoard from './pages/nurse/WardManagementBoard';
import InventoryDashboard from './pages/inventory/InventoryDashboard';
import AdminControlPanel from './pages/admin/AdminControlPanel';
import HRDashboard from './pages/hr/HRDashboard';
import AssetDashboard from './pages/maintenance/AssetDashboard';
import ClaimsPortal from './pages/billing/ClaimsPortal';

// Enterprise Modules
import SurgerySchedule from './pages/clinical/SurgerySchedule';
import AmbulanceDispatch from './pages/emergency/AmbulanceDispatch';
import BloodBank from './pages/clinical/BloodBank';
import RadiologyViewer from './pages/clinical/RadiologyViewer';
import DietaryManagement from './pages/kitchen/DietaryManagement';
import MortuaryManagement from './pages/admin/MortuaryManagement';

// Patient Portal Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import BookAppointment from './pages/patient/BookAppointment';
import VirtualWaitingRoom from './pages/patient/VirtualWaitingRoom';

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
          <Route path="/telemedicine" element={<VirtualConsultationRoom />} />
          <Route path="/triage" element={<TriageDashboard />} />
          <Route path="/lab" element={<LabDashboard />} />
          <Route path="/pharmacy" element={<PharmacyDashboard />} />
          <Route path="/billing" element={<BillingDashboard />} />
          
          {/* New Expansion Routes */}
          <Route path="/executive" element={<ExecutiveDashboard />} />
          <Route path="/ward" element={<WardManagementBoard />} />
          <Route path="/inventory" element={<InventoryDashboard />} />
          <Route path="/admin" element={<AdminControlPanel />} />
          <Route path="/hr" element={<HRDashboard />} />
          <Route path="/assets" element={<AssetDashboard />} />
          <Route path="/claims" element={<ClaimsPortal />} />
          
          {/* Enterprise Routes */}
          <Route path="/surgery" element={<SurgerySchedule />} />
          <Route path="/dispatch" element={<AmbulanceDispatch />} />
          <Route path="/blood-bank" element={<BloodBank />} />
          <Route path="/radiology" element={<RadiologyViewer />} />
          <Route path="/dietary" element={<DietaryManagement />} />
          <Route path="/mortuary" element={<MortuaryManagement />} />
          
          {/* Patient Routes */}
          <Route path="/patient/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/book" element={<BookAppointment />} />
          <Route path="/patient/waiting-room" element={<VirtualWaitingRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
