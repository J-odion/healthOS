import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/axios';

export default function LoginForm() {
  const [username, setUsername] = useState('doctor');
  const [password, setPassword] = useState('Password@123!');
  const [useMfa, setUseMfa] = useState(false);
  const [mfaToken, setMfaToken] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { 
        username, 
        password, 
        mfaToken: useMfa ? mfaToken : undefined 
      });
      const { access_token, user } = response.data;
      setAuth(access_token, user);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-slate-700">Username</label>
        <input 
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-2 border" 
          required 
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-2 border" 
          required 
        />
      </div>
      <div className="flex items-center pt-2">
        <input
          id="use-mfa"
          type="checkbox"
          checked={useMfa}
          onChange={(e) => {
            setUseMfa(e.target.checked);
            if (!e.target.checked) setMfaToken('');
          }}
          className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-slate-300 rounded"
        />
        <label htmlFor="use-mfa" className="ml-2 block text-sm text-slate-700">
          I have an MFA token
        </label>
      </div>

      {useMfa && (
        <div className="animate-in fade-in slide-in-from-top-2 duration-200">
          <label className="block text-sm font-medium text-slate-700">MFA Token</label>
          <input 
            type="text" 
            value={mfaToken}
            onChange={(e) => setMfaToken(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm p-2 border" 
            placeholder="6-digit code"
            required={useMfa}
          />
        </div>
      )}
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}
