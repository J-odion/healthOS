import { useState, useEffect } from 'react';
import { Activity, Stethoscope, FlaskConical, Pill, Save, CheckCircle, User as UserIcon, Brain, AlertTriangle, Users } from 'lucide-react';
import { toast } from 'sonner';
import InteractiveBodyMap from '../../components/clinical/InteractiveBodyMap';
import { useSessionStore } from '../../store/sessionStore';
import { useAuthStore } from '../../store/authStore';
import { useHospitalStore } from '../../store/hospitalStore';

export default function ConsultationRoom() {
  const [activePatient, setActivePatient] = useState<any>(null);
  const [note, setNote] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [bodyMapActive, setBodyMapActive] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);
  const [showRxModal, setShowRxModal] = useState(false);
  const [labTestName, setLabTestName] = useState('');
  const [rxName, setRxName] = useState('');
  
  const setClinicalSessionActive = useSessionStore((state) => state.setClinicalSessionActive);
  const user = useAuthStore((state) => state.user);

  const consultationQueue = useHospitalStore(state => state.consultationQueue);
  const removeFromQueue = useHospitalStore(state => state.removeFromQueue);
  const addLabOrder = useHospitalStore(state => state.addLabOrder);
  const addPrescription = useHospitalStore(state => state.addPrescription);
  const addClinicalNote = useHospitalStore(state => state.addClinicalNote);

  useEffect(() => {
    setClinicalSessionActive(true);
    return () => setClinicalSessionActive(false);
  }, [setClinicalSessionActive]);

  const handleFinish = () => {
    if (!activePatient) return;
    const timestamp = new Date().toLocaleString();
    const doctorSignature = `\n\n---\nSigned by: ${user?.email || 'Dr. Unknown'}\nDate: ${timestamp}`;
    const finalNote = note + doctorSignature;
    
    addClinicalNote(activePatient.patientId, finalNote, user?.email || 'Doctor');
    removeFromQueue('consultation', activePatient.patientId);
    
    toast.success('Consultation completed and saved to EMR.');
    setNote('');
    setActivePatient(null);
  };

  const handleAreaSelect = (area: string) => {
    setNote(prev => prev + (prev.length > 0 ? '\n' : '') + `[System]: Patient reports issue in ${area}. `);
  };

  const submitLabOrder = () => {
    if (!activePatient || !labTestName) return;
    const cost = 12500; // Mock standard lab cost
    const success = addLabOrder(activePatient.patientId, labTestName, cost);
    if (success) {
      toast.success(`Lab order submitted. ₦${cost} charged to wallet.`);
      setShowLabModal(false);
      setLabTestName('');
    } else {
      toast.error(`Insufficient wallet funds to order ${labTestName}.`);
    }
  };

  const submitPrescription = () => {
    if (!activePatient || !rxName) return;
    const cost = 8000; // Mock rx cost
    const success = addPrescription(activePatient.patientId, rxName, cost);
    if (success) {
      toast.success(`Prescription submitted. ₦${cost} charged to wallet.`);
      setShowRxModal(false);
      setRxName('');
    } else {
      toast.error(`Insufficient wallet funds for ${rxName}.`);
    }
  };

  if (!activePatient) {
    return (
      <div className="flex h-full space-x-6">
        <div className="w-1/2 flex flex-col space-y-6">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <Stethoscope className="mr-2 text-brand-600 h-6 w-6" /> Consultation Queue
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-200">
            {consultationQueue.map((patient) => (
              <div 
                key={patient.patientId} 
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => setActivePatient(patient)}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mr-4">
                    <Users className="h-5 w-5 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">{patient.patientName}</h4>
                    <p className="text-xs text-slate-500">Waiting since: {new Date(patient.timeAdded).toLocaleTimeString()}</p>
                  </div>
                </div>
                <button className="px-3 py-1 bg-brand-50 text-brand-700 text-sm font-medium rounded hover:bg-brand-100">
                  Call Patient
                </button>
              </div>
            ))}
            {consultationQueue.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No patients waiting for consultation.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const vitals = activePatient.vitals || { bp: '---', hr: '--', temp: '--', spo2: '--' };

  return (
    <div className="flex h-full space-x-6">
      <div className="flex-1 flex flex-col space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 bg-brand-100 rounded-full flex items-center justify-center mr-4">
              <UserIcon className="h-8 w-8 text-brand-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{activePatient.patientName}</h2>
              <p className="text-sm text-slate-500">ID: {activePatient.patientId}</p>
            </div>
          </div>
          <button onClick={() => setActivePatient(null)} className="text-sm text-slate-500 hover:text-slate-800">
            Back to Queue
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center">
              <Stethoscope className="mr-2 text-brand-600 h-5 w-5" /> Clinical Note
            </h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setBodyMapActive(!bodyMapActive)}
                className={`text-sm px-3 py-1 rounded-md transition-colors flex items-center ${bodyMapActive ? 'bg-brand-100 text-brand-700' : 'border border-slate-200 text-slate-600'}`}
              >
                {bodyMapActive ? 'Hide Body Map' : 'Show Body Map'}
              </button>
              <button 
                onClick={() => setShowAI(!showAI)}
                className={`text-sm px-3 py-1 rounded-md transition-colors flex items-center ${showAI ? 'bg-purple-100 text-purple-700 border border-purple-200' : 'bg-brand-50 text-brand-700'}`}
              >
                <Brain className="h-4 w-4 mr-1" /> AI Assist
              </button>
            </div>
          </div>
          
          <div className="flex gap-4">
            <textarea 
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="flex-1 h-64 p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none transition-all"
              placeholder="Document patient history, symptoms, and examination findings here..."
            />
            {bodyMapActive && (
               <div className="w-64 animate-in slide-in-from-right-4 fade-in">
                 <InteractiveBodyMap onAreaSelect={handleAreaSelect} />
               </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleFinish} className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl shadow-sm hover:bg-green-700 transition-colors flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" /> Finish Consultation
          </button>
        </div>
      </div>

      <div className="w-80 flex flex-col space-y-6">
        {showAI && (
          <div className="bg-purple-50 p-5 rounded-xl shadow-sm border border-purple-200 animate-in slide-in-from-right-4 fade-in">
            <h3 className="font-semibold text-purple-900 flex items-center mb-3 border-b border-purple-100 pb-2">
              <Brain className="mr-2 text-purple-600 h-5 w-5" /> AI Clinical Assistant
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-3 rounded-lg border border-purple-100 shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Differential Diagnosis</p>
                <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
                  <li>Malaria</li>
                  <li>Typhoid Fever</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-800 flex items-center mb-4">
            <Activity className="mr-2 text-red-500 h-5 w-5" /> Recent Vitals
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">BP</span>
              <span className="font-medium">{vitals.bp} mmHg</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Pulse</span>
              <span className="font-medium">{vitals.hr} bpm</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Temp</span>
              <span className="font-medium">{vitals.temp} °C</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 flex-1">
          <h3 className="font-semibold text-slate-800 mb-4">Quick Orders</h3>
          <div className="space-y-3">
            <button onClick={() => setShowLabModal(true)} className="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-slate-700 font-medium">
              <FlaskConical className="h-5 w-5 mr-3 text-purple-500" /> Order Lab Test
            </button>
            <button onClick={() => setShowRxModal(true)} className="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-slate-700 font-medium">
              <Pill className="h-5 w-5 mr-3 text-teal-500" /> Write Prescription
            </button>
          </div>
        </div>
      </div>
      
      {showLabModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Order Lab Test</h3>
            <input 
              value={labTestName} 
              onChange={e => setLabTestName(e.target.value)}
              className="w-full border border-slate-300 p-2 rounded mb-4" 
              placeholder="e.g. Complete Blood Count" 
            />
            <button onClick={submitLabOrder} className="w-full bg-brand-600 text-white p-2 rounded-lg">Submit Order & Charge</button>
            <button onClick={() => setShowLabModal(false)} className="w-full mt-2 bg-slate-100 text-slate-700 p-2 rounded-lg">Cancel</button>
          </div>
        </div>
      )}
      
      {showRxModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Write Prescription</h3>
            <input 
              value={rxName} 
              onChange={e => setRxName(e.target.value)}
              className="w-full border border-slate-300 p-2 rounded mb-4" 
              placeholder="e.g. Paracetamol 500mg" 
            />
            <button onClick={submitPrescription} className="w-full bg-teal-600 text-white p-2 rounded-lg">Sign, Charge & Send</button>
            <button onClick={() => setShowRxModal(false)} className="w-full mt-2 bg-slate-100 text-slate-700 p-2 rounded-lg">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
