import { useState } from 'react';
import { Shield, Users, Database, Server, UserPlus, Lock, Search, Filter, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function AdminControlPanel() {
  const [activeTab, setActiveTab] = useState<'USERS' | 'AUDIT' | 'SYSTEM'>('USERS');

  const users = [
    { id: 'USR-01', name: 'Dr. Jane Smith', role: 'DOCTOR', status: 'ACTIVE', lastLogin: 'Today, 08:30 AM' },
    { id: 'USR-02', name: 'John Doe', role: 'NURSE', status: 'ACTIVE', lastLogin: 'Today, 07:15 AM' },
    { id: 'USR-03', name: 'Alice Johnson', role: 'PHARMACIST', status: 'ACTIVE', lastLogin: 'Yesterday, 04:00 PM' },
    { id: 'USR-04', name: 'Mark Evans', role: 'CASHIER', status: 'SUSPENDED', lastLogin: 'Oct 10, 2026' },
  ];

  const logs = [
    { id: 'LOG-9921', user: 'Dr. Jane Smith', action: 'CREATE_PRESCRIPTION', entity: 'Patient PT-9942', time: '10:45 AM', ip: '192.168.1.45' },
    { id: 'LOG-9920', user: 'Alice Johnson', action: 'DISPENSE_MED', entity: 'Batch B2023-A', time: '10:30 AM', ip: '192.168.1.22' },
    { id: 'LOG-9919', user: 'John Doe', action: 'UPDATE_VITALS', entity: 'Patient PT-1120', time: '09:15 AM', ip: '192.168.1.18' },
    { id: 'LOG-9918', user: 'SYSTEM', action: 'DB_BACKUP_SUCCESS', entity: 'Main_DB', time: '02:00 AM', ip: 'localhost' },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <Shield className="h-6 w-6 mr-2 text-brand-600" /> IT Admin Control Panel
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage users, roles, audit logs, and system health.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex min-h-[600px]">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-slate-50 border-r border-slate-200 p-4">
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('USERS')}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'USERS' ? 'bg-brand-100 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Users className="h-5 w-5 mr-3" /> User Management
            </button>
            <button
              onClick={() => setActiveTab('AUDIT')}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'AUDIT' ? 'bg-brand-100 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Lock className="h-5 w-5 mr-3" /> Security & Audit Logs
            </button>
            <button
              onClick={() => setActiveTab('SYSTEM')}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'SYSTEM' ? 'bg-brand-100 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Server className="h-5 w-5 mr-3" /> System Health & Backup
            </button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {activeTab === 'USERS' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-800">User Management</h3>
                <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm flex items-center text-sm font-medium">
                  <UserPlus className="h-4 w-4 mr-2" /> Add New User
                </button>
              </div>
              <div className="overflow-x-auto border border-slate-200 rounded-lg">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                      <th className="py-3 px-4 font-medium">Name</th>
                      <th className="py-3 px-4 font-medium">Role</th>
                      <th className="py-3 px-4 font-medium">Status</th>
                      <th className="py-3 px-4 font-medium">Last Login</th>
                      <th className="py-3 px-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 text-sm font-medium text-slate-800 flex items-center">
                          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center mr-3 text-xs font-bold text-slate-600">
                            {user.name.charAt(0)}
                          </div>
                          {user.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-600 font-mono text-xs">{user.role}</td>
                        <td className="py-3 px-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-500">{user.lastLogin}</td>
                        <td className="py-3 px-4 text-sm text-right space-x-2">
                          <button className="text-brand-600 hover:text-brand-800 font-medium">Edit</button>
                          {user.status === 'ACTIVE' && (
                            <button className="text-red-600 hover:text-red-800 font-medium">Suspend</button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'AUDIT' && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800">Immutable Audit Logs</h3>
              <div className="flex space-x-4">
                 <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="text" placeholder="Search logs by user, action, or IP..." className="pl-9 pr-4 py-2 w-full border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-500 outline-none" />
                </div>
                <button className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 flex items-center text-sm font-medium">
                  <Filter className="h-4 w-4 mr-2" /> Filter
                </button>
              </div>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                      <th className="py-3 px-4 font-medium">Timestamp</th>
                      <th className="py-3 px-4 font-medium">User</th>
                      <th className="py-3 px-4 font-medium">Action</th>
                      <th className="py-3 px-4 font-medium">Target Entity</th>
                      <th className="py-3 px-4 font-medium">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/50 font-mono">
                        <td className="py-3 px-4 text-slate-500">{log.time}</td>
                        <td className="py-3 px-4 font-medium text-slate-700">{log.user}</td>
                        <td className="py-3 px-4 text-brand-600">{log.action}</td>
                        <td className="py-3 px-4 text-slate-600">{log.entity}</td>
                        <td className="py-3 px-4 text-slate-400 text-xs">{log.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'SYSTEM' && (
            <div className="space-y-6 animate-in fade-in">
              <h3 className="text-lg font-semibold text-slate-800">System Health & Infrastructure</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-emerald-900 flex items-center">
                      <Database className="h-5 w-5 mr-2 text-emerald-600" /> Database Backup
                    </h4>
                    <span className="px-2 py-1 bg-emerald-200 text-emerald-800 text-xs font-bold rounded flex items-center">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> HEALTHY
                    </span>
                  </div>
                  <p className="text-sm text-emerald-800 mb-2">Last automated backup completed successfully.</p>
                  <p className="text-xs text-emerald-700 font-mono">Timestamp: Today, 02:00 AM</p>
                  <p className="text-xs text-emerald-700 font-mono">Location: AWS S3 (Encrypted)</p>
                  <button className="mt-4 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded hover:bg-emerald-700">Trigger Manual Backup</button>
                </div>

                <div className="border border-slate-200 bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-slate-800 flex items-center">
                      <ShieldAlert className="h-5 w-5 mr-2 text-orange-500" /> Security Posture
                    </h4>
                    <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded">ATTENTION</span>
                  </div>
                  <ul className="text-sm text-slate-600 space-y-2">
                    <li className="flex items-center justify-between">
                      <span>Failed Login Attempts (24h)</span>
                      <span className="font-bold text-slate-800">12</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Active Sessions</span>
                      <span className="font-bold text-slate-800">45</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Users without 2FA</span>
                      <span className="font-bold text-orange-600">18</span>
                    </li>
                  </ul>
                  <button className="w-full mt-4 py-2 border border-slate-200 text-slate-700 text-sm font-medium rounded hover:bg-slate-50">Enforce 2FA Policy</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
