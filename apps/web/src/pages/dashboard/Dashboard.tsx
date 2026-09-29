import { Users, Activity, Stethoscope, Clock, Calendar, Search, Link2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const stats = [
    { name: 'Total Patients Today', value: '142', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'In-Person Consultations', value: '8', icon: Stethoscope, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Telemedicine Calls', value: '3', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'Triage Queue', value: '12', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Overview Dashboard</h2>
          <p className="text-sm text-slate-500 mt-1">Welcome back. Here is what's happening today.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm">
          <Calendar className="h-4 w-4 mr-2" />
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm font-medium text-slate-500 mt-1">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
        <span className="text-sm font-semibold text-slate-700 flex items-center"><Link2 className="h-4 w-4 mr-2" /> Quick Links:</span>
        <button onClick={() => navigate('/admin/surgery')} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-sm hover:bg-brand-50 hover:text-brand-700 transition-colors">Surgery Schedules</button>
        <button onClick={() => navigate('/admin/specialized')} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-sm hover:bg-brand-50 hover:text-brand-700 transition-colors">Specialized Clinics</button>
        <button onClick={() => navigate('/admin/directory')} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-sm hover:bg-brand-50 hover:text-brand-700 transition-colors">Staff Directory</button>
        <button onClick={() => navigate('/admin/mortuary')} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-sm hover:bg-brand-50 hover:text-brand-700 transition-colors">Mortuary</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-brand-600" /> Recent Activity
          </h3>
          <div className="space-y-4">
            {[
              { time: '10 mins ago', text: 'Dr. Smith finished consultation with John Doe' },
              { time: '12 mins ago', text: 'Patient Emily Chen joined virtual waiting room' },
              { time: '15 mins ago', text: 'Lab results ready for Jane Smith (CBC)' },
              { time: '1 hour ago', text: 'Emergency triage: Patient admitted to ICU' },
            ].map((activity, i) => (
              <div key={i} className="flex items-start">
                <div className="w-24 flex-shrink-0 text-xs text-slate-400 font-medium pt-1">{activity.time}</div>
                <div className="flex-1 text-sm text-slate-700">{activity.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-xl shadow-sm p-6 text-white flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-2">Hospital Capacity</h3>
          <p className="text-brand-100 mb-6">Ward occupancy is currently at 85%. Consider discharging stable patients.</p>
          <div className="w-full bg-brand-900 rounded-full h-3 mb-2">
            <div className="bg-white h-3 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <p className="text-sm text-brand-200 font-medium text-right mb-6">85% Full</p>

          <h3 className="text-lg font-bold flex items-center mb-4 mt-4 border-t border-brand-500 pt-4">
            <Search className="h-5 w-5 mr-2" /> Active Clinical Research
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-white/10 rounded-lg">
              <p className="text-sm font-semibold">Study: Lassa Fever Efficacy</p>
              <p className="text-xs text-brand-100 mt-1">64 enrolled patients. Led by Dr. Okafor.</p>
            </div>
            <div className="p-3 bg-white/10 rounded-lg">
              <p className="text-sm font-semibold">Study: Hypertension in Urban Areas</p>
              <p className="text-xs text-brand-100 mt-1">120 enrolled patients. Led by Dr. Adeyemi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
