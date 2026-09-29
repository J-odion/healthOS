import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Video, User } from 'lucide-react';
import { toast } from 'sonner';
import { useHospitalStore } from '../../store/hospitalStore';
import { useAuthStore } from '../../store/authStore';

export default function BookAppointment() {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const patientId = user?.id || 'PT-9942';
  const bookAppointment = useHospitalStore(state => state.bookAppointment);
  const [type, setType] = useState<'IN_PERSON' | 'TELEMEDICINE'>('TELEMEDICINE');
  const [department, setDepartment] = useState('General Practice');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment(patientId, department, type, date, time, reason);
    toast.success('Appointment booked successfully!');
    navigate('/patient/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Book an Appointment</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">Appointment Type</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                onClick={() => setType('IN_PERSON')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${type === 'IN_PERSON' ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-brand-300'}`}
              >
                <User className={`h-6 w-6 mb-2 ${type === 'IN_PERSON' ? 'text-brand-600' : 'text-slate-400'}`} />
                <h4 className={`font-medium ${type === 'IN_PERSON' ? 'text-brand-900' : 'text-slate-700'}`}>In-Person Visit</h4>
                <p className="text-xs text-slate-500 mt-1">Visit the clinic physically</p>
              </div>
              <div 
                onClick={() => setType('TELEMEDICINE')}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${type === 'TELEMEDICINE' ? 'border-brand-600 bg-brand-50' : 'border-slate-200 hover:border-brand-300'}`}
              >
                <Video className={`h-6 w-6 mb-2 ${type === 'TELEMEDICINE' ? 'text-brand-600' : 'text-slate-400'}`} />
                <h4 className={`font-medium ${type === 'TELEMEDICINE' ? 'text-brand-900' : 'text-slate-700'}`}>Telemedicine</h4>
                <p className="text-xs text-slate-500 mt-1">Virtual consultation from home</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">Department</label>
            <select 
              value={department}
              onChange={e => setDepartment(e.target.value)}
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none bg-white"
            >
              <option value="General Practice">General Practice</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Maternity & ANC">Maternity & ANC</option>
              <option value="Orthopedics">Orthopedics</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Select Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input 
                  type="date" 
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Select Time</label>
              <select 
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none"
              >
                <option value="">Choose a time slot...</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="14:00">02:00 PM</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Reason for Visit (Optional)</label>
            <textarea 
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 outline-none resize-none h-24"
              placeholder="Briefly describe your symptoms..."
            />
          </div>

          <div className="pt-4 flex justify-end space-x-4 border-t border-slate-100">
            <button 
              type="button"
              onClick={() => navigate('/patient/dashboard')}
              className="px-6 py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-8 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 transition-colors shadow-sm"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
