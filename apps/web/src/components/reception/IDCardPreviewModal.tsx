import { X, Printer, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface IDCardPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientData: {
    hospitalNumber: string;
    firstName: string;
    lastName: string;
    bloodGroup: string;
    uid?: string;
  } | null;
}

export default function IDCardPreviewModal({ isOpen, onClose, patientData }: IDCardPreviewModalProps) {
  if (!isOpen || !patientData) return null;

  const handlePrint = () => {
    toast.success('Sending print job to ID Card Printer...');
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
        <div className="flex justify-between items-center p-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-800 flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-brand-600" /> Smart ID Card Preview
          </h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-8 bg-slate-50 flex justify-center items-center">
          {/* Card Representation */}
          <div className="w-[330px] h-[210px] bg-white rounded-xl shadow-md border border-slate-200 relative overflow-hidden flex">
            {/* Left Edge Color */}
            <div className="w-4 bg-brand-600 h-full" />
            
            <div className="flex-1 p-4 flex flex-col justify-between">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-tight">Serene Health</h4>
                  <p className="text-[10px] text-slate-500 uppercase">Specialist Hospital</p>
                </div>
                {/* QR Code Placeholder */}
                <div className="w-12 h-12 bg-slate-100 border border-slate-300 p-1 rounded-md">
                   <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=example" alt="QR" className="w-full h-full opacity-50 grayscale" />
                </div>
              </div>

              {/* Body */}
              <div className="flex space-x-3 items-end">
                {/* Photo Placeholder */}
                <div className="w-20 h-24 bg-slate-200 rounded border border-slate-300 flex items-center justify-center">
                  <span className="text-xs text-slate-400 text-center px-1">Photo<br/>Captured</span>
                </div>
                
                {/* Details */}
                <div className="flex-1 pb-1">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Patient Name</p>
                  <p className="font-bold text-slate-800 text-sm">{patientData.lastName.toUpperCase()}, {patientData.firstName}</p>
                  
                  <div className="flex justify-between mt-3">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">Hospital No.</p>
                      <p className="font-mono text-xs font-semibold text-slate-700">{patientData.hospitalNumber}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5 text-right">Blood Grp</p>
                      <p className="font-bold text-red-600 text-xs text-right">{patientData.bloodGroup || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer / NFC Tag Indicator */}
              <div className="absolute bottom-2 right-2 flex items-center space-x-1 text-slate-300">
                 <span className="text-[8px] font-mono">NFC/RFID ENABLED</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex justify-between items-center bg-slate-50">
           <div className="text-xs text-slate-500 font-mono">
             UID: {patientData.uid || 'Pending Assignment'}
           </div>
          <button onClick={handlePrint} className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white font-medium rounded-lg shadow-sm flex items-center text-sm transition-colors">
            <Printer className="h-4 w-4 mr-2" /> Print ID Card
          </button>
        </div>
      </div>
    </div>
  );
}
