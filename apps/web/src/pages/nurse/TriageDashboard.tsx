import { useState } from 'react';
import { Activity, Users, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function TriageDashboard() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Alice Walker', age: 45, status: 'WAITING', priority: 'NORMAL', time: '10 mins' },
    { id: 2, name: 'Bob Smith', age: 62, status: 'WAITING', priority: 'URGENT', time: '5 mins' },
    { id: 3, name: 'Charlie Davis', age: 28, status: 'TRIAGED', priority: 'NORMAL', time: 'Completed' },
  ]);

  const [activePatient, setActivePatient] = useState<any>(null);

  const handleTriageComplete = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Vitals recorded for ${activePatient.name}`);
    setPatients(patients.map(p => p.id === activePatient.id ? { ...p, status: 'TRIAGED', time: 'Completed' } : p));
    setActivePatient(null);
  };

  return (
    <div className="flex h-full space-x-6">
      <div className="w-1/2 flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <Activity className="h-6 w-6 mr-2 text-brand-600" /> Triage Queue
          </h2>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="divide-y divide-slate-200">
            {patients.map((patient) => (
              <div 
                key={patient.id} 
                className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${activePatient?.id === patient.id ? 'bg-brand-50' : 'hover:bg-slate-50'}`}
                onClick={() => patient.status === 'WAITING' && setActivePatient(patient)}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center mr-4">
                    <Users className="h-5 w-5 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">{patient.name}</h4>
                    <p className="text-xs text-slate-500">Age: {patient.age} • Waiting: {patient.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  {patient.priority === 'URGENT' ? (
                    <span className="flex items-center text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-md">
                      <AlertCircle className="h-3 w-3 mr-1" /> Urgent
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      Normal
                    </span>
                  )}
                  {patient.status === 'TRIAGED' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-1/2 flex flex-col">
        {activePatient ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-4">
              Record Vitals: {activePatient.name}
            </h3>
            <form onSubmit={handleTriageComplete} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Blood Pressure (mmHg)</label>
                  <input type="text" placeholder="120/80" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-2 border" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Heart Rate (bpm)</label>
                  <input type="number" placeholder="72" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-2 border" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Temperature (°C)</label>
                  <input type="number" step="0.1" placeholder="37.0" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-2 border" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">SpO2 (%)</label>
                  <input type="number" placeholder="98" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-2 border" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700">Weight (kg)</label>
                  <input type="number" placeholder="70" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-2 border" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Nursing Notes (Optional)</label>
                <textarea rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-2 border resize-none" placeholder="Add any relevant observations here..."></textarea>
              </div>
              <div className="flex justify-end pt-4">
                <button type="submit" className="px-6 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 font-medium transition-colors shadow-sm">
                  Save Vitals & Complete
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
            <Activity className="h-12 w-12 text-slate-300 mb-4" />
            <p className="text-slate-500 font-medium text-lg">Select a patient to record vitals</p>
          </div>
        )}
      </div>
    </div>
  );
}
