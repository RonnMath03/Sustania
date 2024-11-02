import { DropletIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ZoneStatus {
  id: string;
  name: string;
  moisture: number;
  status: 'optimal' | 'warning' | 'critical';
}

const mockZones: ZoneStatus[] = [
  { id: '1', name: 'North Field', moisture: 75, status: 'optimal' },
  { id: '2', name: 'South Garden', moisture: 45, status: 'warning' },
  { id: '3', name: 'East Greenhouse', moisture: 30, status: 'critical' },
  { id: '4', name: 'West Orchard', moisture: 65, status: 'optimal' },
];

export function IrrigationOverview() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Irrigation Zones</CardTitle>
        <DropletIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockZones.map((zone) => (
            <div key={zone.id} className="flex items-center space-x-4">
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{zone.name}</p>
                <Progress 
                  value={zone.moisture} 
                  className={
                    zone.status === 'optimal' 
                      ? 'text-primary' 
                      : zone.status === 'warning'
                      ? 'text-yellow-500'
                      : 'text-red-500'
                  }
                />
              </div>
              <div className="text-sm text-muted-foreground">{zone.moisture}%</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}