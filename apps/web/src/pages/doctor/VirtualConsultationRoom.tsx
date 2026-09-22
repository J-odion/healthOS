import { useState } from 'react';
import { Activity, Stethoscope, FlaskConical, Pill, Save, CheckCircle, User, Video, Mic, MicOff, VideoOff, PhoneMissed } from 'lucide-react';
import { toast } from 'sonner';

export default function VirtualConsultationRoom() {
  const [note, setNote] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);

  const patient = {
    name: 'Emily Chen',
    age: 32,
    gender: 'Female',
    id: 'PT-9942',
    chiefComplaint: 'Follow up on persistent headache (Telemedicine)',
    vitals: { bp: '118/75', hr: '84', temp: '37.1', spo2: '99' } // Past vitals or self-reported
  };

  const handleFinish = () => {
    toast.success('Virtual consultation completed and saved to EMR.');
    setNote('');
  };

  const toggleVideo = () => setIsVideoOn(!isVideoOn);
  const toggleMic = () => setIsMicOn(!isMicOn);
  const endCall = () => toast('Call ended');

  return (
    <div className="flex h-full space-x-6">
      {/* Video Call Area */}
      <div className="w-1/3 flex flex-col space-y-4">
        <div className="bg-slate-900 flex-1 rounded-xl shadow-lg border border-slate-700 relative overflow-hidden flex flex-col">
          {/* Patient Video Placeholder */}
          <div className="flex-1 flex items-center justify-center text-slate-500">
             <User className="h-24 w-24 opacity-20" />
             <span className="absolute bottom-4 left-4 text-white text-sm bg-black/50 px-2 py-1 rounded">{patient.name}</span>
          </div>

          {/* Doctor Video Pip Placeholder */}
          <div className="absolute top-4 right-4 w-32 h-24 bg-slate-800 rounded-lg border border-slate-600 overflow-hidden flex items-center justify-center">
            {isVideoOn ? <User className="h-8 w-8 text-slate-500" /> : <VideoOff className="text-red-500" />}
            <span className="absolute bottom-1 left-2 text-xs text-white bg-black/50 px-1 rounded">You</span>
          </div>

          {/* Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-4">
            <button onClick={toggleMic} className={`p-3 rounded-full ${isMicOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-500 hover:bg-red-600'} text-white transition-colors`}>
              {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </button>
            <button onClick={toggleVideo} className={`p-3 rounded-full ${isVideoOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-500 hover:bg-red-600'} text-white transition-colors`}>
              {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
            </button>
            <button onClick={endCall} className="p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-colors">
              <PhoneMissed className="h-5 w-5" />
            </button>
          </div>
        </div>

         {/* Vitals Sidebar in Virtual Room */}
         <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
          <h3 className="font-semibold text-slate-800 flex items-center mb-4">
            <Activity className="mr-2 text-red-500 h-5 w-5" /> Last Known Vitals
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">BP</span>
              <span className="font-medium">{patient.vitals.bp} mmHg</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Pulse</span>
              <span className="font-medium">{patient.vitals.hr} bpm</span>
            </div>
            <div className="flex justify-between border-b border-slate-100 pb-2">
              <span className="text-slate-500">Temp</span>
              <span className={`font-medium ${parseFloat(patient.vitals.temp) > 37.5 ? 'text-red-600' : ''}`}>{patient.vitals.temp} °C</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main EMR Area */}
      <div className="flex-1 flex flex-col space-y-6">
        {/* Patient Context */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-start justify-between">
          <div className="flex items-center">
            <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Video className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">{patient.name}</h2>
              <p className="text-sm text-slate-500">{patient.age} yrs • {patient.gender} • ID: {patient.id}</p>
              <span className="inline-block mt-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">Telemedicine Visit</span>
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg max-w-xs">
            <p className="text-xs font-semibold text-orange-800 uppercase tracking-wider mb-1">Chief Complaint</p>
            <p className="text-sm text-orange-900">{patient.chiefComplaint}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex-1 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-slate-800 flex items-center">
              <Stethoscope className="mr-2 text-brand-600 h-5 w-5" /> Clinical Note
            </h2>
            <div className="flex space-x-2">
              <button className="text-sm px-3 py-1 bg-brand-50 text-brand-700 rounded-md hover:bg-brand-100 transition-colors flex items-center">
                <Save className="h-4 w-4 mr-1" /> Save Draft
              </button>
            </div>
          </div>
          <textarea 
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full flex-1 p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none min-h-[200px]"
            placeholder="Document patient history, symptoms, and examination findings here..."
          />
        </div>

        {/* Quick Orders in EMR */}
        <div className="flex space-x-4">
           <button className="flex-1 flex justify-center items-center p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-brand-300 transition-all text-slate-700 font-medium shadow-sm">
             <FlaskConical className="h-5 w-5 mr-3 text-purple-500" /> Order Lab Test
           </button>
           <button className="flex-1 flex justify-center items-center p-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-brand-300 transition-all text-slate-700 font-medium shadow-sm">
             <Pill className="h-5 w-5 mr-3 text-teal-500" /> Write Prescription
           </button>
        </div>

        <div className="flex justify-end pt-2">
          <button onClick={handleFinish} className="px-8 py-3 bg-green-600 text-white font-medium rounded-xl shadow-sm hover:bg-green-700 transition-colors flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" /> Finish Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
