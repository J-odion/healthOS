import { useState } from 'react';
import { Calendar, CheckCircle, Clock, User, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useHospitalStore } from '../../store/hospitalStore';

export default function AppointmentManager() {
  const appointments = useHospitalStore(state => state.appointments);
  const patients = useHospitalStore(state => state.patients);
  const addToTriage = useHospitalStore(state => state.addToTriage);
  
  const [showWalkInModal, setShowWalkInModal] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [selectedDept, setSelectedDept] = useState('General Practice');

  const handleCheckIn = (patientId: string, department: string) => {
    // Normally you'd want an action in store to update the appointment status to COMPLETED/CHECKED_IN
    const success = addToTriage(patientId, department);
    if (success) {
      toast.success(`Patient checked in to ${department} triage successfully!`);
    } else {
      toast.error(`Insufficient wallet funds to check in for consultation.`);
    }
  };

  const handleWalkInSubmit = () => {
    if (!selectedPatientId) {
      toast.error('Please select a patient.');
      return;
    }
    const success = addToTriage(selectedPatientId, selectedDept);
    if (success) {
      toast.success(`Walk-in appointment booked. Patient sent to ${selectedDept} triage.`);
      setShowWalkInModal(false);
      setSelectedPatientId('');
    } else {
      toast.error(`Insufficient wallet funds. Please fund wallet first.`);
    }
  };

  const pendingAppointments = appointments.filter(a => a.status === 'SCHEDULED');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Appointments</h2>
        <button 
          onClick={() => setShowWalkInModal(true)}
          className="px-4 py-2 bg-brand-600 text-white rounded-lg shadow-sm hover:bg-brand-700 font-medium flex items-center"
        >
          <UserPlus className="h-5 w-5 mr-2" /> Book Walk-in Appointment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-brand-600" /> Prebooked Appointments
          </h3>
          <span className="text-sm font-medium text-slate-500">{pendingAppointments.length} upcoming</span>
        </div>
        
        {pendingAppointments.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            <Calendar className="h-12 w-12 mx-auto text-slate-300 mb-3" />
            <p>No prebooked appointments currently scheduled.</p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {pendingAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-slate-400 mr-3" />
                      <div>
                        <span className="font-medium text-slate-900 block">{apt.patientName}</span>
                        <span className="text-xs text-slate-500">{apt.patientId}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-slate-400" />
                      {apt.date} at {apt.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{apt.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${apt.type === 'TELEMEDICINE' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                      {apt.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleCheckIn(apt.patientId, apt.department)}
                      className="text-brand-600 hover:text-brand-900 flex items-center transition-colors"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" /> Check-in to Triage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showWalkInModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Book Walk-in Appointment</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Select Patient</label>
                <select 
                  value={selectedPatientId}
                  onChange={e => setSelectedPatientId(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="">-- Choose a registered patient --</option>
                  {Object.values(patients).map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <select 
                  value={selectedDept}
                  onChange={e => setSelectedDept(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-brand-500"
                >
                  <option value="General Practice">General Practice</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Maternity & ANC">Maternity & ANC</option>
                  <option value="Orthopedics">Orthopedics</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => setShowWalkInModal(false)}
                className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleWalkInSubmit}
                className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors flex items-center justify-center"
              >
                Book & Charge ₦5k
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
