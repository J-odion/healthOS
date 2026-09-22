import { useState } from 'react';
import { UtensilsCrossed, Apple, AlertCircle, CheckCircle, Clock } from 'lucide-react';

export default function DietaryManagement() {
  const [activeTab, setActiveTab] = useState<'ORDERS' | 'SUMMARY'>('ORDERS');

  const orders = [
    { id: 'MEAL-101', patient: 'Alice Johnson', ward: 'Ward A - Bed 01', diet: 'Diabetic (Low Sugar)', meal: 'Lunch', status: 'PREPARING' },
    { id: 'MEAL-102', patient: 'David Lee', ward: 'Ward B - Bed 05', diet: 'Low Sodium', meal: 'Lunch', status: 'DELIVERED' },
    { id: 'MEAL-103', patient: 'Emily Chen', ward: 'Ward A - Bed 04', diet: 'Regular', meal: 'Lunch', status: 'PENDING' },
    { id: 'MEAL-104', patient: 'John Doe', ward: 'ICU - Bed 02', diet: 'Clear Liquid', meal: 'Lunch', status: 'PREPARING', allergy: 'Peanuts' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <UtensilsCrossed className="h-6 w-6 mr-2 text-brand-600" /> Kitchen & Dietary Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage inpatient meal orders and dietary restrictions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
           <Apple className="h-8 w-8 text-emerald-500 mb-2" />
           <p className="text-sm font-medium text-slate-500">Total Meals (Lunch)</p>
           <p className="text-3xl font-bold text-slate-800">45</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
           <Clock className="h-8 w-8 text-orange-500 mb-2" />
           <p className="text-sm font-medium text-slate-500">Preparing</p>
           <p className="text-3xl font-bold text-slate-800">12</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
           <CheckCircle className="h-8 w-8 text-blue-500 mb-2" />
           <p className="text-sm font-medium text-slate-500">Delivered</p>
           <p className="text-3xl font-bold text-slate-800">28</p>
        </div>
        <div className="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm flex flex-col justify-center items-center text-center">
           <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
           <p className="text-sm font-medium text-red-600">Special/Allergy</p>
           <p className="text-3xl font-bold text-red-800">8</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 flex justify-between items-center bg-slate-50 px-4">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('ORDERS')}
              className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'ORDERS' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Active Meal Orders
            </button>
            <button
              onClick={() => setActiveTab('SUMMARY')}
              className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'SUMMARY' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Dietary Summary
            </button>
          </nav>
        </div>

        <div className="p-0">
          {activeTab === 'ORDERS' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                    <th className="py-3 px-6 font-medium">Order ID</th>
                    <th className="py-3 px-6 font-medium">Patient / Ward</th>
                    <th className="py-3 px-6 font-medium">Dietary Plan</th>
                    <th className="py-3 px-6 font-medium">Status</th>
                    <th className="py-3 px-6 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-700 text-sm whitespace-nowrap">
                        {order.id}
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-semibold text-slate-800 text-sm">{order.patient}</p>
                        <p className="text-xs text-slate-500">{order.ward}</p>
                      </td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-slate-800 text-sm">{order.diet}</p>
                        {order.allergy && (
                          <span className="inline-flex items-center mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                            ALLERGY: {order.allergy.toUpperCase()}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${
                          order.status === 'PREPARING' ? 'bg-orange-100 text-orange-800 border-orange-200' :
                          order.status === 'DELIVERED' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                          'bg-slate-100 text-slate-800 border-slate-200'
                        }`}>
                           {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {order.status !== 'DELIVERED' && (
                           <button className="px-3 py-1.5 bg-slate-900 text-white text-xs font-medium rounded hover:bg-slate-800">
                             Mark {order.status === 'PENDING' ? 'Preparing' : 'Delivered'}
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
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-slate-200 p-4 rounded-lg flex justify-between items-center bg-slate-50">
                     <span className="font-semibold text-slate-700">Regular</span>
                     <span className="text-xl font-bold text-slate-900">22</span>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-lg flex justify-between items-center bg-slate-50">
                     <span className="font-semibold text-slate-700">Diabetic</span>
                     <span className="text-xl font-bold text-slate-900">8</span>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-lg flex justify-between items-center bg-slate-50">
                     <span className="font-semibold text-slate-700">Low Sodium</span>
                     <span className="text-xl font-bold text-slate-900">5</span>
                  </div>
                  <div className="border border-slate-200 p-4 rounded-lg flex justify-between items-center bg-slate-50">
                     <span className="font-semibold text-slate-700">Clear Liquid</span>
                     <span className="text-xl font-bold text-slate-900">10</span>
                  </div>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
