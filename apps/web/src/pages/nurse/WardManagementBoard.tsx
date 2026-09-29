import { useState } from 'react';
import { Bed, User, Activity, CheckCircle, Pill, AlertCircle, Crown, Skull } from 'lucide-react';
import { toast } from 'sonner';

type BedStatus = 'OCCUPIED' | 'AVAILABLE' | 'CLEANING';

interface WardBed {
  id: string;
  number: number;
  status: BedStatus;
  patientName?: string;
  admissionDate?: string;
  attending?: string;
  isVIP?: boolean;
}

export default function WardManagementBoard() {
  const [selectedBed, setSelectedBed] = useState<WardBed | null>(null);

  // Generate 15 beds
  const beds: WardBed[] = Array.from({ length: 15 }).map((_, i) => {
    const isOccupied = [1, 3, 4, 7, 8, 12, 14].includes(i + 1);
    const isCleaning = [5].includes(i + 1);
    const isVIP = [14, 15].includes(i + 1);
    
    return {
      id: `bed-${i + 1}`,
      number: i + 1,
      status: isOccupied ? 'OCCUPIED' : (isCleaning ? 'CLEANING' : 'AVAILABLE'),
      patientName: isOccupied ? `Patient ${i + 1} Doe` : undefined,
      admissionDate: isOccupied ? 'Oct 20, 2026' : undefined,
      attending: isOccupied ? 'Dr. Smith' : undefined,
      isVIP
    };
  });

  const getStatusColor = (status: BedStatus, isVIP?: boolean) => {
    if (isVIP) {
       switch (status) {
         case 'OCCUPIED': return 'bg-gradient-to-br from-yellow-100 to-yellow-50 border-yellow-400 text-yellow-900';
         case 'CLEANING': return 'bg-orange-100 border-yellow-400 text-orange-900';
         case 'AVAILABLE': return 'bg-gradient-to-br from-yellow-50 to-white border-yellow-300 text-yellow-800';
       }
    }
    switch (status) {
      case 'OCCUPIED': return 'bg-brand-100 border-brand-300 text-brand-800';
      case 'CLEANING': return 'bg-orange-100 border-orange-300 text-orange-800';
      case 'AVAILABLE': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
    }
  };

  const handleAdministerMeds = () => {
    toast.success('Medication administered and logged to MAR.');
  };

  const handleRecordVitals = () => {
    toast.success('New vitals recorded successfully.');
  };

  const handleRecordDeath = () => {
    if (confirm(`Are you sure you want to declare ${selectedBed?.patientName} deceased?`)) {
      const time = new Date().toLocaleTimeString();
      toast.error(`Time of death recorded at ${time} by Dr. Smith. Bed marked for cleaning.`);
      setSelectedBed(null);
    }
  };

  return (
    <div className="h-full flex space-x-6">
      <div className="flex-1 flex flex-col space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Inpatient Ward Management</h2>
            <p className="text-slate-500">15-Bed Capacity Overview</p>
          </div>
          <div className="flex space-x-4 text-sm">
            <span className="flex items-center"><Crown className="w-4 h-4 text-yellow-500 mr-1" /> VIP (2)</span>
            <span className="flex items-center"><div className="w-3 h-3 rounded-full bg-brand-500 mr-2" /> Occupied (7)</span>
            <span className="flex items-center"><div className="w-3 h-3 rounded-full bg-emerald-500 mr-2" /> Available (7)</span>
            <span className="flex items-center"><div className="w-3 h-3 rounded-full bg-orange-500 mr-2" /> Cleaning (1)</span>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-xl shadow-inner border border-slate-200 flex-1 overflow-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {beds.map((bed) => (
              <div 
                key={bed.id}
                onClick={() => setSelectedBed(bed)}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${getStatusColor(bed.status, bed.isVIP)} ${selectedBed?.id === bed.id ? 'ring-2 ring-brand-500 ring-offset-2' : 'hover:shadow-md'} ${bed.isVIP ? 'shadow-[0_0_15px_rgba(234,179,8,0.25)]' : ''}`}
              >
                {bed.isVIP && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-sm flex items-center border border-yellow-200 animate-in zoom-in">
                    <Crown className="w-3 h-3 mr-1" /> VIP
                  </div>
                )}
                <div className="flex justify-between items-start mb-3">
                  <span className="font-bold text-lg opacity-80">#{bed.number}</span>
                  <Bed className={`h-5 w-5 ${bed.isVIP ? 'text-yellow-600' : 'opacity-70'}`} />
                </div>
                {bed.status === 'OCCUPIED' ? (
                  <div className="space-y-1">
                    <p className="font-semibold truncate">{bed.patientName}</p>
                    <p className="text-xs opacity-80">Admitted: {bed.admissionDate}</p>
                  </div>
                ) : (
                  <div className="h-10 flex items-center justify-center">
                    <span className="text-sm font-medium opacity-70 uppercase tracking-wider">{bed.status}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAR / Bed Details Sidebar */}
      {selectedBed && selectedBed.status === 'OCCUPIED' && (
        <div className="w-96 bg-white border border-slate-200 rounded-xl shadow-lg flex flex-col overflow-hidden animate-in slide-in-from-right-8">
          <div className="bg-brand-600 p-6 text-white">
            <div className="flex items-center space-x-4 mb-4">
              <div className="h-12 w-12 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{selectedBed.patientName}</h3>
                <p className="text-brand-100">Bed #{selectedBed.number} • {selectedBed.attending}</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex-1 overflow-auto space-y-6">
            <div>
              <h4 className="font-semibold text-slate-800 flex items-center mb-4 border-b border-slate-100 pb-2">
                <Pill className="mr-2 h-5 w-5 text-purple-600" /> Medication Administration (MAR)
              </h4>
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-slate-800">Ceftriaxone 1g IV</p>
                      <p className="text-xs text-slate-500">Every 12 hours</p>
                    </div>
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" /> DUE NOW
                    </span>
                  </div>
                  <button onClick={handleAdministerMeds} className="w-full mt-3 py-2 bg-brand-100 text-brand-700 font-medium rounded hover:bg-brand-200 transition-colors">
                    Confirm Administration
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 opacity-60">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-slate-800">Paracetamol 1g PO</p>
                      <p className="text-xs text-slate-500">Every 8 hours</p>
                    </div>
                    <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" /> GIVEN 08:00 AM
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-800 flex items-center mb-4 border-b border-slate-100 pb-2">
                <Activity className="mr-2 h-5 w-5 text-red-500" /> Latest Vitals
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                  <p className="text-slate-500 mb-1">BP</p>
                  <p className="font-bold text-slate-800">120/80</p>
                </div>
                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                  <p className="text-slate-500 mb-1">Temp</p>
                  <p className="font-bold text-slate-800">36.8 °C</p>
                </div>
              </div>
              <button onClick={handleRecordVitals} className="w-full mt-4 py-2 border border-slate-200 text-slate-600 font-medium rounded hover:bg-slate-50 transition-colors">
                Record New Vitals
              </button>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <button 
                onClick={handleRecordDeath}
                className="w-full flex items-center justify-center py-2 bg-red-50 text-red-700 font-medium rounded hover:bg-red-100 border border-red-200 transition-colors"
              >
                <Skull className="h-4 w-4 mr-2" /> Record Pronouncement of Death
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
