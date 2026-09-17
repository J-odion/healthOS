import { Activity, Stethoscope, FlaskConical, Pill, Save, CheckCircle } from 'lucide-react';

export default function ConsultationRoom() {
  return (
    <div className="flex h-full space-x-6">
      {/* Main EMR Area */}
      <div className="flex-1 flex flex-col space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center">
              <Stethoscope className="mr-2 text-brand-600 h-5 w-5" /> Clinical Note
            </h2>
            <button className="text-sm px-3 py-1 bg-brand-50 text-brand-700 rounded-md hover:bg-brand-100 transition-colors flex items-center">
              <Save className="h-4 w-4 mr-1" /> Save Draft
            </button>
          </div>
          <textarea 
            className="w-full h-64 p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none"
            placeholder="Document patient history, symptoms, and examination findings here..."
          />
        </div>

        <div className="flex justify-end">
          <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl shadow-sm hover:bg-green-700 transition-colors flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" /> Finish Consultation
          </button>
        </div>
      </div>

      {/* Sidebar Panels (Vitals, Orders) */}
      <div className="w-80 flex flex-col space-y-6">
        {/* Vitals */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-800 flex items-center mb-4">
            <Activity className="mr-2 text-red-500 h-5 w-5" /> Recent Vitals
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">BP</span>
              <span className="font-medium">120/80 mmHg</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Pulse</span>
              <span className="font-medium text-red-600">92 bpm</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Temp</span>
              <span className="font-medium">37.2 °C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">SpO2</span>
              <span className="font-medium">98%</span>
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
