import { ShieldPlus, FileText, CheckCircle, Clock, XCircle, Search, Filter, Send } from 'lucide-react';

export default function ClaimsPortal() {
  const claims = [
    { id: 'CLM-0091', patient: 'Michael Osei', provider: 'Hygeia HMO', amount: 45000, date: 'Oct 20, 2026', status: 'SUBMITTED' },
    { id: 'CLM-0092', patient: 'Sarah Johnson', provider: 'Reliance HMO', amount: 12500, date: 'Oct 21, 2026', status: 'DRAFT' },
    { id: 'CLM-0088', patient: 'David Emmanuel', provider: 'NHIA', amount: 89000, date: 'Oct 15, 2026', status: 'APPROVED' },
    { id: 'CLM-0085', patient: 'Linda Chika', provider: 'Hygeia HMO', amount: 34000, date: 'Oct 12, 2026', status: 'DENIED', reason: 'Service not covered by plan' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <ShieldPlus className="h-6 w-6 mr-2 text-brand-600" /> HMO & NHIA Claims Portal
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage electronic claims submission and track remittance.</p>
        </div>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm flex items-center text-sm font-medium">
          <FileText className="h-4 w-4 mr-2" /> Generate New Claim
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
          <p className="text-sm text-slate-500 font-medium">Pending Submission</p>
          <p className="text-3xl font-bold text-slate-800 mt-1">12</p>
          <p className="text-xs text-slate-400 mt-1">₦ 145,000</p>
        </div>
        <div className="bg-blue-50 p-5 rounded-xl border border-blue-200 shadow-sm text-center">
          <p className="text-sm text-blue-600 font-medium">Awaiting Provider</p>
          <p className="text-3xl font-bold text-blue-800 mt-1">45</p>
          <p className="text-xs text-blue-500 mt-1">₦ 1.2M</p>
        </div>
        <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200 shadow-sm text-center">
          <p className="text-sm text-emerald-600 font-medium">Approved (30 Days)</p>
          <p className="text-3xl font-bold text-emerald-800 mt-1">128</p>
          <p className="text-xs text-emerald-500 mt-1">₦ 4.5M</p>
        </div>
        <div className="bg-red-50 p-5 rounded-xl border border-red-200 shadow-sm text-center">
          <p className="text-sm text-red-600 font-medium">Denied / Queried</p>
          <p className="text-3xl font-bold text-red-800 mt-1">3</p>
          <p className="text-xs text-red-500 mt-1">Requires Action</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="flex space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input type="text" placeholder="Search claims..." className="pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm w-64 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
            <button className="px-3 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-white bg-slate-50 flex items-center text-sm">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </button>
          </div>
          <button className="px-4 py-2 border border-brand-200 text-brand-700 bg-brand-50 rounded-lg hover:bg-brand-100 flex items-center text-sm font-medium">
             <Send className="h-4 w-4 mr-2" /> Batch Submit Selected
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-slate-500 text-sm">
                <th className="py-3 px-4 font-medium w-12"><input type="checkbox" className="rounded border-slate-300" /></th>
                <th className="py-3 px-4 font-medium">Claim ID</th>
                <th className="py-3 px-4 font-medium">Patient</th>
                <th className="py-3 px-4 font-medium">HMO / Provider</th>
                <th className="py-3 px-4 font-medium">Date</th>
                <th className="py-3 px-4 font-medium text-right">Amount (₦)</th>
                <th className="py-3 px-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {claims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/50">
                   <td className="py-3 px-4"><input type="checkbox" className="rounded border-slate-300" /></td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-xs">{claim.id}</td>
                  <td className="py-3 px-4 font-medium text-slate-800">{claim.patient}</td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="px-2 py-1 bg-slate-100 rounded text-xs font-semibold text-slate-700">{claim.provider}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-500">{claim.date}</td>
                  <td className="py-3 px-4 text-right font-medium text-slate-800">
                    {claim.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    {claim.status === 'DRAFT' && <span className="flex items-center text-slate-500 text-xs font-bold"><Clock className="h-3 w-3 mr-1" /> DRAFT</span>}
                    {claim.status === 'SUBMITTED' && <span className="flex items-center text-blue-600 text-xs font-bold"><Send className="h-3 w-3 mr-1" /> PENDING</span>}
                    {claim.status === 'APPROVED' && <span className="flex items-center text-emerald-600 text-xs font-bold"><CheckCircle className="h-3 w-3 mr-1" /> APPROVED</span>}
                    {claim.status === 'DENIED' && (
                      <div className="flex flex-col">
                        <span className="flex items-center text-red-600 text-xs font-bold"><XCircle className="h-3 w-3 mr-1" /> DENIED</span>
                        <span className="text-[10px] text-red-500 mt-0.5">{claim.reason}</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
