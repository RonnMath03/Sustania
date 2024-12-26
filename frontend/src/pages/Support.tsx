import React from 'react';
import { ArticleList } from '../components/knowledge/ArticleList';
import { Input } from '../components/Input';
import { Search } from 'lucide-react';

export function Support() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
        <div className="w-96">
          <Input
            placeholder="Search help articles..."
            className="!py-1.5"
            icon={<Search className="w-4 h-4 text-gray-400" />}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ArticleList />
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Need Help?</h2>
            <p className="text-gray-600 mb-4">
              Our support team is available 24/7 to help you with any questions or issues.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <strong>Email:</strong> support@sustania.com
              </p>
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> 1-800-SUSTANIA
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}