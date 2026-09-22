import { useState } from 'react';
import { Bell, MessageSquare, AlertCircle, CalendarClock, Beaker } from 'lucide-react';

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [unread, setUnread] = useState(3);

  const notifications = [
    { id: 1, type: 'critical', title: 'Critical Lab Result', message: 'Emily Chen (PT-9942) CBC results are ready. High WBC count.', time: '2 mins ago', icon: Beaker },
    { id: 2, type: 'alert', title: 'Inventory Alert', message: 'Ceftriaxone 1g Injection is below reorder level (45 left).', time: '1 hour ago', icon: AlertCircle },
    { id: 3, type: 'system', title: 'Automated SMS Sent', message: 'Reminder sent to 14 patients for tomorrow\'s appointments.', time: '2 hours ago', icon: MessageSquare },
    { id: 4, type: 'info', title: 'Shift Change', message: 'Night shift roster has been finalized.', time: '4 hours ago', icon: CalendarClock },
  ];

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen) setUnread(0);
  };

  return (
    <div className="relative">
      <button 
        onClick={handleOpen}
        className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors relative"
      >
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-semibold text-slate-800">Notifications</h3>
              <button className="text-xs text-brand-600 hover:text-brand-800 font-medium">Mark all as read</button>
            </div>
            
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map((notif) => (
                <div key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex items-start">
                  <div className={`p-2 rounded-lg mr-3 flex-shrink-0 ${
                    notif.type === 'critical' ? 'bg-red-100 text-red-600' :
                    notif.type === 'alert' ? 'bg-orange-100 text-orange-600' :
                    notif.type === 'system' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <notif.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{notif.title}</p>
                    <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{notif.message}</p>
                    <p className="text-[10px] text-slate-400 mt-1 font-medium">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t border-slate-100 text-center bg-slate-50">
              <button className="text-sm font-medium text-slate-600 hover:text-brand-600 transition-colors">
                View All Activity
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
