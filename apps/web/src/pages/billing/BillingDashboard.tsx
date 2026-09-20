import { useState } from 'react';
import { Receipt, CreditCard, Banknote, Search, FileText } from 'lucide-react';
import { toast } from 'sonner';

export default function BillingDashboard() {
  const [invoices, setInvoices] = useState([
    { id: 'INV-2023-001', patient: 'Peter Parker', date: 'Oct 12, 2026', amount: 12500, status: 'UNPAID', items: ['Consultation - General', 'CBC Test'] },
    { id: 'INV-2023-002', patient: 'Mary Jane', date: 'Oct 12, 2026', amount: 8500, status: 'UNPAID', items: ['Pharmacy - Medications'] },
    { id: 'INV-2023-003', patient: 'Harry Osborn', date: 'Oct 11, 2026', amount: 45000, status: 'PAID', items: ['Emergency Admission', 'X-Ray'] },
  ]);

  const [activeInvoice, setActiveInvoice] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState('CARD');

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Payment of ₦${activeInvoice.amount.toLocaleString()} received via ${paymentMethod}.`);
    setInvoices(invoices.map(inv => inv.id === activeInvoice.id ? { ...inv, status: 'PAID' } : inv));
    setActiveInvoice(null);
  };

  return (
    <div className="flex h-full space-x-6">
      <div className="flex-1 flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <Receipt className="h-6 w-6 mr-2 text-green-600" /> Billing & Cashier
          </h2>
          <div className="relative">
            <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by Patient or Invoice ID..." 
              className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none w-72"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex-1">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Amount (₦)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{inv.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-slate-900">{inv.patient}</div>
                    <div className="text-xs text-slate-500">{inv.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-700">
                    ₦{inv.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {inv.status === 'PAID' ? (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
                    ) : (
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Unpaid</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {inv.status === 'UNPAID' ? (
                      <button 
                        onClick={() => setActiveInvoice(inv)}
                        className="text-green-600 hover:text-green-900 bg-green-50 px-3 py-1 rounded-md transition-colors"
                      >
                        Collect Payment
                      </button>
                    ) : (
                      <button className="text-slate-500 hover:text-slate-700 flex items-center justify-end w-full">
                        <FileText className="h-4 w-4 mr-1" /> Receipt
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {activeInvoice && (
        <div className="w-96 flex flex-col space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-4">Process Payment</h3>
            
            <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-100">
              <p className="text-sm text-slate-500 mb-1">Total Amount Due</p>
              <p className="text-3xl font-bold text-slate-900 mb-4">₦{activeInvoice.amount.toLocaleString()}</p>
              
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Billable Items</p>
                <ul className="text-sm text-slate-700 space-y-1">
                  {activeInvoice.items.map((item: string, i: number) => (
                    <li key={i} className="flex items-center">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-3">Payment Method</label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => setPaymentMethod('CARD')}
                    className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center justify-center transition-all ${paymentMethod === 'CARD' ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-slate-200 hover:bg-slate-50'}`}
                  >
                    <CreditCard className={`h-6 w-6 mb-2 ${paymentMethod === 'CARD' ? 'text-green-600' : 'text-slate-400'}`} />
                    <span className={`text-sm font-medium ${paymentMethod === 'CARD' ? 'text-green-700' : 'text-slate-600'}`}>Card / POS</span>
                  </div>
                  <div 
                    onClick={() => setPaymentMethod('CASH')}
                    className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center justify-center transition-all ${paymentMethod === 'CASH' ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-slate-200 hover:bg-slate-50'}`}
                  >
                    <Banknote className={`h-6 w-6 mb-2 ${paymentMethod === 'CASH' ? 'text-green-600' : 'text-slate-400'}`} />
                    <span className={`text-sm font-medium ${paymentMethod === 'CASH' ? 'text-green-700' : 'text-slate-600'}`}>Cash</span>
                  </div>
                </div>
              </div>

              {paymentMethod === 'CASH' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700">Amount Tendered</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-slate-500 sm:text-sm">₦</span>
                    </div>
                    <input type="number" className="block w-full pl-8 pr-12 sm:text-sm border-slate-300 rounded-md focus:ring-green-500 focus:border-green-500 p-2 border" placeholder="0.00" defaultValue={activeInvoice.amount} required />
                  </div>
                </div>
              )}

              <div className="pt-2">
                <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                  Confirm Payment
                </button>
                <button 
                  type="button" 
                  onClick={() => setActiveInvoice(null)}
                  className="w-full mt-2 py-2 text-sm font-medium text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
