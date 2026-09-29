import { useState, useEffect } from 'react';
import { Activity, Stethoscope, FlaskConical, Pill, CheckCircle, User as UserIcon, Brain, Users, History, X, Search, Bed, Calendar, Scan, Scissors } from 'lucide-react';
import { toast } from 'sonner';
import InteractiveBodyMap from '../../components/clinical/InteractiveBodyMap';
import { useSessionStore } from '../../store/sessionStore';
import { useAuthStore } from '../../store/authStore';
import { useHospitalStore } from '../../store/hospitalStore';

const NIGERIAN_LAB_TESTS = [
  'Full Blood Count (FBC)', 'Malaria Parasite (MP)', 'Widal Test (Typhoid)',
  'Fasting Blood Sugar (FBS)', 'Lipid Profile', 'Urinalysis',
  'Electrolytes, Urea, and Creatinine (E/U/Cr)', 'Liver Function Test (LFT)',
  'HIV Screening', 'Hepatitis B Surface Antigen (HBsAg)',
  'Hepatitis C Virus (HCV)', 'Genotype (Hb Electrophoresis)', 'Blood Group & Rhesus Factor',
  'Semen Analysis', 'Pregnancy Test (PT)', 'Urine Culture and Sensitivity (MCS)',
  'Stool Microscopy', 'Thyroid Function Test (TFT)', 'Renal Function Test',
  'Prostate Specific Antigen (PSA)', 'Tuberculosis (GeneXpert)'
];

const KNOWN_ILLNESSES = [
  'Malaria', 'Typhoid Fever', 'Hypertension', 'Type 2 Diabetes Mellitus',
  'Peptic Ulcer Disease', 'Upper Respiratory Tract Infection (URTI)',
  'Urinary Tract Infection (UTI)', 'Gastroenteritis', 'Asthma',
  'Sickle Cell Crisis', 'Lassa Fever', 'Cholera'
];


export default function ConsultationRoom() {
  const [activePatient, setActivePatient] = useState<any>(null);
  const [note, setNote] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [bodyMapActive, setBodyMapActive] = useState(false);
  const [showLabModal, setShowLabModal] = useState(false);
  const [showRxModal, setShowRxModal] = useState(false);
  const [showAdmitModal, setShowAdmitModal] = useState(false);
  const [showFollowupModal, setShowFollowupModal] = useState(false);
  const [showRadiologyModal, setShowRadiologyModal] = useState(false);
  const [showSurgeryModal, setShowSurgeryModal] = useState(false);
  const [labTestNames, setLabTestNames] = useState<string[]>([]);
  const [rxName, setRxName] = useState('');
  const [scanName, setScanName] = useState('Chest X-Ray');
  const [surgeryName, setSurgeryName] = useState('');
  const [admitWard, setAdmitWard] = useState('General Ward');
  const [followupDate, setFollowupDate] = useState('');
  const [followupTime, setFollowupTime] = useState('');
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedDiagnoses, setSelectedDiagnoses] = useState<string[]>([]);
  const [searchDiagnosis, setSearchDiagnosis] = useState('');
  
  const setClinicalSessionActive = useSessionStore((state) => state.setClinicalSessionActive);
  const user = useAuthStore((state) => state.user);
  const patients = useHospitalStore(state => state.patients);
  const admitPatient = useHospitalStore(state => state.admitPatient);
  const bookAppointment = useHospitalStore(state => state.bookAppointment);

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
    const diagnosisText = selectedDiagnoses.length > 0 ? `\n\nDiagnoses: ${selectedDiagnoses.join(', ')}` : '';
    const doctorSignature = `\n\n---\nSigned by: ${user?.email || 'Dr. Unknown'}\nDate: ${timestamp}`;
    const finalNote = note + diagnosisText + doctorSignature;
    
    addClinicalNote(activePatient.patientId, finalNote, user?.email || 'Doctor');
    removeFromQueue('consultation', activePatient.patientId);
    
    toast.success('Consultation completed and saved to EMR.');
    setNote('');
    setSelectedDiagnoses([]);
    setActivePatient(null);
  };

  const handleAreaSelect = (area: string) => {
    setNote(prev => prev + (prev.length > 0 ? '\n' : '') + `[System]: Patient reports issue in ${area}. `);
  };

  const submitLabOrder = () => {
    if (!activePatient || labTestNames.length === 0) return;
    const success = addLabOrder(activePatient.patientId, labTestNames);
    if (success) {
      toast.success(`Lab order submitted. Billing deferred to Lab.`);
      setShowLabModal(false);
      setLabTestNames([]);
    } else {
      toast.error(`Error ordering lab tests.`);
    }
  };

  const submitPrescription = () => {
    if (!activePatient || !rxName) return;
    const success = addPrescription(activePatient.patientId, rxName);
    if (success) {
      toast.success(`Prescription submitted. Billing deferred to Pharmacy.`);
      setShowRxModal(false);
      setRxName('');
    } else {
      toast.error(`Error writing prescription.`);
    }
  };

  const submitAdmission = () => {
    if (!activePatient) return;
    admitPatient(activePatient.patientId, admitWard, user?.email || 'Doctor');
    toast.success(`Patient admitted to ${admitWard}.`);
    setShowAdmitModal(false);
  };

  const submitFollowup = () => {
    if (!activePatient || !followupDate || !followupTime) return;
    const department = activePatient.department || 'General Practice';
    bookAppointment(activePatient.patientId, department, 'IN_PERSON', followupDate, followupTime, 'Follow-up Consultation');
    toast.success('Follow-up appointment scheduled successfully.');
    setShowFollowupModal(false);
    setFollowupDate('');
    setFollowupTime('');
  };

  const submitRadiology = () => {
    if (!activePatient || !scanName) return;
    addClinicalNote(activePatient.patientId, `RADIOLOGY ORDER: ${scanName}`, user?.email || 'Doctor');
    toast.success(`Radiology scan (${scanName}) ordered successfully.`);
    setShowRadiologyModal(false);
    setScanName('');
  };

  const submitSurgery = () => {
    if (!activePatient || !surgeryName) return;
    addClinicalNote(activePatient.patientId, `SURGERY SCHEDULED: ${surgeryName}`, user?.email || 'Doctor');
    toast.success(`Surgery (${surgeryName}) scheduled and flagged for pre-op.`);
    setShowSurgeryModal(false);
    setSurgeryName('');
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

  const activePatientFullData = activePatient ? patients[activePatient.patientId] : null;
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
          <div className="flex space-x-3 items-center">
            <button onClick={() => setShowHistoryModal(true)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 flex items-center transition-colors font-medium">
              <History className="h-4 w-4 mr-2" /> View History
            </button>
            <button onClick={() => setActivePatient(null)} className="text-sm text-slate-500 hover:text-slate-800">
              Back to Queue
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-2">Suspected Diagnosis</h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedDiagnoses.map(diag => (
                <span key={diag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  {diag} <X className="h-3 w-3 ml-1 cursor-pointer hover:text-blue-900" onClick={() => setSelectedDiagnoses(prev => prev.filter(d => d !== diag))} />
                </span>
              ))}
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search known illnesses..." 
                value={searchDiagnosis}
                onChange={e => setSearchDiagnosis(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none"
              />
              {searchDiagnosis && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {KNOWN_ILLNESSES.filter(ill => ill.toLowerCase().includes(searchDiagnosis.toLowerCase())).map(ill => (
                    <div 
                      key={ill} 
                      className="px-4 py-2 hover:bg-slate-50 cursor-pointer text-sm text-slate-700"
                      onClick={() => {
                        if (!selectedDiagnoses.includes(ill)) setSelectedDiagnoses([...selectedDiagnoses, ill]);
                        setSearchDiagnosis('');
                      }}
                    >
                      {ill}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

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
              <FlaskConical className="h-5 w-5 mr-3 text-purple-500" /> Order Lab Tests
            </button>
            <button onClick={() => setShowRxModal(true)} className="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-slate-700 font-medium">
              <Pill className="h-5 w-5 mr-3 text-teal-500" /> Write Prescription
            </button>
            <button onClick={() => setShowAdmitModal(true)} className="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-slate-700 font-medium">
              <Bed className="h-5 w-5 mr-3 text-blue-500" /> Admit Patient
            </button>
            <button onClick={() => setShowFollowupModal(true)} className="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-slate-700 font-medium">
              <Calendar className="h-5 w-5 mr-3 text-orange-500" /> Schedule Follow-up
            </button>
            <button onClick={() => setShowRadiologyModal(true)} className="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-slate-700 font-medium">
              <Scan className="h-5 w-5 mr-3 text-indigo-500" /> Order Radiology/Scan
            </button>
            <button onClick={() => setShowSurgeryModal(true)} className="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-slate-700 font-medium">
              <Scissors className="h-5 w-5 mr-3 text-pink-500" /> Schedule Surgery
            </button>
          </div>
        </div>
      </div>
      
      {showLabModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Order Lab Tests</h3>
            <div className="max-h-60 overflow-y-auto mb-4 border border-slate-200 rounded p-2">
              {NIGERIAN_LAB_TESTS.map(test => (
                <label key={test} className="flex items-center space-x-2 p-2 hover:bg-slate-50 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={labTestNames.includes(test)}
                    onChange={(e) => {
                      if (e.target.checked) setLabTestNames([...labTestNames, test]);
                      else setLabTestNames(labTestNames.filter(t => t !== test));
                    }}
                    className="rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span className="text-sm text-slate-700">{test}</span>
                </label>
              ))}
            </div>
            <button onClick={submitLabOrder} disabled={labTestNames.length === 0} className="w-full bg-brand-600 text-white p-2 rounded-lg hover:bg-brand-700 disabled:opacity-50">Submit Orders</button>
            <button onClick={() => setShowLabModal(false)} className="w-full mt-2 bg-slate-100 text-slate-700 p-2 rounded-lg hover:bg-slate-200">Cancel</button>
          </div>
        </div>
      )}

      {showAdmitModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Admit Patient</h3>
            <select 
              value={admitWard} 
              onChange={e => setAdmitWard(e.target.value)}
              className="w-full border border-slate-300 p-2 rounded mb-4 focus:ring-2 focus:ring-brand-500 outline-none" 
            >
              <option value="General Ward">General Ward</option>
              <option value="Maternity Ward">Maternity Ward</option>
              <option value="Pediatrics Ward">Pediatrics Ward</option>
              <option value="ICU">Intensive Care Unit (ICU)</option>
              <option value="VIP Suite">VIP Suite</option>
            </select>
            <button onClick={submitAdmission} className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700">Admit</button>
            <button onClick={() => setShowAdmitModal(false)} className="w-full mt-2 bg-slate-100 text-slate-700 p-2 rounded-lg hover:bg-slate-200">Cancel</button>
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
            <button onClick={submitPrescription} className="w-full bg-teal-600 text-white p-2 rounded-lg hover:bg-teal-700">Sign, Charge & Send</button>
            <button onClick={() => setShowRxModal(false)} className="w-full mt-2 bg-slate-100 text-slate-700 p-2 rounded-lg hover:bg-slate-200">Cancel</button>
          </div>
        </div>
      )}

      {showFollowupModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Schedule Follow-up</h3>
            <div className="space-y-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                <input 
                  type="date" 
                  value={followupDate} 
                  onChange={e => setFollowupDate(e.target.value)}
                  className="w-full border border-slate-300 p-2 rounded focus:ring-2 focus:ring-brand-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                <input 
                  type="time" 
                  value={followupTime} 
                  onChange={e => setFollowupTime(e.target.value)}
                  className="w-full border border-slate-300 p-2 rounded focus:ring-2 focus:ring-brand-500 outline-none" 
                />
              </div>
            </div>
            <button onClick={submitFollowup} disabled={!followupDate || !followupTime} className="w-full bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 disabled:opacity-50">Schedule</button>
            <button onClick={() => setShowFollowupModal(false)} className="w-full mt-2 bg-slate-100 text-slate-700 p-2 rounded-lg hover:bg-slate-200">Cancel</button>
          </div>
        </div>
      )}

      {showRadiologyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Order Radiology Scan</h3>
            <select 
              value={scanName} 
              onChange={e => setScanName(e.target.value)}
              className="w-full border border-slate-300 p-2 rounded mb-4 focus:ring-2 focus:ring-brand-500 outline-none" 
            >
              <option value="Chest X-Ray">Chest X-Ray</option>
              <option value="Abdominal Ultrasound">Abdominal Ultrasound</option>
              <option value="Pelvic Ultrasound">Pelvic Ultrasound</option>
              <option value="CT Scan (Brain)">CT Scan (Brain)</option>
              <option value="MRI (Spine)">MRI (Spine)</option>
              <option value="Mammogram">Mammogram</option>
            </select>
            <button onClick={submitRadiology} className="w-full bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700">Order Scan</button>
            <button onClick={() => setShowRadiologyModal(false)} className="w-full mt-2 bg-slate-100 text-slate-700 p-2 rounded-lg hover:bg-slate-200">Cancel</button>
          </div>
        </div>
      )}

      {showSurgeryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96">
            <h3 className="text-lg font-bold mb-4">Schedule Surgery</h3>
            <input 
              value={surgeryName} 
              onChange={e => setSurgeryName(e.target.value)}
              className="w-full border border-slate-300 p-2 rounded mb-4 focus:ring-2 focus:ring-brand-500 outline-none" 
              placeholder="e.g. Appendectomy, C-Section" 
            />
            <button onClick={submitSurgery} className="w-full bg-pink-600 text-white p-2 rounded-lg hover:bg-pink-700">Schedule & Notify Theater</button>
            <button onClick={() => setShowSurgeryModal(false)} className="w-full mt-2 bg-slate-100 text-slate-700 p-2 rounded-lg hover:bg-slate-200">Cancel</button>
          </div>
        </div>
      )}

      {showHistoryModal && activePatientFullData && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-slate-800">Medical History: {activePatientFullData.name}</h3>
                <p className="text-slate-500">ID: {activePatientFullData.id} • Total Expenditure: ₦{activePatientFullData.walletHistory.filter(h => h.type === 'DEBIT').reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()}</p>
              </div>
              <button onClick={() => setShowHistoryModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 space-y-6 bg-slate-50">
              {activePatientFullData.medicalHistory.length === 0 ? (
                <div className="text-center text-slate-500 py-12">No previous medical history found on record.</div>
              ) : (
                activePatientFullData.medicalHistory.map((record) => (
                  <div key={record.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-3 border-b border-slate-100 pb-2">
                      <span className="font-semibold text-brand-700 flex items-center">
                        {record.type === 'VITALS' && <Activity className="h-4 w-4 mr-2" />}
                        {record.type === 'NOTE' && <Stethoscope className="h-4 w-4 mr-2" />}
                        {record.type === 'LAB' && <FlaskConical className="h-4 w-4 mr-2" />}
                        {record.type === 'PRESCRIPTION' && <Pill className="h-4 w-4 mr-2" />}
                        {record.type}
                      </span>
                      <span className="text-sm text-slate-500">{new Date(record.date).toLocaleString()}</span>
                    </div>
                    <div className="text-slate-700 whitespace-pre-wrap text-sm">{record.details}</div>
                    <div className="mt-3 text-xs text-slate-400 flex items-center">
                      <UserIcon className="h-3 w-3 mr-1" /> Attended by: <span className="font-medium ml-1">{record.provider}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
