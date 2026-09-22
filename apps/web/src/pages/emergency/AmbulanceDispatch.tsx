import { useState } from 'react';
import { Ambulance, MapPin, AlertOctagon, PhoneCall, Radio, Siren, Navigation } from 'lucide-react';

export default function AmbulanceDispatch() {
  const [activeTab, setActiveTab] = useState<'DISPATCH' | 'MAP'>('DISPATCH');

  const ambulances = [
    { id: 'AMB-01', type: 'Advanced Life Support (ALS)', status: 'EN_ROUTE', location: 'Lekki Phase 1', ETA: '8 mins', assignedTo: 'ERT-Alpha' },
    { id: 'AMB-02', type: 'Basic Life Support (BLS)', status: 'AVAILABLE', location: 'Hospital Base', ETA: '-', assignedTo: '-' },
    { id: 'AMB-03', type: 'Advanced Life Support (ALS)', status: 'ON_SCENE', location: 'Victoria Island', ETA: '-', assignedTo: 'ERT-Beta' },
    { id: 'AMB-04', type: 'Basic Life Support (BLS)', status: 'MAINTENANCE', location: 'Service Center', ETA: '-', assignedTo: '-' },
  ];

  const emergencyCalls = [
    { id: 'EMG-9921', caller: 'Traffic Police', type: 'RTA (Road Traffic Accident)', priority: 'CRITICAL', location: 'Lekki-Epe Expressway, Km 14', time: '2 mins ago' },
    { id: 'EMG-9922', caller: 'Residential', type: 'Cardiac Arrest', priority: 'HIGH', location: 'Ikoyi, Bourdillon Rd', time: '15 mins ago' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2 h-[calc(100vh-80px)] flex flex-col">
      <div className="flex justify-between items-center flex-shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <Ambulance className="h-6 w-6 mr-2 text-brand-600" /> Emergency Dispatch Center
          </h2>
          <p className="text-sm text-slate-500 mt-1">Real-time ambulance tracking and emergency triage.</p>
        </div>
        <div className="flex space-x-3">
           <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm flex items-center text-sm font-medium animate-pulse">
            <Siren className="h-4 w-4 mr-2" /> Dispatch New Unit
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Left Panel: Active Emergencies */}
        <div className="w-1/3 flex flex-col space-y-6 overflow-hidden">
          <div className="bg-red-50 rounded-xl shadow-sm border border-red-200 p-5 flex-shrink-0">
            <h3 className="font-bold text-red-800 flex items-center mb-4">
              <PhoneCall className="h-5 w-5 mr-2" /> Active Emergency Calls
            </h3>
            <div className="space-y-3">
              {emergencyCalls.map(call => (
                <div key={call.id} className="bg-white p-4 rounded-lg border border-red-100 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="px-2 py-0.5 bg-red-100 text-red-800 text-[10px] font-bold tracking-wider rounded uppercase">
                      {call.priority}
                    </span>
                    <span className="text-xs font-mono text-slate-400">{call.id}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{call.type}</h4>
                  <div className="space-y-1 mt-2">
                    <p className="text-xs text-slate-600 flex items-center">
                      <MapPin className="h-3 w-3 mr-1 text-slate-400" /> {call.location}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center">
                      <AlertOctagon className="h-3 w-3 mr-1 text-slate-400" /> Caller: {call.caller}
                    </p>
                  </div>
                  <button className="mt-3 w-full py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 rounded text-xs font-semibold transition-colors">
                    Assign Unit
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-5 flex-1 flex flex-col text-slate-300">
             <h3 className="font-bold text-white flex items-center mb-4">
              <Radio className="h-5 w-5 mr-2 text-emerald-400" /> Dispatch Radio Log
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 font-mono text-xs pr-2">
              <p><span className="text-blue-400">[14:02:11]</span> BASE: AMB-01, proceed to Lekki Phase 1.</p>
              <p><span className="text-emerald-400">[14:02:15]</span> AMB-01: Copy BASE, en route.</p>
              <p><span className="text-blue-400">[14:15:00]</span> BASE: AMB-03, status update?</p>
              <p><span className="text-emerald-400">[14:15:05]</span> AMB-03: On scene. Patient stabilized. Preparing for transport.</p>
              <p><span className="text-blue-400">[14:16:22]</span> BASE: Copy AMB-03. ER alerted.</p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-700">
              <input type="text" className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-xs text-white outline-none focus:border-brand-500" placeholder="Type message to all units..." />
            </div>
          </div>
        </div>

        {/* Right Panel: Fleet Status & Map */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div className="border-b border-slate-200 flex justify-between items-center bg-slate-50 px-4">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('DISPATCH')}
                className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'DISPATCH' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Fleet Status
              </button>
              <button
                onClick={() => setActiveTab('MAP')}
                className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'MAP' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                Live Map
              </button>
            </nav>
          </div>

          <div className="flex-1 overflow-auto bg-slate-50 p-6">
            {activeTab === 'DISPATCH' ? (
              <div className="grid gap-4">
                {ambulances.map(amb => (
                  <div key={amb.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={`p-3 rounded-lg mr-4 ${
                        amb.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-600' :
                        amb.status === 'EN_ROUTE' ? 'bg-blue-50 text-blue-600' :
                        amb.status === 'ON_SCENE' ? 'bg-purple-50 text-purple-600' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <Ambulance className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800">{amb.id} <span className="font-normal text-slate-500 text-sm ml-2">{amb.type}</span></h4>
                        <div className="flex items-center mt-1 text-sm text-slate-600">
                          <Navigation className="h-3 w-3 mr-1" /> {amb.location}
                          {amb.ETA !== '-' && <span className="ml-3 font-semibold text-blue-600">ETA: {amb.ETA}</span>}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-xs text-slate-500 mb-1">Team</p>
                        <p className="text-sm font-medium text-slate-800">{amb.assignedTo}</p>
                      </div>
                      <div className="w-px h-8 bg-slate-200"></div>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${
                        amb.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                        amb.status === 'EN_ROUTE' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                        amb.status === 'ON_SCENE' ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-slate-100 text-slate-800 border-slate-200'
                      }`}>
                        {amb.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full bg-slate-200 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center relative overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                
                {/* Mock Hospital Base */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                   <div className="h-8 w-8 bg-brand-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg ring-4 ring-brand-200 z-10">H</div>
                   <span className="mt-2 text-xs font-bold text-slate-700 bg-white px-2 py-0.5 rounded shadow-sm">BASE</span>
                </div>

                {/* Mock Ambulance 1 */}
                <div className="absolute top-1/4 right-1/3 flex flex-col items-center animate-pulse">
                   <div className="h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg ring-4 ring-blue-200 z-10">
                     <Ambulance className="h-3 w-3" />
                   </div>
                   <span className="mt-1 text-[10px] font-bold text-blue-700 bg-white px-1.5 py-0.5 rounded shadow-sm border border-blue-200">AMB-01</span>
                </div>

                {/* Mock Incident */}
                <div className="absolute top-1/4 right-1/4 flex flex-col items-center">
                   <div className="h-6 w-6 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg ring-4 ring-red-200 z-10">
                     <AlertOctagon className="h-3 w-3" />
                   </div>
                   <span className="mt-1 text-[10px] font-bold text-red-700 bg-white px-1.5 py-0.5 rounded shadow-sm border border-red-200">RTA</span>
                </div>

                 {/* Mock Ambulance 3 */}
                 <div className="absolute bottom-1/4 left-1/4 flex flex-col items-center">
                   <div className="h-6 w-6 bg-purple-500 rounded-full flex items-center justify-center text-white shadow-lg ring-4 ring-purple-200 z-10">
                     <Ambulance className="h-3 w-3" />
                   </div>
                   <span className="mt-1 text-[10px] font-bold text-purple-700 bg-white px-1.5 py-0.5 rounded shadow-sm border border-purple-200">AMB-03</span>
                </div>

                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow border border-slate-200 text-xs text-slate-600">
                  <p className="flex items-center mb-1"><span className="w-3 h-3 bg-brand-600 rounded-full mr-2"></span> Hospital Base</p>
                  <p className="flex items-center mb-1"><span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span> En Route</p>
                  <p className="flex items-center"><span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span> Emergency</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
