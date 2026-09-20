import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function PatientRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'MALE',
    phone: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // MOCK DATA
      const mockRes = {
        data: {
          smartCardId: 'SC-' + Math.floor(Math.random() * 1000000)
        }
      };
      
      toast.success('Patient Registered Successfully! Smart Card: ' + mockRes.data.smartCardId);
      // Reset form
      setFormData({ firstName: '', lastName: '', dob: '', gender: 'MALE', phone: '' });
    } catch (err) {
      console.error(err);
      // Error is handled by global interceptor, but we can do specific logic here if needed
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-brand-600 px-6 py-4 flex items-center text-white">
        <UserPlus className="h-6 w-6 mr-3" />
        <h2 className="text-xl font-semibold">New Patient Registration</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">First Name</label>
            <input 
              type="text" 
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Last Name</label>
            <input 
              type="text" 
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2" 
              required 
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Date of Birth</label>
            <input 
              type="date" 
              value={formData.dob}
              onChange={(e) => setFormData({...formData, dob: e.target.value})}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2" 
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Gender</label>
            <select 
              value={formData.gender}
              onChange={(e) => setFormData({...formData, gender: e.target.value})}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2">
              <option>MALE</option>
              <option>FEMALE</option>
              <option>OTHER</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button 
            type="submit"
            className="px-6 py-2 bg-brand-600 text-white rounded-md hover:bg-brand-700 font-medium transition-colors shadow-sm"
          >
            Register & Generate Card
          </button>
        </div>
      </form>
    </div>
  );
}
