import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Book, Search, Droplet, Leaf, Cloud, Settings, AlertTriangle } from 'lucide-react';

const articles = [
  {
    category: 'Getting Started',
    icon: Book,
    items: [
      { title: 'Quick Start Guide', views: 1234 },
      { title: 'System Requirements', views: 890 },
      { title: 'Basic Navigation', views: 756 },
    ],
  },
  {
    category: 'Irrigation Control',
    icon: Droplet,
    items: [
      { title: 'Setting Up Zones', views: 2345 },
      { title: 'Scheduling Basics', views: 1890 },
      { title: 'Moisture Sensors', views: 1456 },
    ],
  },
  {
    category: 'Crop Management',
    icon: Leaf,
    items: [
      { title: 'Crop Monitoring', views: 1567 },
      { title: 'Growth Stages', views: 1234 },
      { title: 'Pest Control', views: 987 },
    ],
  },
  {
    category: 'Weather Integration',
    icon: Cloud,
    items: [
      { title: 'Weather Alerts', views: 876 },
      { title: 'Forecast Usage', views: 654 },
      { title: 'Historical Data', views: 543 },
    ],
  },
  {
    category: 'System Settings',
    icon: Settings,
    items: [
      { title: 'Account Management', views: 432 },
      { title: 'Notifications Setup', views: 321 },
      { title: 'Data Export', views: 234 },
    ],
  },
  {
    category: 'Troubleshooting',
    icon: AlertTriangle,
    items: [
      { title: 'Common Issues', views: 2143 },
      { title: 'Error Messages', views: 1876 },
      { title: 'Support Contact', views: 1543 },
    ],
  },
];

export function KnowledgeBase() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Search className="h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search knowledge base..." 
          className="max-w-[300px]"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((category) => (
          <Card key={category.category}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.category}
              </CardTitle>
              <CardDescription>
                {category.items.length} articles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {category.items.map((article) => (
                    <div
                      key={article.title}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm hover:text-primary cursor-pointer">
                        {article.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {article.views} views
                      </span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}