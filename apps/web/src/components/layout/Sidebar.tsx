import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { 
  LayoutDashboard, 
  Users, 
  Stethoscope, 
  Activity, 
  FlaskConical, 
  Pill, 
  Receipt,
  X,
  Video,
  BarChart,
  BedDouble,
  PackageSearch,
  ShieldCheck,
  Briefcase,
  Wrench,
  ShieldPlus,
  Scissors,
  Ambulance,
  Droplet,
  Bone,
  UtensilsCrossed,
  Snowflake
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
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
    links.push({ name: 'Telemedicine', to: '/telemedicine', icon: Video });
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
  if (roleName === 'STORE_OFFICER' || roleName === 'ADMIN') {
    links.push({ name: 'Inventory', to: '/inventory', icon: PackageSearch });
  }
  if (roleName === 'CASHIER' || roleName === 'ADMIN') {
    links.push({ name: 'Billing', to: '/billing', icon: Receipt });
  }
  if (roleName === 'NURSE' || roleName === 'DOCTOR' || roleName === 'ADMIN') {
    links.push({ name: 'Ward Management', to: '/ward', icon: BedDouble });
  }
  if (roleName === 'DIRECTOR' || roleName === 'ADMIN') {
    links.push({ name: 'Executive Dashboard', to: '/executive', icon: BarChart });
  }
  if (roleName === 'ADMIN' || roleName === 'DIRECTOR') {
    links.push({ name: 'Human Resources', to: '/hr', icon: Briefcase });
  }
  if (roleName === 'ADMIN' || roleName === 'STORE_OFFICER') {
    links.push({ name: 'Assets & Maintenance', to: '/assets', icon: Wrench });
  }
  if (roleName === 'CASHIER' || roleName === 'ADMIN' || roleName === 'DIRECTOR') {
    links.push({ name: 'HMO & Claims', to: '/claims', icon: ShieldPlus });
  }

  // Enterprise Modules
  if (roleName === 'DOCTOR' || roleName === 'NURSE' || roleName === 'ADMIN') {
    links.push({ name: 'Surgery Schedule', to: '/surgery', icon: Scissors });
  }
  if (roleName === 'NURSE' || roleName === 'ADMIN') {
    links.push({ name: 'Ambulance Dispatch', to: '/dispatch', icon: Ambulance });
    links.push({ name: 'Blood Bank', to: '/blood-bank', icon: Droplet });
  }
  if (roleName === 'DOCTOR' || roleName === 'ADMIN') {
    links.push({ name: 'Radiology PACS', to: '/radiology', icon: Bone });
  }
  if (roleName === 'NURSE' || roleName === 'ADMIN') {
    links.push({ name: 'Dietary Management', to: '/dietary', icon: UtensilsCrossed });
  }
  if (roleName === 'ADMIN' || roleName === 'DIRECTOR') {
    links.push({ name: 'Mortuary', to: '/mortuary', icon: Snowflake });
  }

  if (roleName === 'ADMIN') {
    links.push({ name: 'IT Admin Panel', to: '/admin', icon: ShieldCheck });
  }

  return (
    <aside className={twMerge(
      clsx(
        "bg-white border-r border-slate-200 flex flex-col shadow-sm fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )
    )}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <img src="/logo.jpg" alt="Logo" className="h-8 w-auto rounded-sm object-contain" />
          <span className="text-sm font-bold text-brand-700 tracking-tight leading-tight">
            Government House Clinic
          </span>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden p-2 -mr-2 text-slate-400 hover:text-slate-600 rounded-md"
        >
          <X className="h-5 w-5" />
        </button>
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
            onClick={() => setIsOpen(false)}
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
