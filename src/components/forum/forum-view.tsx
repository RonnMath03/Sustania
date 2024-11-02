import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ForumPostList } from './forum-post-list';
import { CreatePostDialog } from './create-post-dialog';
import { MessageSquarePlus, Search } from 'lucide-react';
import type { ForumPost } from '@/lib/types';

const CATEGORIES = [
  { id: 'all', label: 'All Posts' },
  { id: 'crop-management', label: 'Crop Management' },
  { id: 'tech-support', label: 'Tech Support' },
  { id: 'market-prices', label: 'Market Prices' },
  { id: 'best-practices', label: 'Best Practices' },
];

// Mock data
const MOCK_POSTS: ForumPost[] = [
  {
    id: '1',
    title: 'Tips for optimizing irrigation schedules',
    content: "I have been experimenting with different irrigation schedules and found some interesting patterns. Would love to share my findings and hear about others' experiences.",
    category: 'best-practices',
    author: {
      id: '1',
      name: 'John Smith',
      reputation: 456,
    },
    likes: 24,
    replies: 12,
    views: 234,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Current market prices for organic wheat',
    content: "Looking for information about current market trends and pricing for organic wheat. Has anyone noticed significant changes in the past month?",
    category: 'market-prices',
    author: {
      id: '2',
      name: 'Sarah Johnson',
      reputation: 789,
    },
    likes: 15,
    replies: 8,
    views: 156,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
  },
];

export function ForumView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const filteredPosts = MOCK_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Community Forum</h2>
        <Button onClick={() => setIsCreatePostOpen(true)}>
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all" value={selectedCategory} onValueChange={setSelectedCategory}>
        <TabsList>
          {CATEGORIES.map((category) => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={selectedCategory}>
          <ForumPostList posts={filteredPosts} />
        </TabsContent>
      </Tabs>

      <CreatePostDialog 
        open={isCreatePostOpen} 
        onOpenChange={setIsCreatePostOpen}
      />
    </div>
  );
}