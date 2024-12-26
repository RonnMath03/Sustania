import React from 'react';
import { TrendingUp } from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  views: number;
}

const topics: Topic[] = [
  {
    id: '1',
    title: 'ML Model Accuracy Optimization',
    views: 1250,
  },
  {
    id: '2',
    title: 'Sensor Calibration Guide',
    views: 980,
  },
  {
    id: '3',
    title: 'Water Conservation Tips',
    views: 856,
  },
  {
    id: '4',
    title: 'Zone Setup Best Practices',
    views: 742,
  },
];

export function PopularTopics() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-gray-400" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Popular Topics</h2>
        </div>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {topic.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {topic.views.toLocaleString()} views
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}