import { useState } from 'react';
import { Users, Calendar, Clock, DollarSign, Filter, CheckCircle, XCircle } from 'lucide-react';

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState<'ROSTER' | 'LEAVE' | 'PAYROLL'>('ROSTER');

  const staffList = [
    { id: 'ST-001', name: 'Dr. Jane Smith', role: 'Cardiologist', department: 'Specialist', shift: 'Morning (08:00 - 16:00)', attendance: 'Present' },
    { id: 'ST-002', name: 'John Doe', role: 'Senior Nurse', department: 'Inpatient', shift: 'Night (16:00 - 00:00)', attendance: 'Scheduled' },
    { id: 'ST-003', name: 'Alice Johnson', role: 'Pharmacist', department: 'Pharmacy', shift: 'Morning (08:00 - 16:00)', attendance: 'Present' },
    { id: 'ST-004', name: 'Mark Evans', role: 'Lab Technician', department: 'Laboratory', shift: 'Off', attendance: 'Off' },
  ];

  const leaveRequests = [
    { id: 'LR-101', name: 'Dr. Robert Cline', type: 'Annual Leave', dates: 'Nov 1 - Nov 14', status: 'PENDING' },
    { id: 'LR-102', name: 'Sarah Connor', type: 'Sick Leave', dates: 'Oct 22 - Oct 24', status: 'APPROVED' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Human Resources</h2>
          <p className="text-sm text-slate-500 mt-1">Staff rostering, leave management, and payroll summary.</p>
        </div>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm flex items-center text-sm font-medium">
          <Calendar className="h-4 w-4 mr-2" /> Auto-Generate Roster
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 rounded-xl bg-blue-100 text-blue-600 mr-4">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Active Staff</p>
            <p className="text-2xl font-bold text-slate-800">124</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 rounded-xl bg-emerald-100 text-emerald-600 mr-4">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Currently on Shift</p>
            <p className="text-2xl font-bold text-slate-800">42</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 rounded-xl bg-purple-100 text-purple-600 mr-4">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Est. Payroll (Oct)</p>
            <p className="text-2xl font-bold text-slate-800">₦ 18.4M</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('ROSTER')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'ROSTER' ? 'border-brand-500 text-brand-600 bg-brand-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Weekly Roster
            </button>
            <button
              onClick={() => setActiveTab('LEAVE')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'LEAVE' ? 'border-brand-500 text-brand-600 bg-brand-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Leave Requests
            </button>
            <button
              onClick={() => setActiveTab('PAYROLL')}
              className={`w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                activeTab === 'PAYROLL' ? 'border-brand-500 text-brand-600 bg-brand-50/50' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              Payroll Processing
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'ROSTER' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex justify-between items-center pb-4">
                <h3 className="font-semibold text-slate-800">Today's Schedule (Oct 22, 2026)</h3>
                <button className="p-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50">
                  <Filter className="h-5 w-5" />
                </button>
              </div>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                      <th className="py-3 px-4 font-medium">Staff Member</th>
                      <th className="py-3 px-4 font-medium">Department</th>
                      <th className="py-3 px-4 font-medium">Shift Time</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {staffList.map((staff) => (
                      <tr key={staff.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-800">
                          {staff.name}
                          <span className="block text-xs text-slate-500 font-normal">{staff.role}</span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600">{staff.department}</td>
                        <td className="py-3 px-4 text-sm text-slate-600 font-mono text-xs">{staff.shift}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            staff.attendance === 'Present' ? 'bg-emerald-100 text-emerald-800' : 
                            staff.attendance === 'Scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {staff.attendance}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'LEAVE' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="grid gap-4">
                {leaveRequests.map(req => (
                  <div key={req.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-slate-800">{req.name}</p>
                      <p className="text-sm text-slate-500 mt-1">{req.type} • <span className="font-mono text-xs">{req.dates}</span></p>
                    </div>
                    {req.status === 'PENDING' ? (
                      <div className="flex space-x-2">
                        <button className="p-2 text-emerald-600 bg-emerald-50 rounded hover:bg-emerald-100 transition-colors">
                          <CheckCircle className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors">
                          <XCircle className="h-5 w-5" />
                        </button>
                      </div>
                    ) : (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                        {req.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'PAYROLL' && (
            <div className="py-12 text-center text-slate-500 animate-in fade-in">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-slate-300" />
              <h3 className="text-lg font-medium text-slate-700">Payroll Cycle: October 2026</h3>
              <p className="mt-1 mb-4">Payroll will be calculated on Oct 25 based on biometric attendance and approved leave.</p>
              <button className="px-6 py-2 border border-brand-200 text-brand-700 rounded-lg hover:bg-brand-50 font-medium transition-colors">
                Preview Payslips
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
