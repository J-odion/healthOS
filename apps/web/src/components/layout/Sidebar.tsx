import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Activity, 
  FlaskConical, 
  Pill, 
  Receipt 
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Sidebar() {
  const user = useAuthStore((state) => state.user);
  
  // Base links available to all
  let links = [
    { name: 'Dashboard', to: '/', icon: LayoutDashboard }
  ];

  // Dynamic role-based links
  const roleName = user?.role || '';
  if (roleName === 'RECEPTIONIST' || roleName === 'ADMIN') {
    links.push({ name: 'Patients & Queue', to: '/patients', icon: Users });
  }
  if (roleName === 'DOCTOR' || roleName === 'ADMIN') {
    links.push({ name: 'Consultations', to: '/consultations', icon: Stethoscope });
  }
  if (roleName === 'NURSE' || roleName === 'ADMIN') {
    links.push({ name: 'Triage & Vitals', to: '/triage', icon: Activity });
  }
  if (roleName === 'LAB_TECH' || roleName === 'ADMIN') {
    links.push({ name: 'Laboratory', to: '/lab', icon: FlaskConical });
  }
  if (roleName === 'PHARMACIST' || roleName === 'ADMIN') {
    links.push({ name: 'Pharmacy', to: '/pharmacy', icon: Pill });
  }
  if (roleName === 'CASHIER' || roleName === 'ADMIN') {
    links.push({ name: 'Billing', to: '/billing', icon: Receipt });
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <span className="text-xl font-bold text-brand-600 tracking-tight">HospiOS</span>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        <p className="px-2 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
          {roleName} Menu
        </p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => twMerge(
              clsx(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive 
                  ? "bg-brand-50 text-brand-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )
            )}
          >
            {({ isActive }) => (
              <>
                <link.icon 
                  className={twMerge(
                    clsx(
                      "mr-3 flex-shrink-0 h-5 w-5 transition-colors",
                      isActive ? "text-brand-600" : "text-slate-400 group-hover:text-slate-500"
                    )
                  )} 
                />
                {link.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
