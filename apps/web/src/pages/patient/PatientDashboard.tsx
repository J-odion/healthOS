import { useState } from 'react';
import { Calendar, Video, FileText, Activity, Smartphone, CreditCard, Baby, HeartPulse, Scan, UploadCloud, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [showScanModal, setShowScanModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowScanModal(false);
      toast.success('Physical folder scanned and digitized successfully!');
    }, 3000);
  };
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome, Emily Chen</h2>
          <p className="text-slate-500">Patient ID: PT-9942</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => navigate('/patient/book')}
            className="px-6 py-2 bg-brand-600 text-white rounded-lg shadow-sm hover:bg-brand-700 font-medium"
          >
            Book Appointment
          </button>
        </div>
      </div>

      {/* Digital Wallet */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/4"></div>
        <div className="z-10 mb-6 md:mb-0">
          <h3 className="text-xl font-bold flex items-center mb-2">
            <CreditCard className="h-6 w-6 mr-2 text-emerald-100" /> Digital Wallet Balance
          </h3>
          <p className="text-emerald-100 max-w-md text-sm">
            Fund your wallet for seamless cashless payments across all hospital services.
          </p>
          <p className="text-4xl font-bold mt-4">₦ 45,500.00</p>
        </div>
        <div className="z-10 flex space-x-4">
          <button onClick={() => toast.success('Redirecting to payment gateway...')} className="px-5 py-2.5 bg-white text-emerald-700 hover:bg-slate-100 rounded-xl font-medium text-sm transition-colors shadow-md">
            Fund Wallet
          </button>
          <button className="px-5 py-2.5 bg-emerald-800 text-white hover:bg-emerald-900 border border-emerald-700 rounded-xl font-medium text-sm transition-colors shadow-md">
            View History
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center mb-4">
            <Calendar className="mr-2 h-5 w-5 text-brand-600" /> Upcoming Appointments
          </h3>
          <div className="space-y-4">
            <div className="p-4 border border-blue-100 bg-blue-50 rounded-lg flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-800">Follow-up: Persistent Headache</p>
                <p className="text-sm text-slate-600 flex items-center mt-1">
                  <Video className="h-4 w-4 mr-1 text-blue-600" /> Telemedicine with Dr. Smith
                </p>
                <p className="text-sm text-slate-500 mt-1">Today at 10:30 AM</p>
              </div>
              <button 
                onClick={() => navigate('/patient/waiting-room')}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 shadow-sm"
              >
                Join Call
              </button>
            </div>
          </div>
        </div>

        {/* Recent Records & Folder Scanning */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <FileText className="mr-2 h-5 w-5 text-brand-600" /> Recent Medical Records
            </h3>
            <button onClick={() => setShowScanModal(true)} className="flex items-center text-sm text-brand-600 hover:text-brand-800 bg-brand-50 px-3 py-1.5 rounded-lg transition-colors">
              <Scan className="h-4 w-4 mr-1" /> Scan Folder
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer border border-transparent hover:border-slate-200 transition-colors">
              <Activity className="h-8 w-8 text-purple-500 bg-purple-100 p-1.5 rounded-lg mr-3" />
              <div>
                <p className="font-medium text-slate-800">Complete Blood Count (CBC)</p>
                <p className="text-xs text-slate-500">Oct 12, 2026 • Lab Result</p>
              </div>
            </div>
            <div className="flex items-center p-3 hover:bg-slate-50 rounded-lg cursor-pointer border border-transparent hover:border-slate-200 transition-colors">
              <FileText className="h-8 w-8 text-teal-500 bg-teal-100 p-1.5 rounded-lg mr-3" />
              <div>
                <p className="font-medium text-slate-800">Prescription: Paracetamol</p>
                <p className="text-xs text-slate-500">Oct 10, 2026 • Pharmacy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Maternity / ANC Tracker */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10">
          <Baby className="w-48 h-48 text-pink-500 transform translate-x-1/4 -translate-y-1/4" />
        </div>
        
        <div className="z-10 relative">
          <h3 className="text-xl font-bold flex items-center mb-4 text-pink-900">
            <Baby className="h-6 w-6 mr-2 text-pink-600" /> Antenatal Care Journey
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/80 p-4 rounded-lg border border-pink-100 text-center backdrop-blur-sm">
               <p className="text-sm font-medium text-pink-700">Current Week</p>
               <p className="text-3xl font-bold text-pink-900 mt-1">24<span className="text-lg text-pink-600 font-normal">wks</span></p>
            </div>
            
            <div className="bg-white/80 p-4 rounded-lg border border-pink-100 text-center backdrop-blur-sm">
               <p className="text-sm font-medium text-pink-700">Est. Due Date</p>
               <p className="text-xl font-bold text-pink-900 mt-2">Feb 14, 2027</p>
            </div>
            
            <div className="md:col-span-2 bg-white/80 p-4 rounded-lg border border-pink-100 backdrop-blur-sm flex items-center justify-between">
               <div>
                 <p className="text-sm font-medium text-pink-700 flex items-center">
                   <HeartPulse className="h-4 w-4 mr-1 text-red-500" /> Latest Fetal HR
                 </p>
                 <p className="text-xl font-bold text-pink-900 mt-1">142 bpm</p>
               </div>
               <button className="px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded hover:bg-pink-700 transition-colors">
                 View Ultrasound
               </button>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between text-xs font-bold text-pink-700 mb-2">
              <span>Trimester 1</span>
              <span>Trimester 2</span>
              <span>Trimester 3</span>
            </div>
            <div className="w-full bg-pink-200 rounded-full h-3">
              <div className="bg-pink-600 h-3 rounded-full relative" style={{ width: '60%' }}>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-5 h-5 bg-white border-4 border-pink-600 rounded-full shadow-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Card Mobile Wallet Integration */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-center relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-brand-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 transform translate-x-1/2 -translate-y-1/4"></div>
        
        <div className="z-10 mb-6 md:mb-0">
          <h3 className="text-xl font-bold flex items-center mb-2">
            <Smartphone className="h-6 w-6 mr-2 text-brand-400" /> Get Your Digital Smart Card
          </h3>
          <p className="text-slate-300 max-w-md text-sm">
            Add your Serene Health Patient ID directly to your phone's digital wallet for seamless check-ins without the physical card.
          </p>
        </div>
        
        <div className="z-10 flex space-x-4">
          <button className="px-5 py-2.5 bg-black hover:bg-slate-800 border border-slate-700 rounded-xl font-medium text-sm transition-colors flex items-center shadow-md">
            <CreditCard className="h-5 w-5 mr-2" /> Add to Apple Wallet
          </button>
          <button className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl font-medium text-sm transition-colors flex items-center shadow-md">
            <CreditCard className="h-5 w-5 mr-2 text-blue-600" /> Add to Google Pay
          </button>
        </div>
      </div>

      {/* Folder Scan Modal */}
      {showScanModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-800 flex items-center">
                <Scan className="h-6 w-6 mr-2 text-brand-600" /> Scan Physical Folder
              </h3>
            </div>
            <p className="text-slate-600 text-sm mb-6">
              Use your device camera to scan and digitize your physical medical records and folders directly into your personal page.
            </p>
            
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50 mb-6">
              {isScanning ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin"></div>
                  <p className="text-brand-600 font-medium">Scanning and extracting text...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <UploadCloud className="h-12 w-12 text-slate-400 mb-3" />
                  <p className="font-medium text-slate-700">Position document in frame</p>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => setShowScanModal(false)}
                disabled={isScanning}
                className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleScan}
                disabled={isScanning}
                className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              >
                <Camera className="h-4 w-4 mr-2" /> {isScanning ? 'Processing...' : 'Start Scan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
