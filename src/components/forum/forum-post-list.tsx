import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, ThumbsUp, Eye } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { ForumPost } from '@/lib/types';

interface ForumPostListProps {
  posts: ForumPost[];
}

export function ForumPostList({ posts }: ForumPostListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No posts found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="cursor-pointer hover:bg-accent/50 transition-colors">
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl hover:text-primary">
                  {post.title}
                </CardTitle>
                <CardDescription>
                  Posted by{' '}
                  <span className="font-medium text-foreground">
                    {post.author.name}
                  </span>{' '}
                  • {formatDistanceToNow(post.createdAt)} ago
                </CardDescription>
              </div>
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  {post.author.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent>
            <p className="line-clamp-2 text-muted-foreground mb-4">
              {post.content}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-sm text-muted-foreground">
                  Reputation: {post.author.reputation}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span className="text-sm">{post.replies}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">{post.views}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}