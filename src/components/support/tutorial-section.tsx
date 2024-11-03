import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Clock, BookOpen } from 'lucide-react';

const tutorials = [
  {
    category: 'Getting Started',
    items: [
      {
        title: 'Platform Overview',
        duration: '5:30',
        level: 'Beginner',
        description: 'Learn the basics of navigating the Sustania platform.',
      },
      {
        title: 'Setting Up Your Farm',
        duration: '8:45',
        level: 'Beginner',
        description: 'Configure your farm profile and initial settings.',
      },
    ],
  },
  {
    category: 'Irrigation Management',
    items: [
      {
        title: 'Zone Configuration',
        duration: '12:20',
        level: 'Intermediate',
        description: 'Learn how to set up and manage irrigation zones.',
      },
      {
        title: 'Schedule Creation',
        duration: '10:15',
        level: 'Intermediate',
        description: 'Create and optimize irrigation schedules.',
      },
    ],
  },
  {
    category: 'Analytics & Reporting',
    items: [
      {
        title: 'Understanding Reports',
        duration: '15:00',
        level: 'Advanced',
        description: 'Deep dive into analytics and reporting features.',
      },
      {
        title: 'Data Export Guide',
        duration: '7:30',
        level: 'Intermediate',
        description: 'Learn how to export and analyze your farm data.',
      },
    ],
  },
];

export function TutorialSection() {
  return (
    <div className="space-y-6">
      {tutorials.map((category) => (
        <Card key={category.category}>
          <CardHeader>
            <CardTitle>{category.category}</CardTitle>
            <CardDescription>
              {category.items.length} video tutorials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {category.items.map((tutorial) => (
                  <Card key={tutorial.title}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-semibold">{tutorial.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {tutorial.description}
                          </p>
                          <div className="flex items-center space-x-2 text-sm">
                            <div className="flex items-center">
                              <Clock className="mr-1 h-4 w-4" />
                              {tutorial.duration}
                            </div>
                            <Badge variant="secondary">
                              {tutorial.level}
                            </Badge>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Play className="mr-2 h-4 w-4" />
                          Watch
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}