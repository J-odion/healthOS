import { useState } from 'react';
import { Eye, Ear, UserCheck, Activity, Search, Phone } from 'lucide-react';
import SurgerySchedule from './SurgerySchedule';

export default function SpecializedClinics() {
  const [activeTab, setActiveTab] = useState<'ophthalmology' | 'ent' | 'dental' | 'surgery'>('ophthalmology');

  const renderContent = () => {
    switch (activeTab) {
      case 'ophthalmology':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center"><Eye className="mr-2 text-brand-600"/> Vision Assessment Tools</h3>
              <p className="text-sm text-slate-500 mb-4">Integrates with autorefractors and visual field analyzers.</p>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-slate-50 border border-slate-100 hover:border-brand-300 rounded-lg">Log Visual Acuity</button>
                <button className="w-full text-left p-3 bg-slate-50 border border-slate-100 hover:border-brand-300 rounded-lg">Intraocular Pressure (IOP)</button>
                <button className="w-full text-left p-3 bg-slate-50 border border-slate-100 hover:border-brand-300 rounded-lg">Retinal Scan Imaging</button>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Patient Queue</h3>
              <div className="space-y-3">
                <div className="p-3 border border-slate-100 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-800">Michael Smith</p>
                    <p className="text-xs text-slate-500">Cataract Evaluation</p>
                  </div>
                  <button className="text-brand-600 text-sm font-medium">Start Session</button>
                </div>
              </div>
            </div>
          </div>
        );
      case 'ent':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center"><Ear className="mr-2 text-brand-600"/> ENT Diagnostic Tools</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-slate-50 border border-slate-100 hover:border-brand-300 rounded-lg">Audiometry Results</button>
                <button className="w-full text-left p-3 bg-slate-50 border border-slate-100 hover:border-brand-300 rounded-lg">Endoscopy Video Capture</button>
              </div>
            </div>
          </div>
        );
      case 'dental':
        return (
          <div className="grid grid-cols-1 gap-6 mt-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center">Dental Charting</h3>
              <div className="flex justify-center p-10 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
                <p className="text-slate-500">Interactive Odontogram goes here</p>
              </div>
            </div>
          </div>
        );
      case 'surgery':
        return <div className="mt-6"><SurgerySchedule /></div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Specialized Clinics</h2>
      </div>

      <div className="bg-white border-b border-slate-200">
        <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('ophthalmology')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'ophthalmology' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
          >
            Ophthalmology
          </button>
          <button
            onClick={() => setActiveTab('ent')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'ent' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
          >
            ENT
          </button>
          <button
            onClick={() => setActiveTab('dental')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'dental' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
          >
            Dental Care
          </button>
          <button
            onClick={() => setActiveTab('surgery')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'surgery' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}
          >
            Surgery (Theatres)
          </button>
        </nav>
      </div>

      {renderContent()}
    </div>
  );
}
