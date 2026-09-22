import { useState } from 'react';
import { PackageSearch, AlertTriangle, ArrowDownToLine, ShoppingCart, Filter } from 'lucide-react';

export default function InventoryDashboard() {
  const [activeTab, setActiveTab] = useState<'LEDGER' | 'PO' | 'EXPIRING'>('LEDGER');

  const stockItems = [
    { id: 'ITM-001', name: 'Paracetamol 500mg Tabs', category: 'Pharmacy', stock: 1500, reorder: 500, status: 'OK' },
    { id: 'ITM-002', name: 'Latex Gloves (Medium)', category: 'Consumables', stock: 120, reorder: 200, status: 'LOW' },
    { id: 'ITM-003', name: 'Ceftriaxone 1g Injection', category: 'Pharmacy', stock: 45, reorder: 50, status: 'LOW' },
    { id: 'ITM-004', name: 'Syringes 5ml', category: 'Consumables', stock: 2500, reorder: 1000, status: 'OK' },
  ];

  const expiringItems = [
    { id: 'BAT-992', name: 'Amoxicillin 250mg Susp', batch: 'B2023-A', expiry: 'Nov 15, 2026', qty: 20 },
    { id: 'BAT-842', name: 'Tetanus Toxoid Vaccine', batch: 'V-992', expiry: 'Dec 01, 2026', qty: 5 },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Central Inventory & Supply Chain</h2>
          <p className="text-sm text-slate-500 mt-1">Manage pharmacy stock, consumables, and general supplies.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 shadow-sm flex items-center text-sm font-medium">
            <ArrowDownToLine className="h-4 w-4 mr-2" /> Receive Goods
          </button>
          <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm flex items-center text-sm font-medium">
            <ShoppingCart className="h-4 w-4 mr-2" /> New Purchase Order
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('LEDGER')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'LEDGER' ? 'border-brand-500 text-brand-600 bg-brand-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Stock Ledger
            </button>
            <button
              onClick={() => setActiveTab('PO')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'PO' ? 'border-brand-500 text-brand-600 bg-brand-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Purchase Orders
            </button>
            <button
              onClick={() => setActiveTab('EXPIRING')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center ${
                activeTab === 'EXPIRING' ? 'border-red-500 text-red-600 bg-red-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <AlertTriangle className="h-4 w-4 mr-2" /> Expiring Soon
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'LEDGER' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4">
                <div className="relative w-96">
                  <PackageSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input type="text" placeholder="Search items..." className="pl-10 pr-4 py-2 w-full border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none" />
                </div>
                <button className="p-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">
                  <Filter className="h-5 w-5" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 text-sm">
                      <th className="py-3 px-4 font-medium">Item Code</th>
                      <th className="py-3 px-4 font-medium">Name</th>
                      <th className="py-3 px-4 font-medium">Category</th>
                      <th className="py-3 px-4 font-medium">Current Stock</th>
                      <th className="py-3 px-4 font-medium">Reorder Level</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stockItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-sm text-slate-500 font-mono">{item.id}</td>
                        <td className="py-3 px-4 text-sm font-medium text-slate-800">{item.name}</td>
                        <td className="py-3 px-4 text-sm text-slate-600">{item.category}</td>
                        <td className="py-3 px-4 text-sm text-slate-800 font-medium">{item.stock}</td>
                        <td className="py-3 px-4 text-sm text-slate-500">{item.reorder}</td>
                        <td className="py-3 px-4 text-sm">
                          {item.status === 'LOW' ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Low Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                              Optimal
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'EXPIRING' && (
            <div className="space-y-4 animate-in fade-in">
               <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-lg flex items-start mb-6">
                 <AlertTriangle className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                 <div>
                   <h4 className="font-semibold">FEFO Dispensing Alert</h4>
                   <p className="text-sm mt-1">The following batches are nearing their expiration dates. Ensure they are prioritized for dispensing according to First-Expiry-First-Out logic.</p>
                 </div>
               </div>
               <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-y border-slate-200 text-slate-500 text-sm">
                      <th className="py-3 px-4 font-medium">Item Name</th>
                      <th className="py-3 px-4 font-medium">Batch No.</th>
                      <th className="py-3 px-4 font-medium">Quantity Left</th>
                      <th className="py-3 px-4 font-medium">Expiry Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {expiringItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-800">{item.name}</td>
                        <td className="py-3 px-4 text-sm text-slate-500 font-mono">{item.batch}</td>
                        <td className="py-3 px-4 text-sm text-slate-800">{item.qty}</td>
                        <td className="py-3 px-4 text-sm text-red-600 font-semibold">{item.expiry}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          )}

          {activeTab === 'PO' && (
            <div className="py-12 text-center text-slate-500 animate-in fade-in">
              <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-700">No Active Purchase Orders</h3>
              <p className="mt-1">Create a new purchase order to restock depleted inventory.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
