import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import ProtectedLayout from './layouts/ProtectedLayout';
import PublicLayout from './layouts/PublicLayout';
import { Activity } from 'lucide-react';

const LoginForm = lazy(() => import('./components/auth/LoginForm'));
const PatientLoginForm = lazy(() => import('./components/auth/PatientLoginForm'));

// Lazy Import Pages for Performance Optimization
const PatientRegistration = lazy(() => import('./pages/reception/PatientRegistration'));
const QueueBoard = lazy(() => import('./pages/reception/QueueBoard'));
const PatientDemographics = lazy(() => import('./pages/reception/PatientDemographics'));
const AppointmentManager = lazy(() => import('./pages/reception/AppointmentManager'));
const ConsultationRoom = lazy(() => import('./pages/doctor/ConsultationRoom'));
const VirtualConsultationRoom = lazy(() => import('./pages/doctor/VirtualConsultationRoom'));
const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'));
const TriageDashboard = lazy(() => import('./pages/nurse/TriageDashboard'));
const LabDashboard = lazy(() => import('./pages/lab/LabDashboard'));
const PharmacyDashboard = lazy(() => import('./pages/pharmacy/PharmacyDashboard'));
const BillingDashboard = lazy(() => import('./pages/billing/BillingDashboard'));
const ExecutiveDashboard = lazy(() => import('./pages/dashboard/ExecutiveDashboard'));
const WardManagementBoard = lazy(() => import('./pages/nurse/WardManagementBoard'));
const InventoryDashboard = lazy(() => import('./pages/inventory/InventoryDashboard'));
const AdminControlPanel = lazy(() => import('./pages/admin/AdminControlPanel'));
const HRDashboard = lazy(() => import('./pages/hr/HRDashboard'));
const AssetDashboard = lazy(() => import('./pages/maintenance/AssetDashboard'));
const ClaimsPortal = lazy(() => import('./pages/billing/ClaimsPortal'));

// Enterprise Modules
const SurgerySchedule = lazy(() => import('./pages/clinical/SurgerySchedule'));
const SpecializedClinics = lazy(() => import('./pages/clinical/SpecializedClinics'));
const AmbulanceDispatch = lazy(() => import('./pages/emergency/AmbulanceDispatch'));
const BloodBank = lazy(() => import('./pages/clinical/BloodBank'));
const RadiologyViewer = lazy(() => import('./pages/clinical/RadiologyViewer'));
const DietaryManagement = lazy(() => import('./pages/kitchen/DietaryManagement'));
const MortuaryManagement = lazy(() => import('./pages/admin/MortuaryManagement'));

// Patient Portal Pages
const PatientDashboard = lazy(() => import('./pages/patient/PatientDashboardFolder'));
const BookAppointment = lazy(() => import('./pages/patient/BookAppointment'));
const VirtualWaitingRoom = lazy(() => import('./pages/patient/VirtualWaitingRoom'));

const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center p-8 bg-slate-50">
    <div className="flex flex-col items-center space-y-4 text-brand-600">
      <Activity className="h-8 w-8 animate-pulse" />
      <span className="text-sm font-medium">Loading module...</span>
    </div>
  </div>
);

function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginForm />} />
        </Route>
        
        {/* Dedicated Patient Login - Stands alone from staff PublicLayout if needed, but using it here for consistency */}
        <Route path="/patient-login" element={<PatientLoginForm />} />
        
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={
            <div className="space-y-6">
              <PatientRegistration />
              <PatientDemographics />
              <AppointmentManager />
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
          <Route path="/specialized" element={<SpecializedClinics />} />
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
        </Suspense>
    </BrowserRouter>
    </>
  );
}

export default App;
