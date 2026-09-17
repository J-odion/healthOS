import { useAuthStore } from '../../store/authStore';
import { Bell, LogOut, User as UserIcon } from 'lucide-react';

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-10">
      <h1 className="text-lg font-semibold text-slate-800">
        {/* We can make this dynamic based on route later */}
        Overview
      </h1>
      
      <div className="flex items-center space-x-6">
        <button className="text-slate-400 hover:text-slate-600 transition-colors relative">
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-3 border-l border-slate-200 pl-6">
          <div className="flex flex-col text-right">
            <span className="text-sm font-medium text-slate-700">{user?.email}</span>
            <span className="text-xs font-medium text-brand-600 bg-brand-50 inline-block px-2 py-0.5 rounded-full mt-0.5">
              {user?.role}
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
            <UserIcon className="h-4 w-4 text-slate-500" />
          </div>
          <button 
            onClick={logout}
            className="ml-2 text-slate-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
