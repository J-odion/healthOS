import { AlertTriangle, Zap, Server, Activity, ArrowRight, Wrench } from 'lucide-react';

export default function AssetDashboard() {
  const assets = [
    { id: 'EQ-MRI-01', name: 'Siemens MRI Scanner', location: 'Radiology Dept', status: 'OPERATIONAL', lastMaintenance: 'Sep 10, 2026', nextMaintenance: 'Dec 10, 2026', icon: Activity },
    { id: 'EQ-GEN-02', name: 'Cummins 500kVA Backup Gen', location: 'Utility Block', status: 'MAINTENANCE_DUE', lastMaintenance: 'Jun 15, 2026', nextMaintenance: 'Oct 15, 2026', icon: Zap },
    { id: 'EQ-SRV-01', name: 'Main EMR Database Server', location: 'Server Room', status: 'OPERATIONAL', lastMaintenance: 'Oct 01, 2026', nextMaintenance: 'Jan 01, 2027', icon: Server },
    { id: 'EQ-SLR-01', name: 'Solar Inverter Bank', location: 'Roof/Utility Block', status: 'FAULTED', lastMaintenance: 'Aug 20, 2026', nextMaintenance: 'Nov 20, 2026', icon: Zap },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <Wrench className="h-6 w-6 mr-2 text-brand-600" /> Asset & Equipment Maintenance
          </h2>
          <p className="text-sm text-slate-500 mt-1">Track preventative maintenance and repair tickets for critical hospital infrastructure.</p>
        </div>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm flex items-center text-sm font-medium">
          <Wrench className="h-4 w-4 mr-2" /> Log Maintenance Ticket
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {assets.map((asset) => (
          <div key={asset.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            {asset.status === 'FAULTED' && <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />}
            {asset.status === 'MAINTENANCE_DUE' && <div className="absolute top-0 left-0 w-full h-1 bg-orange-500" />}
            {asset.status === 'OPERATIONAL' && <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500" />}
            
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-lg">
                <asset.icon className="h-6 w-6 text-slate-600" />
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold tracking-wider ${
                asset.status === 'OPERATIONAL' ? 'bg-emerald-100 text-emerald-800' :
                asset.status === 'FAULTED' ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'
              }`}>
                {asset.status.replace('_', ' ')}
              </span>
            </div>

            <h3 className="font-bold text-slate-800 truncate" title={asset.name}>{asset.name}</h3>
            <p className="text-xs text-slate-500 font-mono mt-1">{asset.id} • {asset.location}</p>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Last Serviced:</span>
                <span className="font-medium text-slate-700">{asset.lastMaintenance}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Next Due:</span>
                <span className={`font-bold ${asset.status === 'MAINTENANCE_DUE' ? 'text-orange-600' : 'text-slate-700'}`}>
                  {asset.nextMaintenance}
                </span>
              </div>
            </div>

            <button className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 text-sm font-medium rounded-lg transition-colors flex justify-center items-center">
              View History <ArrowRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mt-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b border-slate-100 pb-2">Active Repair Tickets</h3>
        <div className="text-center py-8 text-slate-500">
           <AlertTriangle className="h-10 w-10 mx-auto mb-3 text-orange-300" />
           <p className="font-medium text-slate-700">1 Critical Ticket Open</p>
           <p className="text-sm mt-1">Ticket #TK-992: Solar Inverter Bank producing low yield. Assigned to Facilities Team.</p>
           <button className="mt-4 px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-sm font-medium text-slate-600">
             Manage Ticket
           </button>
        </div>
      </div>
    </div>
  );
}
