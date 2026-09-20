import { Users, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '../../lib/axios';
import { toast } from 'sonner';

export default function QueueBoard() {
  const [queue, setQueue] = useState<any[]>([]);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        // MOCK DATA
        const mockData = [
          {
            id: '1',
            patient: { firstName: 'John', lastName: 'Doe' },
            departmentId: 'Cardiology',
            priority: 'NORMAL',
            status: 'WAITING',
            createdAt: new Date().toISOString()
          },
          {
            id: '2',
            patient: { firstName: 'Jane', lastName: 'Smith' },
            departmentId: 'Neurology',
            priority: 'URGENT',
            status: 'IN_PROGRESS',
            createdAt: new Date(Date.now() - 3600000).toISOString()
          }
        ];
        
        setQueue(mockData.map((item: any) => ({
          id: item.id,
          patient: item.patient?.firstName + ' ' + item.patient?.lastName,
          department: item.departmentId, // Mock
          priority: item.priority,
          status: item.status,
          time: new Date(item.createdAt).toLocaleTimeString(),
        })));
      } catch (err) {
        console.error(err);
        toast.error('Failed to load queue data');
      }
    };
    fetchQueue();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Active Queue</h2>
        <div className="flex space-x-2">
          <span className="px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-sm font-medium">
            3 Waiting
          </span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Check-in Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {queue.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-slate-400 mr-3" />
                    <span className="font-medium text-slate-900">{item.patient}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.department}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.priority === 'URGENT' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {item.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{item.status}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 flex items-center">
                  <Clock className="h-4 w-4 mr-2" /> {item.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
