import { useState, useEffect } from 'react';
import { User, Shield, MapPin, Hash, Activity } from 'lucide-react';
import { toast } from 'sonner';

interface Demographics {
  id: string;
  name: string;
  age: number;
  address: string;
  cardNumber: string;
  insuranceStatus: 'ACTIVE' | 'EXPIRED' | 'NONE';
  lastActive: string;
  isActive: boolean;
}

export default function PatientDemographics() {
  const [patients, setPatients] = useState<Demographics[]>([]);

  useEffect(() => {
    // Mock Data
    const mockData: Demographics[] = [
      { id: '1', name: 'John Doe', age: 45, address: '123 Main St, NY', cardNumber: 'SH-1234', insuranceStatus: 'ACTIVE', lastActive: new Date().toISOString(), isActive: true },
      { id: '2', name: 'Emily Chen', age: 32, address: '456 Oak Ave, SF', cardNumber: 'PT-9942', insuranceStatus: 'NONE', lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), isActive: false },
      { id: '3', name: 'Michael Smith', age: 50, address: '789 Pine Rd, TX', cardNumber: 'SH-5678', insuranceStatus: 'EXPIRED', lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), isActive: false },
    ];
    
    // Automate file deactivation: Deactivate if inactive for > 2 days (48 hours)
    const processedData = mockData.map(patient => {
      const daysInactive = (Date.now() - new Date(patient.lastActive).getTime()) / (1000 * 60 * 60 * 24);
      if (daysInactive > 2 && patient.isActive) {
        toast.info(`Patient file for ${patient.name} automatically deactivated due to inactivity.`);
        return { ...patient, isActive: false };
      }
      return patient;
    });

    setPatients(processedData);
  }, []);

  const reactivateFile = (id: string) => {
    setPatients(patients.map(p => {
      if (p.id === id) {
        toast.success(`Patient file for ${p.name} re-activated successfully.`);
        return { ...p, isActive: true, lastActive: new Date().toISOString() };
      }
      return p;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Patient Demographics</h2>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Age & Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Card Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-slate-400 mr-3" />
                    <span className="font-medium text-slate-900">{patient.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <div className="flex flex-col">
                    <span>{patient.age} years</span>
                    <span className="flex items-center text-xs mt-1"><MapPin className="h-3 w-3 mr-1"/> {patient.address}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  <div className="flex flex-col">
                    <span className="flex items-center"><Hash className="h-3 w-3 mr-1"/> {patient.cardNumber}</span>
                    <span className="flex items-center mt-1">
                      <Shield className="h-3 w-3 mr-1"/> 
                      <span className={`px-2 inline-flex text-[10px] leading-4 font-semibold rounded-full ${patient.insuranceStatus === 'ACTIVE' ? 'bg-green-100 text-green-800' : patient.insuranceStatus === 'EXPIRED' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'}`}>
                        {patient.insuranceStatus}
                      </span>
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${patient.isActive ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'}`}>
                    {patient.isActive ? 'ACTIVE' : 'DEACTIVATED'}
                  </span>
                  {!patient.isActive && <p className="text-xs text-slate-400 mt-1">Inactive > 48h</p>}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {!patient.isActive ? (
                    <button onClick={() => reactivateFile(patient.id)} className="text-brand-600 hover:text-brand-900 flex items-center">
                      <Activity className="h-4 w-4 mr-1" /> Re-activate
                    </button>
                  ) : (
                    <span className="text-slate-400">Up to date</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
