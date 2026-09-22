import { useState } from 'react';
import { MousePointerClick, RefreshCcw } from 'lucide-react';

interface InteractiveBodyMapProps {
  onAreaSelect: (area: string) => void;
}

export default function InteractiveBodyMap({ onAreaSelect }: InteractiveBodyMapProps) {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [isFront, setIsFront] = useState(true);

  const handleSelect = (area: string) => {
    const updated = selectedAreas.includes(area)
      ? selectedAreas.filter(a => a !== area)
      : [...selectedAreas, area];
    
    setSelectedAreas(updated);
    onAreaSelect(area);
  };

  const clearSelection = () => {
    setSelectedAreas([]);
  };

  const getColor = (area: string) => selectedAreas.includes(area) ? '#ef4444' : '#e2e8f0';

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center">
      <div className="flex justify-between w-full items-center mb-4 border-b border-slate-100 pb-2">
        <h3 className="text-sm font-semibold text-slate-700 flex items-center">
          <MousePointerClick className="h-4 w-4 mr-2" /> Select Affected Area
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={() => setIsFront(!isFront)}
            className="text-xs px-2 py-1 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded"
          >
             {isFront ? 'View Back' : 'View Front'}
          </button>
          <button 
            onClick={clearSelection}
            className="text-xs px-2 py-1 border border-slate-200 text-slate-500 hover:bg-slate-50 rounded"
          >
             <RefreshCcw className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="relative w-48 h-[400px]">
        {/* Simple Abstract SVG Representation of a human body for demonstration */}
        <svg viewBox="0 0 100 250" className="w-full h-full drop-shadow-sm cursor-pointer select-none">
          {/* Head */}
          <circle cx="50" cy="20" r="15" fill={getColor('Head')} onClick={() => handleSelect('Head')} className="hover:opacity-80 transition-opacity" />
          
          {/* Neck */}
          <rect x="45" y="35" width="10" height="10" fill={getColor('Neck')} onClick={() => handleSelect('Neck')} className="hover:opacity-80 transition-opacity" />
          
          {/* Chest */}
          <path d="M30 45 Q 50 40 70 45 L 75 90 L 25 90 Z" fill={getColor('Chest')} onClick={() => handleSelect('Chest')} className="hover:opacity-80 transition-opacity" />
          
          {/* Abdomen */}
          <path d="M25 90 L 75 90 L 70 130 L 30 130 Z" fill={getColor('Abdomen')} onClick={() => handleSelect('Abdomen')} className="hover:opacity-80 transition-opacity" />
          
          {/* Left Arm (Viewer's left) */}
          <path d="M25 45 Q 10 50 15 100 L 25 100 Z" fill={getColor('Right Arm')} onClick={() => handleSelect('Right Arm')} className="hover:opacity-80 transition-opacity" />
          <path d="M15 100 Q 10 130 15 140 L 25 140 L 25 100 Z" fill={getColor('Right Forearm')} onClick={() => handleSelect('Right Forearm')} className="hover:opacity-80 transition-opacity" />
          
          {/* Right Arm (Viewer's right) */}
          <path d="M75 45 Q 90 50 85 100 L 75 100 Z" fill={getColor('Left Arm')} onClick={() => handleSelect('Left Arm')} className="hover:opacity-80 transition-opacity" />
          <path d="M85 100 Q 90 130 85 140 L 75 140 L 75 100 Z" fill={getColor('Left Forearm')} onClick={() => handleSelect('Left Forearm')} className="hover:opacity-80 transition-opacity" />

          {/* Left Leg */}
          <path d="M30 130 L 48 130 L 45 190 L 32 190 Z" fill={getColor('Right Thigh')} onClick={() => handleSelect('Right Thigh')} className="hover:opacity-80 transition-opacity" />
          <path d="M32 190 L 45 190 L 42 240 L 32 240 Z" fill={getColor('Right Calf')} onClick={() => handleSelect('Right Calf')} className="hover:opacity-80 transition-opacity" />

          {/* Right Leg */}
          <path d="M52 130 L 70 130 L 68 190 L 55 190 Z" fill={getColor('Left Thigh')} onClick={() => handleSelect('Left Thigh')} className="hover:opacity-80 transition-opacity" />
          <path d="M55 190 L 68 190 L 68 240 L 58 240 Z" fill={getColor('Left Calf')} onClick={() => handleSelect('Left Calf')} className="hover:opacity-80 transition-opacity" />
        </svg>

        <div className="absolute bottom-0 w-full text-center text-xs text-slate-400 font-medium tracking-widest mt-2 uppercase">
          {isFront ? 'Anterior' : 'Posterior'}
        </div>
      </div>
    </div>
  );
}
