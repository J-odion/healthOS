import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Eye, EyeOff, Activity } from 'lucide-react';

export default function PatientLoginForm() {
  const [patientId, setPatientId] = useState('PT-9942');
  const [password, setPassword] = useState('Password@123!');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // MOCK DATA for Patient Login
      const access_token = 'mock_patient_token_123';
      const user = {
        id: patientId,
        email: `${patientId}@patient.hospios.local`,
        role: 'PATIENT',
        permissions: ['patient_access']
      };
      setAuth(access_token, user);
      navigate('/patient/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
           <div className="bg-brand-600 p-3 rounded-xl shadow-lg">
             <Activity className="h-10 w-10 text-white" />
           </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">Patient Portal Login</h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Sign in to access your medical records and appointments
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700">Patient ID</label>
              <input 
                type="text" 
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-3 border" 
                required 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Password</label>
              <div className="relative mt-1">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-3 border pr-10" 
                  required 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Signing in...' : 'Access My Portal'}
            </button>
            
            <div className="text-center mt-4">
              <button 
                type="button" 
                onClick={() => navigate('/login')}
                className="text-sm font-medium text-brand-600 hover:text-brand-500"
              >
                Are you a staff member? Staff Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
