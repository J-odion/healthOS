import { useState } from 'react';
import { Stethoscope, Clock, Calendar, Search, Users, Activity, CheckCircle, AlertCircle } from 'lucide-react';

type SurgeryStatus = 'PRE_OP' | 'INTRA_OP' | 'POST_OP' | 'SCHEDULED' | 'COMPLETED';

interface Surgery {
  id: string;
  patientName: string;
  procedure: string;
  surgeon: string;
  anesthesiologist: string;
  room: string;
  time: string;
  status: SurgeryStatus;
}

export default function SurgerySchedule() {
  const [activeTab, setActiveTab] = useState<'TODAY' | 'UPCOMING'>('TODAY');

  const surgeries: Surgery[] = [
    { id: 'SUR-101', patientName: 'John Doe', procedure: 'Appendectomy', surgeon: 'Dr. Sarah Connor', anesthesiologist: 'Dr. Evans', room: 'OR-1', time: '08:00 AM', status: 'POST_OP' },
    { id: 'SUR-102', patientName: 'Alice Johnson', procedure: 'C-Section', surgeon: 'Dr. James Smith', anesthesiologist: 'Dr. Peters', room: 'OR-2', time: '10:30 AM', status: 'INTRA_OP' },
    { id: 'SUR-103', patientName: 'David Lee', procedure: 'Knee Replacement', surgeon: 'Dr. Robert Cline', anesthesiologist: 'Dr. Evans', room: 'OR-1', time: '02:00 PM', status: 'PRE_OP' },
    { id: 'SUR-104', patientName: 'Emily Chen', procedure: 'Gallbladder Removal', surgeon: 'Dr. Sarah Connor', anesthesiologist: 'Dr. Peters', room: 'OR-3', time: '04:00 PM', status: 'SCHEDULED' },
  ];

  const getStatusColor = (status: SurgeryStatus) => {
    switch (status) {
      case 'PRE_OP': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'INTRA_OP': return 'bg-red-100 text-red-800 border-red-200 animate-pulse';
      case 'POST_OP': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SCHEDULED': return 'bg-slate-100 text-slate-800 border-slate-200';
      case 'COMPLETED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusIcon = (status: SurgeryStatus) => {
    switch (status) {
      case 'PRE_OP': return <Clock className="h-4 w-4 mr-1" />;
      case 'INTRA_OP': return <Activity className="h-4 w-4 mr-1" />;
      case 'POST_OP': return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'SCHEDULED': return <Calendar className="h-4 w-4 mr-1" />;
      case 'COMPLETED': return <CheckCircle className="h-4 w-4 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight flex items-center">
            <Stethoscope className="h-6 w-6 mr-2 text-brand-600" /> Operating Theater (OT) Management
          </h2>
          <p className="text-sm text-slate-500 mt-1">Manage surgical schedules, OR allocations, and patient status.</p>
        </div>
        <button className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 shadow-sm flex items-center text-sm font-medium">
          <Calendar className="h-4 w-4 mr-2" /> Schedule Surgery
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 bg-red-50 text-red-600 rounded-lg mr-4">
             <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Surgeries</p>
            <p className="text-2xl font-bold text-slate-800">1</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mr-4">
             <Stethoscope className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Today's Total</p>
            <p className="text-2xl font-bold text-slate-800">4</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg mr-4">
             <Users className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">In Pre-Op</p>
            <p className="text-2xl font-bold text-slate-800">1</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg mr-4">
             <CheckCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Available ORs</p>
            <p className="text-2xl font-bold text-slate-800">2 <span className="text-sm font-normal text-slate-500">/ 4</span></p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <nav className="flex -mb-px px-4">
            <button
              onClick={() => setActiveTab('TODAY')}
              className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'TODAY' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Today's Board
            </button>
            <button
              onClick={() => setActiveTab('UPCOMING')}
              className={`py-4 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === 'UPCOMING' ? 'border-brand-500 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              Upcoming Schedule
            </button>
          </nav>
          <div className="pr-4">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
               <input type="text" placeholder="Search surgeries..." className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-md text-sm w-64 focus:ring-2 focus:ring-brand-500 outline-none" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-slate-200 text-slate-500 text-sm">
                <th className="py-3 px-6 font-medium">Time</th>
                <th className="py-3 px-6 font-medium">OR / Room</th>
                <th className="py-3 px-6 font-medium">Patient</th>
                <th className="py-3 px-6 font-medium">Procedure</th>
                <th className="py-3 px-6 font-medium">Surgical Team</th>
                <th className="py-3 px-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {surgeries.map((surgery) => (
                <tr key={surgery.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-700 text-sm whitespace-nowrap">
                    {surgery.time}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-mono text-xs font-semibold rounded border border-slate-200">
                      {surgery.room}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-semibold text-slate-800 text-sm">{surgery.patientName}</p>
                    <p className="text-xs text-slate-500">{surgery.id}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-medium text-slate-800 text-sm">{surgery.procedure}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium text-slate-700">{surgery.surgeon}</p>
                    <p className="text-xs text-slate-500">Anes: {surgery.anesthesiologist}</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusColor(surgery.status)}`}>
                      {getStatusIcon(surgery.status)} {surgery.status.replace('_', ' ')}
                    </span>
                    {surgery.status === 'INTRA_OP' && (
                      <p className="text-[10px] text-red-500 mt-1 flex items-center font-medium">
                        <AlertCircle className="h-3 w-3 mr-0.5" /> In Progress (1h 15m)
                      </p>
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
