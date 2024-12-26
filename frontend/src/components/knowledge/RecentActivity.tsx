import React from 'react';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Activity {
  id: string;
  type: 'comment' | 'question' | 'solution';
  user: string;
  content: string;
  timestamp: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'comment',
    user: 'John Doe',
    content: 'Added a comment on "Sensor Calibration Guide"',
    timestamp: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'question',
    user: 'Alice Smith',
    content: 'Asked about ML model training frequency',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    type: 'solution',
    user: 'Bob Wilson',
    content: 'Provided solution for sensor connection issue',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Recent Activity</h2>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 space-y-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  <span className="font-medium">{activity.user}</span> {activity.content}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {format(new Date(activity.timestamp), 'PPp')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}