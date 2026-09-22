import { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize, Brain, ChevronLeft, ChevronRight, Activity, Bone, Focus } from 'lucide-react';

export default function RadiologyViewer() {
  const [aiEnabled, setAiEnabled] = useState(false);

  return (
    <div className="bg-slate-950 h-[calc(100vh-80px)] -m-4 md:-m-6 flex flex-col text-slate-300">
      {/* Top Toolbar */}
      <div className="h-14 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-4 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="bg-brand-600 text-white p-1.5 rounded">
            <Bone className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm tracking-wide">XR Chest AP/PA</h2>
            <p className="text-xs text-slate-400">Emily Chen (PT-9942) • Oct 22, 2026</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-slate-800 rounded transition-colors" title="Zoom Out"><ZoomOut className="h-4 w-4" /></button>
          <button className="p-2 hover:bg-slate-800 rounded transition-colors" title="Zoom In"><ZoomIn className="h-4 w-4" /></button>
          <div className="w-px h-6 bg-slate-700 mx-2"></div>
          <button className="p-2 hover:bg-slate-800 rounded transition-colors" title="Window Level"><Focus className="h-4 w-4" /></button>
          <button className="p-2 hover:bg-slate-800 rounded transition-colors" title="Fullscreen"><Maximize className="h-4 w-4" /></button>
        </div>

        <div>
           <button 
             onClick={() => setAiEnabled(!aiEnabled)}
             className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center transition-all ${
               aiEnabled ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.5)]' : 'bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700'
             }`}
           >
             <Brain className="h-3 w-3 mr-2" /> AI Analysis {aiEnabled ? 'ON' : 'OFF'}
           </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Thumbnails Sidebar */}
        <div className="w-32 bg-slate-900 border-r border-slate-800 p-2 flex flex-col space-y-2 shrink-0">
          <div className="aspect-square bg-slate-800 border-2 border-brand-500 rounded cursor-pointer relative overflow-hidden group">
             <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-[10px]">AP View</div>
          </div>
          <div className="aspect-square bg-slate-800 border border-slate-700 hover:border-slate-500 rounded cursor-pointer transition-colors relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-[10px]">PA View</div>
          </div>
          <div className="aspect-square bg-slate-800 border border-slate-700 hover:border-slate-500 rounded cursor-pointer transition-colors relative overflow-hidden">
             <div className="absolute inset-0 flex items-center justify-center text-slate-600 text-[10px]">Lateral</div>
          </div>
        </div>

        {/* Main Viewer */}
        <div className="flex-1 relative flex items-center justify-center bg-black overflow-hidden">
          {/* Mock X-Ray Background - using repeating gradients to simulate rib cage structure */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen"
               style={{
                 background: 'repeating-radial-gradient(ellipse at center, transparent 0, #111 2px, transparent 10px), radial-gradient(circle at 50% 40%, #555 0%, transparent 60%)'
               }}
          ></div>
          
          <div className="relative w-full max-w-2xl aspect-[3/4] border border-slate-800 shadow-2xl">
            {/* The Image itself (Mocked with CSS) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-600 via-slate-900 to-black">
              {/* Spine mock */}
              <div className="absolute left-1/2 top-[10%] bottom-[10%] w-8 -translate-x-1/2 bg-white/20 blur-sm"></div>
              {/* Lung mocks */}
              <div className="absolute left-[20%] right-[55%] top-[20%] bottom-[25%] bg-black/80 blur-md rounded-[100%]"></div>
              <div className="absolute right-[20%] left-[55%] top-[20%] bottom-[25%] bg-black/80 blur-md rounded-[100%]"></div>
            </div>

            {/* AI Overlay */}
            {aiEnabled && (
              <div className="absolute inset-0 z-10">
                 {/* Bounding Box 1 */}
                 <div className="absolute top-[35%] left-[25%] w-16 h-16 border-2 border-purple-500 border-dashed animate-pulse">
                   <div className="absolute -top-6 left-0 bg-purple-900 text-purple-200 text-[10px] px-1 py-0.5 rounded flex items-center whitespace-nowrap">
                     <Activity className="h-3 w-3 mr-1" /> Opacity detected (89%)
                   </div>
                 </div>

                 {/* Bounding Box 2 */}
                 <div className="absolute top-[60%] right-[30%] w-12 h-12 border-2 border-orange-500 border-dashed animate-pulse">
                    <div className="absolute -bottom-6 left-0 bg-orange-900 text-orange-200 text-[10px] px-1 py-0.5 rounded whitespace-nowrap">
                      Possible minor fracture (62%)
                    </div>
                 </div>
              </div>
            )}

            {/* On-Screen Display (OSD) info */}
            <div className="absolute top-4 left-4 text-slate-400 font-mono text-xs space-y-1">
              <p>Emily Chen</p>
              <p>PT-9942</p>
              <p>DOB: 1994-05-12</p>
            </div>
            <div className="absolute top-4 right-4 text-slate-400 font-mono text-xs text-right space-y-1">
              <p>Serene Health</p>
              <p>XR Chest</p>
              <p>2026-10-22 14:30</p>
            </div>
            <div className="absolute bottom-4 left-4 text-slate-400 font-mono text-xs space-y-1">
              <p>WL: 2048 WW: 4096</p>
              <p>Zoom: 100%</p>
            </div>
          </div>
          
          <button className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-brand-600 transition-colors">
             <ChevronLeft className="h-6 w-6" />
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 text-white rounded-full hover:bg-brand-600 transition-colors">
             <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* AI Report Sidebar */}
        {aiEnabled && (
          <div className="w-80 bg-slate-900 border-l border-slate-800 p-4 shrink-0 flex flex-col animate-in slide-in-from-right-8">
            <h3 className="text-white font-bold mb-4 flex items-center border-b border-slate-800 pb-2">
              <Brain className="h-4 w-4 mr-2 text-purple-400" /> AI Findings Report
            </h3>
            <div className="space-y-4 flex-1 overflow-y-auto">
              <div className="bg-purple-900/30 border border-purple-500/50 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-purple-300 font-bold text-sm">Right Lung Base</span>
                  <span className="bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">89%</span>
                </div>
                <p className="text-slate-400 text-xs mt-1">Area of increased opacity detected. Correlate clinically for consolidation or effusion.</p>
              </div>

              <div className="bg-orange-900/30 border border-orange-500/50 p-3 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-orange-300 font-bold text-sm">Left 6th Rib</span>
                  <span className="bg-orange-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">62%</span>
                </div>
                <p className="text-slate-400 text-xs mt-1">Cortical irregularity noted. Possible undisplaced hairline fracture. Recommend clinical correlation.</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-800">
               <button className="w-full py-2 bg-brand-600 hover:bg-brand-700 text-white rounded font-medium text-sm transition-colors">
                 Append to Radiology Report
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
