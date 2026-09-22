import { useState } from 'react';
import { Droplet, AlertTriangle, ArrowRightLeft, Clock } from 'lucide-react';

export default function BloodBank() {
  const [activeTab, setActiveTab] = useState<'INVENTORY' | 'REQUESTS'>('INVENTORY');

  const inventory = [
    { group: 'O+', units: 45, status: 'SUFFICIENT' },
    { group: 'O-', units: 5, status: 'CRITICAL' },
    { group: 'A+', units: 28, status: 'SUFFICIENT' },
    { group: 'A-', units: 8, status: 'LOW' },
    { group: 'B+', units: 15, status: 'LOW' },
    { group: 'B-', units: 4, status: 'CRITICAL' },
    { group: 'AB+', units: 12, status: 'SUFFICIENT' },
    { group: 'AB-', units: 2, status: 'CRITICAL' },
  ];

  const requests = [
    { id: 'REQ-882', patient: 'Alice Johnson', ward: 'OR-2', group: 'O+', units: 2, urgency: 'EMERGENCY', status: 'PENDING' },
    { id: 'REQ-883', patient: 'David Lee', ward: 'OR-1', group: 'A+', units: 1, urgency: 'ROUTINE', status: 'CROSS_MATCHING' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <Droplet className="h-6 w-6 mr-2 text-red-600 fill-red-600" /> Blood Bank Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">Monitor blood inventory levels and manage cross-matching requests.</p>
        </div>
        <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-sm flex items-center text-sm font-medium">
          <Droplet className="h-4 w-4 mr-2" /> Log Blood Donation
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 flex justify-between items-center bg-slate-50 px-4">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('INVENTORY')}
              className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'INVENTORY' ? 'border-red-500 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Live Inventory
            </button>
            <button
              onClick={() => setActiveTab('REQUESTS')}
              className={`py-4 px-4 text-center border-b-2 font-medium text-sm flex items-center ${
                activeTab === 'REQUESTS' ? 'border-red-500 text-red-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Cross-Match Requests <span className="ml-2 bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-bold">2</span>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'INVENTORY' ? (
            <div>
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {inventory.map((item) => (
                   <div key={item.group} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                     {item.status === 'CRITICAL' && <div className="absolute top-0 left-0 w-full h-1 bg-red-500 animate-pulse" />}
                     {item.status === 'LOW' && <div className="absolute top-0 left-0 w-full h-1 bg-orange-400" />}
                     {item.status === 'SUFFICIENT' && <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />}
                     
                     <Droplet className={`h-10 w-10 mb-2 ${item.status === 'CRITICAL' ? 'text-red-500 fill-red-100' : 'text-slate-300'}`} />
                     <h3 className="text-2xl font-black text-slate-800">{item.group}</h3>
                     <p className="text-sm font-medium text-slate-500 mt-1">{item.units} Units</p>
                     
                     <span className={`mt-3 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${
                        item.status === 'CRITICAL' ? 'bg-red-100 text-red-800' :
                        item.status === 'LOW' ? 'bg-orange-100 text-orange-800' : 'bg-emerald-100 text-emerald-800'
                     }`}>
                       {item.status}
                     </span>
                   </div>
                 ))}
               </div>

               <div className="mt-8 bg-orange-50 border border-orange-200 p-4 rounded-lg flex items-start">
                 <AlertTriangle className="h-5 w-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                 <div>
                   <h4 className="font-semibold text-orange-800">Critical Shortages Detected</h4>
                   <p className="text-sm text-orange-900 mt-1">O- and B- inventory is below critical threshold (5 units). Automated blood drive alerts have been broadcasted to registered donors.</p>
                 </div>
               </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                    <th className="py-3 px-4 font-medium">Req ID</th>
                    <th className="py-3 px-4 font-medium">Patient / Ward</th>
                    <th className="py-3 px-4 font-medium">Blood Group</th>
                    <th className="py-3 px-4 font-medium">Units</th>
                    <th className="py-3 px-4 font-medium">Urgency</th>
                    <th className="py-3 px-4 font-medium">Status</th>
                    <th className="py-3 px-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 text-sm font-mono text-slate-500">{req.id}</td>
                      <td className="py-3 px-4">
                        <p className="font-semibold text-slate-800 text-sm">{req.patient}</p>
                        <p className="text-xs text-slate-500">{req.ward}</p>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-lg font-bold text-red-600">{req.group}</span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-700">{req.units}</td>
                      <td className="py-3 px-4">
                         <span className={`px-2 py-1 rounded text-xs font-bold ${
                           req.urgency === 'EMERGENCY' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                         }`}>
                           {req.urgency}
                         </span>
                      </td>
                      <td className="py-3 px-4">
                         {req.status === 'PENDING' && <span className="flex items-center text-orange-600 text-xs font-bold"><Clock className="h-3 w-3 mr-1" /> PENDING</span>}
                         {req.status === 'CROSS_MATCHING' && <span className="flex items-center text-blue-600 text-xs font-bold"><ArrowRightLeft className="h-3 w-3 mr-1" /> CROSS-MATCHING</span>}
                      </td>
                      <td className="py-3 px-4">
                        <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800">
                          Process
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
