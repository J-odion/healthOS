import { useState, useEffect } from 'react';
import { User, Shield, MapPin, Hash, Activity, ArrowRight, X, FileText, HeartPulse } from 'lucide-react';
import { toast } from 'sonner';
import { useHospitalStore } from '../../store/hospitalStore';

interface Demographics {
  id: string;
  name: string;
  age: number;
  address: string;
  cardNumber: string;
  insuranceStatus: 'ACTIVE' | 'EXPIRED' | 'NONE';
  lastActive: string;
  isActive: boolean;
}

export default function PatientDemographics() {
  const [patients, setPatients] = useState<Demographics[]>([]);
  const [showReactivateModal, setShowReactivateModal] = useState<string | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
  const [selectedDept, setSelectedDept] = useState('General Practice');
  const globalPatients = useHospitalStore(state => state.patients);
  const addToTriage = useHospitalStore(state => state.addToTriage);
  
  useEffect(() => {
    const data = Object.values(globalPatients).map(p => ({
      id: p.id,
      name: p.name,
      age: p.age,
      address: 'On File',
      cardNumber: p.id,
      insuranceStatus: 'ACTIVE' as const,
      lastActive: new Date().toISOString(),
      isActive: true
    }));
    
    setPatients(data);
  }, [globalPatients]);

  const reactivateFile = (id: string) => {
    setShowReactivateModal(id);
  };

  const confirmReactivate = () => {
    if (!showReactivateModal) return;
    const success = addToTriage(showReactivateModal);
    if (success) {
      setPatients(patients.map(p => {
        if (p.id === showReactivateModal) {
          toast.success(`Patient file for ${p.name} re-activated and booked for ${selectedDept}. Wallet charged ₦5,000.`);
          return { ...p, isActive: true, lastActive: new Date().toISOString() };
        }
        return p;
      }));
      setShowReactivateModal(null);
    } else {
      toast.error('Insufficient wallet funds to reactivate and book consultation.');
    }
  };

  const handleAssignToTriage = (id: string, name: string) => {
    const success = addToTriage(id);
    if (success) {
      toast.success(`${name} assigned to Triage. Wallet charged ₦5,000 for Consultation.`);
    } else {
      toast.error(`Insufficient wallet funds for ${name} to proceed with consultation.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Patient Demographics</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Age & Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Card Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {patients.map((patient) => (
              <tr 
                key={patient.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer"
                onClick={() => setSelectedPatientId(patient.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-slate-400 mr-3" />
                    <span className="font-medium text-slate-900">{patient.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <div className="flex flex-col">
                    <span>{patient.age} years</span>
                    <span className="flex items-center text-xs mt-1"><MapPin className="h-3 w-3 mr-1"/> {patient.address}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <div className="flex flex-col">
                    <span className="flex items-center"><Hash className="h-3 w-3 mr-1"/> {patient.cardNumber}</span>
                    <span className="flex items-center mt-1">
                      <Shield className="h-3 w-3 mr-1"/> 
                      <span className={`px-2 inline-flex text-[10px] leading-4 font-semibold rounded-full ${patient.insuranceStatus === 'ACTIVE' ? 'bg-green-100 text-green-800' : patient.insuranceStatus === 'EXPIRED' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'}`}>
                        {patient.insuranceStatus}
                      </span>
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${patient.isActive ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'}`}>
                    {patient.isActive ? 'ACTIVE' : 'DEACTIVATED'}
                  </span>
                  {!patient.isActive && <p className="text-xs text-slate-400 mt-1">Inactive &gt; 48h</p>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3 items-center">
                    {!patient.isActive ? (
                      <button onClick={() => reactivateFile(patient.id)} className="text-brand-600 hover:text-brand-900 flex items-center">
                        <Activity className="h-4 w-4 mr-1" /> Re-activate
                      </button>
                    ) : (
                      <span className="text-slate-400">Up to date</span>
                    )}
                    {patient.isActive && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAssignToTriage(patient.id, patient.name);
                        }}
                        className="text-blue-600 hover:text-blue-900 flex items-center transition-colors"
                      >
                        Assign to Triage <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showReactivateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Re-activate Patient File</h3>
            <p className="text-sm text-slate-600 mb-4">Patient has been inactive for &gt;48hrs. Select the department they wish to visit. A consultation fee of ₦5,000 will be deducted from their wallet to reactivate and book.</p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
              <select 
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-brand-500 bg-white text-slate-700"
              >
                <option value="General Practice">General Practice</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Maternity & ANC">Maternity & ANC</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>

            <div className="flex space-x-3">
              <button 
                onClick={() => setShowReactivateModal(null)}
                className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={confirmReactivate}
                className="flex-1 px-4 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors flex items-center justify-center"
              >
                Pay ₦5,000 & Re-activate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Patient Side Sheet */}
      {selectedPatientId && globalPatients[selectedPatientId] && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40" onClick={() => setSelectedPatientId(null)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center font-bold text-xl">
                  {globalPatients[selectedPatientId].name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{globalPatients[selectedPatientId].name}</h3>
                  <p className="text-sm text-slate-500">{globalPatients[selectedPatientId].id} • {globalPatients[selectedPatientId].age} yrs • {globalPatients[selectedPatientId].gender}</p>
                </div>
              </div>
              <button onClick={() => setSelectedPatientId(null)} className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-200 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-8">
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Patient Demographics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Blood Group</p>
                    <p className="font-medium text-slate-800">{globalPatients[selectedPatientId].bloodGroup}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <p className="text-xs text-slate-500 mb-1">Genotype</p>
                    <p className="font-medium text-slate-800">{globalPatients[selectedPatientId].genotype}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 col-span-2">
                    <p className="text-xs text-slate-500 mb-1">Wallet Balance</p>
                    <p className="font-bold text-emerald-600 text-lg">₦ {globalPatients[selectedPatientId].walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Medical History</h4>
                <div className="space-y-4">
                  {!globalPatients[selectedPatientId].medicalHistory || globalPatients[selectedPatientId].medicalHistory.length === 0 ? (
                    <p className="text-slate-500 text-sm italic">No medical history available.</p>
                  ) : (
                    globalPatients[selectedPatientId].medicalHistory.map((record) => (
                      <div key={record.id} className="relative pl-6 pb-4 border-l-2 border-slate-200 last:pb-0">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-white border-2 border-brand-500"></div>
                        <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-medium text-slate-800 flex items-center text-sm">
                              {record.type === 'VITALS' && <HeartPulse className="h-4 w-4 mr-2 text-red-500" />}
                              {record.type === 'NOTE' && <FileText className="h-4 w-4 mr-2 text-blue-500" />}
                              {record.type === 'LAB' && <Activity className="h-4 w-4 mr-2 text-purple-500" />}
                              {record.type === 'PRESCRIPTION' && <FileText className="h-4 w-4 mr-2 text-teal-500" />}
                              {record.type}
                            </span>
                            <span className="text-xs text-slate-400">{new Date(record.date).toLocaleDateString()}</span>
                          </div>
                          <p className="text-slate-600 text-sm">{record.details}</p>
                          <p className="text-xs text-slate-400 mt-3 pt-2 border-t border-slate-100 flex items-center">
                            <User className="h-3 w-3 mr-1" /> {record.provider}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex space-x-3">
              <button 
                onClick={() => handleAssignToTriage(selectedPatientId, globalPatients[selectedPatientId].name)}
                className="flex-1 bg-brand-600 text-white py-2.5 rounded-lg font-medium hover:bg-brand-700 transition-colors"
              >
                Assign to Triage
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
