import { useState, useEffect } from 'react';
import { Video, Activity, CheckCircle, Clock } from 'lucide-react';

export default function VirtualWaitingRoom() {
  const [status, setStatus] = useState('waiting'); // waiting, connecting, active

  useEffect(() => {
    // Simulate doctor admitting patient
    const timer = setTimeout(() => {
      setStatus('connecting');
      setTimeout(() => setStatus('active'), 2000);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 flex flex-col items-center justify-center min-h-[80vh]">
      {status === 'waiting' && (
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Clock className="h-10 w-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Virtual Waiting Room</h2>
          <p className="text-slate-600 max-w-md mx-auto">
            Please wait here. Dr. Smith has been notified and will admit you to the consultation shortly.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-8 text-left">
            <h4 className="font-medium text-slate-800 mb-2 flex items-center">
              <Activity className="h-4 w-4 mr-2 text-brand-600" /> Pre-consultation Checklist
            </h4>
            <ul className="text-sm text-slate-600 space-y-2">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Camera access granted</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Microphone access granted</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Good internet connection</li>
            </ul>
          </div>
        </div>
      )}

      {status === 'connecting' && (
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mx-auto"></div>
          <h2 className="text-xl font-semibold text-slate-800">Connecting to Dr. Smith...</h2>
        </div>
      )}

      {status === 'active' && (
        <div className="w-full h-[70vh] bg-slate-900 rounded-2xl shadow-xl border border-slate-800 relative overflow-hidden flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center text-slate-500">
            <Video className="h-24 w-24 opacity-20" />
            <span className="absolute bottom-4 left-4 text-white font-medium bg-black/50 px-3 py-1 rounded-lg">Dr. Smith</span>
          </div>
          <div className="absolute top-4 right-4 w-48 h-32 bg-slate-800 rounded-xl border border-slate-600 flex items-center justify-center">
            <span className="text-slate-400 text-sm">Your Camera</span>
          </div>
          <div className="p-4 bg-slate-800/80 backdrop-blur-sm flex justify-center space-x-4">
            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-colors">
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
