import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Understanding Soil Moisture Readings',
    excerpt: 'Learn how to interpret soil moisture sensor readings and optimize irrigation schedules.',
    category: 'Documentation',
    readTime: 5,
  },
  {
    id: '2',
    title: 'Troubleshooting Sensor Connection Issues',
    excerpt: 'Common problems with sensor connectivity and how to resolve them quickly.',
    category: 'Troubleshooting',
    readTime: 8,
  },
  {
    id: '3',
    title: 'Best Practices for Zone Management',
    excerpt: 'Optimize your irrigation zones for maximum efficiency and plant health.',
    category: 'Best Practices',
    readTime: 6,
  },
];

export function ArticleList() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Latest Articles</h2>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {articles.map((article) => (
          <article
            key={article.id}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h3 className="text-base font-medium text-gray-900 dark:text-gray-100">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    {article.category}
                  </span>
                  <span>{article.readTime} min read</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}