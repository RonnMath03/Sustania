import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Timer, Droplet } from 'lucide-react';

interface ScheduleEvent {
  id: string;
  zoneName: string;
  time: string;
  duration: string;
  status: 'scheduled' | 'active' | 'completed';
}

const mockSchedule: ScheduleEvent[] = [
  {
    id: '1',
    zoneName: 'North Field',
    time: '06:00',
    duration: '30min',
    status: 'completed',
  },
  {
    id: '2',
    zoneName: 'East Greenhouse',
    time: '14:30',
    duration: '15min',
    status: 'active',
  },
  {
    id: '3',
    zoneName: 'South Garden',
    time: '18:00',
    duration: '20min',
    status: 'scheduled',
  },
];

export function IrrigationSchedule() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Today's Schedule</CardTitle>
        <Timer className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {mockSchedule.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <Droplet className="h-4 w-4 text-primary" />
                    <span className="font-medium">{event.zoneName}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{event.time}</span>
                    <span>•</span>
                    <span>{event.duration}</span>
                  </div>
                </div>
                <Badge
                  variant={
                    event.status === 'active'
                      ? 'default'
                      : event.status === 'completed'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {event.status}
                </Badge>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}