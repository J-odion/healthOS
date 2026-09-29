import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, PieChart, Pie, Cell, BarChart, Bar
} from 'recharts';
import { TrendingUp, Users, Bed, CreditCard, Activity, DollarSign, MapPin, Link2, FileText, Search } from 'lucide-react';
import { useState } from 'react';

export default function ExecutiveDashboard() {
  const [diseaseFilter, setDiseaseFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('Lagos');
  const revenueData = [
    { name: 'Jan', value: 4000000 },
    { name: 'Feb', value: 3000000 },
    { name: 'Mar', value: 5000000 },
    { name: 'Apr', value: 4500000 },
    { name: 'May', value: 6000000 },
    { name: 'Jun', value: 7500000 },
  ];

  const deptRevenueData = [
    { name: 'Pharmacy', value: 45 },
    { name: 'Laboratory', value: 25 },
    { name: 'Consultations', value: 20 },
    { name: 'Procedures', value: 10 },
  ];

  const demographicsData = [
    { name: '0-18 yrs', value: 15 },
    { name: '19-35 yrs', value: 35 },
    { name: '36-50 yrs', value: 30 },
    { name: '51+ yrs', value: 20 },
  ];

  const diagnosisData = [
    { name: 'Malaria', count: 1240 },
    { name: 'Typhoid', count: 850 },
    { name: 'Hypertension', count: 620 },
    { name: 'Diabetes', count: 430 },
    { name: 'URTI', count: 910 },
  ];

  const admissionsData = [
    { name: 'Mon', admitted: 12, discharged: 8 },
    { name: 'Tue', admitted: 15, discharged: 10 },
    { name: 'Wed', admitted: 8,  discharged: 12 },
    { name: 'Thu', admitted: 20, discharged: 15 },
    { name: 'Fri', admitted: 18, discharged: 20 },
    { name: 'Sat', admitted: 10, discharged: 14 },
    { name: 'Sun', admitted: 5,  discharged: 8 },
  ];
  const COLORS = ['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b'];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(value);
  };

  const kpis = [
    { name: 'Monthly Revenue', value: '₦ 7.5M', trend: '+15%', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Outpatient Visits', value: '3,240', trend: '+5%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Bed Occupancy', value: '85%', trend: '+2%', icon: Bed, color: 'text-purple-600', bg: 'bg-purple-100' },
    { name: 'HMO Receivables', value: '₦ 2.1M', trend: '-10%', icon: CreditCard, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Executive Dashboard</h2>
          <p className="text-sm text-slate-500 mt-1">Hospital-wide operational, clinical, and financial performance overview.</p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center shadow-sm">
            <FileText className="h-4 w-4 mr-2 text-brand-600" /> Export Report
          </button>
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 items-center">
        <span className="text-sm font-semibold text-slate-700 flex items-center"><Link2 className="h-4 w-4 mr-2" /> Quick Links:</span>
        <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-sm hover:bg-brand-50 hover:text-brand-700 transition-colors">Surgery Schedules</button>
        <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-sm hover:bg-brand-50 hover:text-brand-700 transition-colors">Specialized Clinics</button>
        <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-sm hover:bg-brand-50 hover:text-brand-700 transition-colors">Staff Directory (Doctors/Nurses)</button>
        <button className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded text-sm hover:bg-brand-50 hover:text-brand-700 transition-colors">Mortuary</button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <span className={`text-sm font-semibold flex items-center ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                {stat.trend} <TrendingUp className="h-4 w-4 ml-1" />
              </span>
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
              <p className="text-sm font-medium text-slate-500 mt-1">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
            <Activity className="h-5 w-5 mr-2 text-brand-600" /> Revenue Trend (Last 6 Months)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} tickFormatter={(val) => `₦${val / 1000000}M`} />
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
                <Area type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Department */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6">Revenue by Source</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deptRevenueData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deptRevenueData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value}%`} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Charts Row 2: Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admissions & Discharges */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
            <Bed className="h-5 w-5 mr-2 text-brand-600" /> Admissions vs Discharges (This Week)
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={admissionsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Legend verticalAlign="top" height={36} />
                <Bar dataKey="admitted" name="Admitted" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="discharged" name="Discharged" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Demographics */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
            <Users className="h-5 w-5 mr-2 text-brand-600" /> Patient Demographics
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={demographicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {demographicsData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value}%`} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 3: Epidemiological Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Geo-mapping and Filters */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-brand-600" /> Disease Geo-Mapping
            </h3>
            <div className="flex space-x-2">
              <select 
                value={locationFilter} 
                onChange={(e) => setLocationFilter(e.target.value)}
                className="text-sm border border-slate-200 rounded p-1 outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="Lagos">Lagos</option>
                <option value="Abuja">Abuja</option>
                <option value="Kano">Kano</option>
                <option value="Port Harcourt">Port Harcourt</option>
              </select>
              <select 
                value={diseaseFilter} 
                onChange={(e) => setDiseaseFilter(e.target.value)}
                className="text-sm border border-slate-200 rounded p-1 outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="All">All Diseases</option>
                <option value="Malaria">Malaria</option>
                <option value="Typhoid">Typhoid</option>
                <option value="Cholera">Cholera</option>
              </select>
            </div>
          </div>
          
          <div className="flex-1 bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center p-8 relative overflow-hidden">
             {/* Map Placeholder */}
             <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Nigeria_location_map.svg/1024px-Nigeria_location_map.svg.png')] bg-contain bg-center bg-no-repeat"></div>
             
             <div className="z-10 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-sm border border-slate-200 text-center">
                <MapPin className="h-8 w-8 text-brand-500 mx-auto mb-2" />
                <p className="font-semibold text-slate-800">Map Data: {locationFilter}</p>
                <p className="text-xs text-slate-500 mt-1">Showing {diseaseFilter} hotspots.</p>
                <div className="mt-3 text-sm flex space-x-4 justify-center">
                  <span className="text-blue-600 font-medium">Male: 45%</span>
                  <span className="text-pink-600 font-medium">Female: 55%</span>
                </div>
                <div className="mt-1 text-xs text-slate-500">Most affected age: 19-35 yrs</div>
             </div>
          </div>
        </div>

        {/* Common Research & Diagnosis Stats */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center">
            <Search className="h-5 w-5 mr-2 text-brand-600" /> Active Clinical Research & Top Diagnoses
          </h3>
          
          <div className="space-y-4 mb-6">
            <div className="p-3 bg-brand-50 border border-brand-100 rounded-lg">
              <p className="text-sm font-semibold text-brand-800">Ongoing Study: Lassa Fever Efficacy</p>
              <p className="text-xs text-brand-600 mt-1">64 enrolled patients. Led by Dr. Okafor (Infectious Disease Dept).</p>
            </div>
            <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
              <p className="text-sm font-semibold text-purple-800">Ongoing Study: Hypertension in Urban Areas</p>
              <p className="text-xs text-purple-600 mt-1">120 enrolled patients. Led by Dr. Adeyemi (Cardiology).</p>
            </div>
          </div>

          <h4 className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-3">Top Diagnoses (Current Month)</h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={diagnosisData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid horizontal={false} stroke="#e2e8f0" strokeDasharray="4 4" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="count" name="Reported Cases" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
