import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function PublicLayout() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen relative flex flex-col md:grid md:grid-cols-2 overflow-hidden bg-slate-50">
      {/* Left Column (Branding) */}
      <div className="relative flex flex-col justify-center items-center py-12 px-6 md:px-12 bg-custom-red text-white overflow-hidden min-h-[40vh] md:min-h-screen">
        {/* Decorative background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-red-900/40 to-red-800/10 blur-3xl" />
          <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-custom-gold/20 to-red-900/30 blur-3xl" />
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center">
          <img 
            src="/logo.jpg" 
            alt="Government House Clinic Logo" 
            className="h-28 w-auto rounded-2xl shadow-xl border-2 border-custom-gold/50 object-contain mb-8 bg-white" 
          />
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Government House Clinic
          </h1>
          <p className="text-custom-gold font-medium tracking-wide uppercase max-w-sm">
            Abia State • Healthcare Portal
          </p>
          <div className="mt-8 text-custom-gold/80 text-sm max-w-md hidden md:block">
            Providing comprehensive and accessible healthcare management solutions.
          </div>
        </div>
      </div>

      {/* Right Column (Form) */}
      <div className="flex flex-col justify-center py-12 px-6 lg:px-8 bg-white relative z-10 min-h-[60vh] md:min-h-screen shadow-2xl md:rounded-l-[2rem] border-l border-slate-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <h2 className="text-center text-2xl font-bold text-slate-900 tracking-tight">
            Sign In
          </h2>
          <p className="mt-2 text-center text-sm text-slate-500">
            Please enter your credentials to access the portal.
          </p>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
