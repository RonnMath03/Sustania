import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Eye } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';

const categories = [
  'All Posts',
  'Crop Management',
  'Tech Support',
  'Market Prices',
  'Best Practices'
];

const mockPosts = [
  {
    id: '1',
    title: 'Tips for optimizing irrigation schedules',
    content: 'I have been experimenting with different irrigation schedules...',
    author: {
      name: 'John Smith',
      reputation: 456,
      avatar: 'JS'
    },
    category: 'Best Practices',
    timestamp: '10 months ago',
    likes: 24,
    comments: 12,
    views: 234,
    tags: ['irrigation', 'optimization']
  },
  {
    id: '2',
    title: 'Current market prices for organic wheat',
    content: 'Looking for information about current market trends...',
    author: {
      name: 'Sarah Johnson',
      reputation: 789,
      avatar: 'SJ'
    },
    category: 'Market Prices',
    timestamp: '2 days ago',
    likes: 15,
    comments: 8,
    views: 156,
    tags: ['market', 'wheat']
  }
];

export function Forum() {
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = mockPosts.filter(post => {
    if (selectedCategory !== 'All Posts' && post.category !== selectedCategory) {
      return false;
    }
    if (searchQuery) {
      return post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             post.content.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Community Forum</h1>
        <Button>
          <MessageSquare className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                    {post.author.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{post.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Posted by {post.author.name}</span>
                      <span>•</span>
                      <span>{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-gray-600">{post.content}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-500">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <MessageSquare className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}