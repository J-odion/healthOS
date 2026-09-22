import { Calendar, Video, FileText, Activity, Smartphone, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PatientDashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Welcome, Emily Chen</h2>
          <p className="text-slate-500">Patient ID: PT-9942</p>
        </div>
        <button 
          onClick={() => navigate('/patient/book')}
          className="px-6 py-2 bg-brand-600 text-white rounded-lg shadow-sm hover:bg-brand-700 font-medium"
        >
          Book Appointment
        </button>
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

        {/* Recent Records */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center mb-4">
            <FileText className="mr-2 h-5 w-5 text-brand-600" /> Recent Medical Records
          </h3>
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
    </div>
  );
}
