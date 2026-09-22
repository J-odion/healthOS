import { useState } from 'react';
import { Activity, Stethoscope, FlaskConical, Pill, Save, CheckCircle, User, Brain, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import InteractiveBodyMap from '../../components/clinical/InteractiveBodyMap';

export default function ConsultationRoom() {
  const [note, setNote] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [bodyMapActive, setBodyMapActive] = useState(false);

  const patient = {
    name: 'Emily Chen',
    age: 32,
    gender: 'Female',
    id: 'PT-9942',
    chiefComplaint: 'Persistent headache and mild fever for 3 days',
    vitals: { bp: '118/75', hr: '84', temp: '38.1', spo2: '99' }
  };

  const handleFinish = () => {
    toast.success('Consultation completed and saved to EMR.');
    setNote('');
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
              <User className="h-8 w-8 text-brand-600" />
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
            <button className="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-slate-700 font-medium">
              <FlaskConical className="h-5 w-5 mr-3 text-purple-500" /> Order Lab Test
            </button>
            <button className="w-full flex items-center p-3 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-brand-300 transition-all text-slate-700 font-medium">
              <Pill className="h-5 w-5 mr-3 text-teal-500" /> Write Prescription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
