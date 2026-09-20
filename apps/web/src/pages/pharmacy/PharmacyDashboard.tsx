import { useState } from 'react';
import { Pill, Search, Package, Check, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function PharmacyDashboard() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 'RX-101', patient: 'Sarah Connor', items: ['Amoxicillin 500mg (14)', 'Ibuprofen 400mg (20)'], status: 'PENDING', doctor: 'Dr. Smith' },
    { id: 'RX-102', patient: 'Tony Stark', items: ['Lisinopril 10mg (30)'], status: 'READY', doctor: 'Dr. Strange' },
    { id: 'RX-103', patient: 'Bruce Wayne', items: ['Atorvastatin 20mg (30)'], status: 'DISPENSED', doctor: 'Dr. Kyle' },
  ]);

  const [inventory] = useState([
    { name: 'Amoxicillin 500mg', stock: 150, threshold: 50 },
    { name: 'Ibuprofen 400mg', stock: 1200, threshold: 200 },
    { name: 'Lisinopril 10mg', stock: 35, threshold: 100 }, // Low stock
    { name: 'Atorvastatin 20mg', stock: 500, threshold: 100 },
  ]);

  const handleDispense = (id: string) => {
    setPrescriptions(prescriptions.map(p => p.id === id ? { ...p, status: 'DISPENSED' } : p));
    toast.success(`Prescription ${id} marked as dispensed.`);
  };

  const handlePrepare = (id: string) => {
    setPrescriptions(prescriptions.map(p => p.id === id ? { ...p, status: 'READY' } : p));
    toast.success(`Prescription ${id} is ready for pickup.`);
  };

  return (
    <div className="flex h-full space-x-6">
      {/* Active Prescriptions Panel */}
      <div className="flex-1 flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <Pill className="h-6 w-6 mr-2 text-teal-600" /> Prescriptions Queue
          </h2>
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search RX ID or Patient..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-1 overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-1 p-2">
            <div className="space-y-4">
              {prescriptions.map((rx) => (
                <div key={rx.id} className="bg-white border border-slate-100 shadow-sm p-5 rounded-xl hover:border-teal-200 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-slate-800 text-lg">{rx.patient}</h3>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{rx.id}</span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">Prescribed by {rx.doctor}</p>
                    </div>
                    <div>
                      {rx.status === 'PENDING' && <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold uppercase tracking-wide">Needs Prep</span>}
                      {rx.status === 'READY' && <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold uppercase tracking-wide">Ready for Pickup</span>}
                      {rx.status === 'DISPENSED' && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold uppercase tracking-wide">Dispensed</span>}
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                    <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Medications</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {rx.items.map((item, i) => (
                        <li key={i} className="text-sm font-medium text-slate-800">{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 flex justify-end space-x-3">
                    {rx.status === 'PENDING' && (
                      <button 
                        onClick={() => handlePrepare(rx.id)}
                        className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium rounded-lg transition-colors text-sm"
                      >
                        Mark as Ready
                      </button>
                    )}
                    {rx.status !== 'DISPENSED' && (
                      <button 
                        onClick={() => handleDispense(rx.id)}
                        className="px-4 py-2 bg-teal-600 text-white hover:bg-teal-700 font-medium rounded-lg transition-colors flex items-center text-sm shadow-sm"
                      >
                        <Check className="h-4 w-4 mr-1" /> Dispense
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Alerts Sidebar */}
      <div className="w-80 flex flex-col space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex-1">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center mb-6">
            <Package className="h-5 w-5 mr-2 text-brand-600" /> Inventory Status
          </h3>
          <div className="space-y-4">
            {inventory.map((item, i) => {
              const isLow = item.stock <= item.threshold;
              return (
                <div key={i} className={`p-4 rounded-lg border ${isLow ? 'bg-red-50 border-red-100' : 'bg-slate-50 border-slate-100'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`font-medium text-sm ${isLow ? 'text-red-900' : 'text-slate-800'}`}>{item.name}</h4>
                    {isLow && <AlertTriangle className="h-4 w-4 text-red-500" />}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-slate-500">Current Stock</p>
                      <p className={`text-lg font-bold ${isLow ? 'text-red-700' : 'text-slate-900'}`}>{item.stock}</p>
                    </div>
                    {isLow && (
                      <button className="text-xs font-semibold text-red-700 hover:text-red-800 bg-red-100 px-2 py-1 rounded">
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
