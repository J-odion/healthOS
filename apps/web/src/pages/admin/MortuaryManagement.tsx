import { useState } from 'react';
import { Snowflake, FileText, Search, UserMinus, FileClock, CheckCircle } from 'lucide-react';

export default function MortuaryManagement() {
  const [activeTab, setActiveTab] = useState<'REGISTER' | 'CAPACITY'>('REGISTER');

  const records = [
    { id: 'MT-0201', name: 'Robert Jenkins', dod: 'Oct 20, 2026', bodyLoc: 'Chamber A-1', status: 'AWAITING_AUTOPSY', nextOfKin: 'Sarah Jenkins (Wife)' },
    { id: 'MT-0202', name: 'Jane Doe', dod: 'Oct 21, 2026', bodyLoc: 'Chamber A-2', status: 'READY_FOR_RELEASE', nextOfKin: 'John Doe (Brother)' },
    { id: 'MT-0199', name: 'Michael Smith', dod: 'Oct 18, 2026', bodyLoc: '-', status: 'RELEASED', nextOfKin: 'Martha Smith (Mother)' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <Snowflake className="h-6 w-6 mr-2 text-slate-600" /> Mortuary & Pathology Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage deceased records, cold room capacity, and release documentation.</p>
        </div>
        <button className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-900 shadow-sm flex items-center text-sm font-medium">
          <UserMinus className="h-4 w-4 mr-2" /> Log New Record
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mr-4">
             <Snowflake className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Chambers Occupied</p>
            <p className="text-2xl font-bold text-slate-800">2 <span className="text-sm font-normal text-slate-500">/ 12</span></p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg mr-4">
             <FileClock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Pending Autopsies</p>
            <p className="text-2xl font-bold text-slate-800">1</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg mr-4">
             <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Ready for Release</p>
            <p className="text-2xl font-bold text-slate-800">1</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 flex justify-between items-center bg-slate-50 px-4">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('REGISTER')}
              className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'REGISTER' ? 'border-slate-800 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Mortuary Register
            </button>
            <button
              onClick={() => setActiveTab('CAPACITY')}
              className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'CAPACITY' ? 'border-slate-800 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Cold Room Status
            </button>
          </nav>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
             <input type="text" placeholder="Search records..." className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-md text-sm w-64 focus:ring-2 focus:ring-slate-500 outline-none" />
          </div>
        </div>

        <div className="p-0">
          {activeTab === 'REGISTER' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                    <th className="py-3 px-6 font-medium">Record ID</th>
                    <th className="py-3 px-6 font-medium">Deceased Name</th>
                    <th className="py-3 px-6 font-medium">Date of Death</th>
                    <th className="py-3 px-6 font-medium">Location</th>
                    <th className="py-3 px-6 font-medium">Next of Kin</th>
                    <th className="py-3 px-6 font-medium">Status</th>
                    <th className="py-3 px-6 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-500 text-sm font-mono whitespace-nowrap">
                        {record.id}
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-semibold text-slate-800 text-sm">{record.name}</p>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        {record.dod}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                        {record.bodyLoc}
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">
                        {record.nextOfKin}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                          record.status === 'AWAITING_AUTOPSY' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                          record.status === 'READY_FOR_RELEASE' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                           {record.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                         {record.status !== 'RELEASED' && (
                           <button className="text-slate-600 hover:text-slate-900 text-sm font-medium flex items-center">
                              <FileText className="h-4 w-4 mr-1" /> Forms
                           </button>
                         )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-6">
               <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const occupied = i === 0 || i === 1;
                    return (
                      <div key={i} className={`border p-4 rounded-xl flex flex-col items-center justify-center h-32 ${occupied ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200 border-dashed'}`}>
                         <Snowflake className={`h-8 w-8 mb-2 ${occupied ? 'text-blue-500' : 'text-slate-300'}`} />
                         <span className="font-mono text-xs font-bold text-slate-500">CHAMBER A-{i+1}</span>
                         <span className={`text-[10px] font-bold mt-1 ${occupied ? 'text-blue-700' : 'text-slate-400'}`}>
                           {occupied ? 'OCCUPIED' : 'AVAILABLE'}
                         </span>
                      </div>
                    )
                  })}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
