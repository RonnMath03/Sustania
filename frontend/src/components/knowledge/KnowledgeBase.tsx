import React from 'react';
import { Search, Book, HelpCircle, Lightbulb, Clock } from 'lucide-react';
import { Input } from '../Input';
import { ArticleList } from './ArticleList';
import { PopularTopics } from './PopularTopics';
import { RecentActivity } from './RecentActivity';

export function KnowledgeBase() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Knowledge Base</h1>
        <div className="w-96">
          <Input
            placeholder="Search articles..."
            className="!py-1.5"
            icon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <CategoryCard
              icon={<Book className="w-5 h-5" />}
              title="Documentation"
              count={24}
              color="blue"
            />
            <CategoryCard
              icon={<HelpCircle className="w-5 h-5" />}
              title="Troubleshooting"
              count={18}
              color="red"
            />
            <CategoryCard
              icon={<Lightbulb className="w-5 h-5" />}
              title="Best Practices"
              count={15}
              color="green"
            />
          </div>

          <ArticleList />
        </div>

        <div className="space-y-6">
          <PopularTopics />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

interface CategoryCardProps {
  icon: React.ReactNode;
  title: string;
  count: number;
  color: 'blue' | 'red' | 'green';
}

function CategoryCard({ icon, title, count, color }: CategoryCardProps) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{count} articles</p>
        </div>
      </div>
    </div>
  );
}