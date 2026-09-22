import { useState } from 'react';
import { UserPlus, Camera, CreditCard } from 'lucide-react';
import { toast } from 'sonner';
import IDCardPreviewModal from '../../components/reception/IDCardPreviewModal';

export default function PatientRegistration() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'MALE',
    phone: '',
    bloodGroup: '',
    uid: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [registeredData, setRegisteredData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const smartCardId = 'SHSH-' + Math.floor(1000 + Math.random() * 9000);
      
      setRegisteredData({
        firstName: formData.firstName,
        lastName: formData.lastName,
        hospitalNumber: smartCardId,
        bloodGroup: formData.bloodGroup,
        uid: formData.uid
      });
      setShowModal(true);
      toast.success('Patient Registered Successfully!');
      
      // Reset form
      setFormData({ firstName: '', lastName: '', dob: '', gender: 'MALE', phone: '', bloodGroup: '', uid: '' });
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

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Blood Group</label>
            <select 
              value={formData.bloodGroup}
              onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
              className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2">
              <option value="">Select...</option>
              <option>A+</option>
              <option>O+</option>
              <option>B+</option>
              <option>AB+</option>
              <option>O-</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Scan Smart Card UID (NFC/Barcode)</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Scan or type UID..."
                value={formData.uid}
                onChange={(e) => setFormData({...formData, uid: e.target.value})}
                className="mt-1 block w-full pl-10 rounded-md border-slate-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 border p-2" 
              />
            </div>
          </div>
        </div>

        {/* Photo Capture Mock */}
        <div className="border border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-50">
           <Camera className="h-8 w-8 text-slate-400 mb-2" />
           <p className="text-sm font-medium text-slate-700">Capture Patient Photo</p>
           <button type="button" className="mt-3 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded text-sm hover:bg-slate-100">
             Open Webcam
           </button>
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

      <IDCardPreviewModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        patientData={registeredData} 
      />
    </div>
  );
}
