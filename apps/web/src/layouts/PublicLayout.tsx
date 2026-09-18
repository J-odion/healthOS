import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function PublicLayout() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Column - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-brand-600 flex-col justify-center items-center px-12 relative overflow-hidden">
        {/* Very subtle background accent */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="bg-white p-4 rounded-2xl shadow-xl mb-8 border-b-4 border-custom-gold">
            <img 
              src="/logo.jpg" 
              alt="Government House Clinic Logo" 
              className="h-28 w-auto object-contain" 
            />
          </div>
          
          <h1 className="text-4xl font-bold text-white tracking-tight mb-3">
            Government House Clinic
          </h1>
          <p className="text-custom-gold font-semibold tracking-widest uppercase text-sm mb-6">
            Abia State
          </p>
          <p className="text-brand-100 max-w-sm text-lg font-medium leading-relaxed">
            Delivering accessible and comprehensive healthcare management.
          </p>
        </div>
      </div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center py-12 px-6 sm:px-10 bg-slate-50 lg:bg-white shadow-[-10px_0_20px_rgba(0,0,0,0.05)] z-10 relative">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="lg:hidden flex justify-center mb-6">
            <img 
              src="/logo.jpg" 
              alt="Government House Clinic Logo" 
              className="h-20 w-auto rounded-xl shadow-md border-b-2 border-custom-gold object-contain bg-white p-2" 
            />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500 mb-8">
            Please enter your credentials to access the portal.
          </p>
          
          <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 sm:rounded-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
