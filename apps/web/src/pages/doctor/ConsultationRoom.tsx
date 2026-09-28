import { useState, useEffect } from 'react';
import { Activity, Stethoscope, FlaskConical, Pill, Save, CheckCircle, User as UserIcon, Brain, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import InteractiveBodyMap from '../../components/clinical/InteractiveBodyMap';
import { useSessionStore } from '../../store/sessionStore';
import { useAuthStore } from '../../store/authStore';

export default function ConsultationRoom() {
  const [note, setNote] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [bodyMapActive, setBodyMapActive] = useState(false);
  const [submittedNotes, setSubmittedNotes] = useState<{ id: string; text: string; timestamp: string }[]>([]);
  const [showLabModal, setShowLabModal] = useState(false);
  const [showRxModal, setShowRxModal] = useState(false);
  const setClinicalSessionActive = useSessionStore((state) => state.setClinicalSessionActive);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setClinicalSessionActive(true);
    return () => setClinicalSessionActive(false);
  }, [setClinicalSessionActive]);

  const patient = {
    name: 'Emily Chen',
    age: 32,
    gender: 'Female',
    id: 'PT-9942',
    chiefComplaint: 'Persistent headache and mild fever for 3 days',
    vitals: { bp: '118/75', hr: '84', temp: '38.1', spo2: '99' }
  };

  const handleFinish = () => {
    const timestamp = new Date().toLocaleString();
    const doctorSignature = `\n\n---\nSigned by: ${user?.email || 'Dr. Unknown'} (Role: ${user?.role || 'Doctor'})\nDate: ${timestamp}`;
    const finalNote = note + doctorSignature;
    
    // In a real app, send `finalNote` to backend here
    setSubmittedNotes([...submittedNotes, { id: Date.now().toString(), text: finalNote, timestamp }]);
    toast.success('Consultation completed and saved to EMR.');
    setNote('');
    setClinicalSessionActive(false); // End session
  };

  const handleEditNote = (id: string) => {
    const noteToEdit = submittedNotes.find(n => n.id === id);
    if (noteToEdit) {
      // Remove signature for editing
      const textWithoutSig = noteToEdit.text.split('\n\n---')[0];
      setNote(textWithoutSig);
      setSubmittedNotes(submittedNotes.filter(n => n.id !== id));
      setClinicalSessionActive(true);
    }
  };

  const handleAreaSelect = (area: string) => {
    setNote(prev => prev + (prev.length > 0 ? '\n' : '') + `[System]: Patient reports issue in ${area}. `);
  };

  return (
    <div className="flex h-full space-x-6">
      {/* Main EMR Area */}
      <div className="flex-1 flex flex-col space-y-6">
        {/* Patient Context */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 bg-brand-100 rounded-full flex items-center justify-center mr-4">
              <UserIcon className="h-8 w-8 text-brand-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{patient.name}</h2>
              <p className="text-sm text-slate-500">{patient.age} yrs • {patient.gender} • ID: {patient.id}</p>
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg max-w-xs">
            <p className="text-xs font-semibold text-orange-800 uppercase tracking-wider mb-1">Chief Complaint</p>
            <p className="text-sm text-orange-900">{patient.chiefComplaint}</p>
          </div>
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
              <button className="text-sm px-3 py-1 bg-brand-50 text-brand-700 rounded-md hover:bg-brand-100 transition-colors flex items-center">
                <Save className="h-4 w-4 mr-1" /> Save Draft
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
        
        {/* Past Records / Submitted Notes */}
        {submittedNotes.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-6">
            <h3 className="font-semibold text-slate-800 mb-4">Past Clinical Notes</h3>
            <div className="space-y-4">
              {submittedNotes.map((n) => (
                <div key={n.id} className="p-4 border border-slate-100 rounded-lg bg-slate-50">
                  <div className="text-xs text-slate-500 mb-2">{n.timestamp}</div>
                  <div className="text-sm text-slate-700 whitespace-pre-wrap">{n.text}</div>
                  <button 
                    onClick={() => handleEditNote(n.id)}
                    className="mt-3 text-sm text-brand-600 hover:text-brand-700 font-medium"
                  >
                    Edit Record
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sidebar Panels (Vitals, Orders) */}
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
                  <li>Malaria (Consider endemic region)</li>
                  <li>Typhoid Fever</li>
                  <li>Viral Upper Respiratory Infection</li>
                </ul>
              </div>

              <div className="bg-orange-50 p-3 rounded-lg border border-orange-200 shadow-sm flex items-start">
                <AlertTriangle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-bold text-orange-800 uppercase tracking-wider mb-0.5">Interaction Alert</p>
                  <p className="text-xs text-orange-900">Patient has documented allergy to Penicillin. Avoid Amoxicillin if prescribing antibiotics.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Vitals */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-800 flex items-center mb-4">
            <Activity className="mr-2 text-red-500 h-5 w-5" /> Recent Vitals
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">BP</span>
              <span className="font-medium">{patient.vitals.bp} mmHg</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Pulse</span>
              <span className="font-medium">{patient.vitals.hr} bpm</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Temp</span>
              <span className={`font-medium ${parseFloat(patient.vitals.temp) > 37.5 ? 'text-red-600' : ''}`}>{patient.vitals.temp} °C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">SpO2</span>
              <span className="font-medium">{patient.vitals.spo2}%</span>
            </div>
          </div>
        </div>

        {/* Quick Orders */}
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
      
      {/* Lab Order Modal Stub */}
      {showLabModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Order Lab Test</h3>
            <p className="text-sm text-slate-500 mb-4">Timestamp: {new Date().toLocaleString()}</p>
            <button onClick={() => { toast.success(`Lab order submitted at ${new Date().toLocaleString()}`); setShowLabModal(false); }} className="w-full bg-brand-600 text-white p-2 rounded-lg">Submit Order</button>
            <button onClick={() => setShowLabModal(false)} className="w-full mt-2 bg-slate-100 text-slate-700 p-2 rounded-lg">Cancel</button>
          </div>
        </div>
      )}
      
      {/* Prescription Modal Stub */}
      {showRxModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Write Prescription</h3>
            <p className="text-sm text-slate-500 mb-4">Timestamp: {new Date().toLocaleString()}</p>
            <button onClick={() => { toast.success(`Prescription submitted at ${new Date().toLocaleString()}`); setShowRxModal(false); }} className="w-full bg-teal-600 text-white p-2 rounded-lg">Sign & Send</button>
            <button onClick={() => setShowRxModal(false)} className="w-full mt-2 bg-slate-100 text-slate-700 p-2 rounded-lg">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
