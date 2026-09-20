import { useState } from 'react';
import { FlaskConical, Clock, CheckCircle, Search, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function LabDashboard() {
  const [orders, setOrders] = useState([
    { id: 'LAB-001', patient: 'John Doe', test: 'Complete Blood Count (CBC)', status: 'PENDING', time: '10:30 AM', priority: 'NORMAL' },
    { id: 'LAB-002', patient: 'Jane Smith', test: 'Malaria Parasite', status: 'PROCESSING', time: '11:15 AM', priority: 'URGENT' },
    { id: 'LAB-003', patient: 'Michael Johnson', test: 'Lipid Profile', status: 'COMPLETED', time: '09:00 AM', priority: 'NORMAL' },
  ]);

  const [activeOrder, setActiveOrder] = useState<any>(null);

  const handleUploadResults = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Results uploaded for ${activeOrder.test}`);
    setOrders(orders.map(o => o.id === activeOrder.id ? { ...o, status: 'COMPLETED' } : o));
    setActiveOrder(null);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'PENDING': return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Pending Sample</span>;
      case 'PROCESSING': return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Processing</span>;
      case 'COMPLETED': return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Completed</span>;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
          <FlaskConical className="h-6 w-6 mr-2 text-purple-600" /> Laboratory Orders
        </h2>
        <div className="relative">
          <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none w-64"
          />
        </div>
      </div>

      <div className="flex space-x-6 flex-1 min-h-0">
        <div className="w-2/3 flex flex-col bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-auto flex-1">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Test Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{order.patient}</div>
                      <div className="text-xs text-slate-500 flex items-center mt-1"><Clock className="h-3 w-3 mr-1" /> {order.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                      {order.test}
                      {order.priority === 'URGENT' && <span className="ml-2 text-xs text-red-600 font-medium">(URGENT)</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {order.status !== 'COMPLETED' ? (
                        <button 
                          onClick={() => setActiveOrder(order)}
                          className="text-purple-600 hover:text-purple-900 font-medium"
                        >
                          Process
                        </button>
                      ) : (
                        <span className="text-slate-400 flex items-center"><CheckCircle className="h-4 w-4 mr-1" /> Done</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-1/3 flex flex-col">
          {activeOrder ? (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col">
              <h3 className="text-lg font-semibold text-slate-800 mb-2 border-b border-slate-100 pb-4 flex items-center">
                <Upload className="h-5 w-5 mr-2 text-purple-600" /> Enter Results
              </h3>
              
              <div className="mb-6 space-y-2 mt-4 bg-slate-50 p-4 rounded-lg">
                <p className="text-sm text-slate-600"><span className="font-medium text-slate-900">Patient:</span> {activeOrder.patient}</p>
                <p className="text-sm text-slate-600"><span className="font-medium text-slate-900">Test:</span> {activeOrder.test}</p>
                <p className="text-sm text-slate-600"><span className="font-medium text-slate-900">Order ID:</span> {activeOrder.id}</p>
              </div>

              <form onSubmit={handleUploadResults} className="flex-1 flex flex-col">
                <div className="flex-1 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Result Notes / Values</label>
                    <textarea 
                      rows={6} 
                      className="w-full rounded-md border-slate-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3 border resize-none" 
                      placeholder="Enter the clinical findings or specific values here..."
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Upload Report (PDF/Img)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md hover:bg-slate-50 transition-colors cursor-pointer">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-slate-400" />
                        <div className="flex text-sm text-slate-600">
                          <span className="relative rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                            Upload a file
                          </span>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-slate-500">PNG, JPG, PDF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-6">
                  <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">
                    Mark as Completed & Send
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 p-6 text-center">
              <FlaskConical className="h-12 w-12 text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium text-lg">Select a pending order to process and upload results.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
