import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { IrrigationZone } from '@/lib/types';

const mockZones: IrrigationZone[] = [
  {
    id: '1',
    name: 'North Field',
    status: 'active',
    moisture: 75,
    temperature: 23,
    humidity: 65,
    lastUpdated: new Date(),
  },
  {
    id: '2',
    name: 'South Garden',
    status: 'inactive',
    moisture: 45,
    temperature: 22,
    humidity: 60,
    lastUpdated: new Date(),
  },
  {
    id: '3',
    name: 'East Greenhouse',
    status: 'error',
    moisture: 30,
    temperature: 26,
    humidity: 70,
    lastUpdated: new Date(),
  },
];

export function ZonesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Zone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Moisture</TableHead>
          <TableHead>Temperature</TableHead>
          <TableHead>Humidity</TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockZones.map((zone) => (
          <TableRow key={zone.id}>
            <TableCell className="font-medium">{zone.name}</TableCell>
            <TableCell>
              <Badge
                variant={
                  zone.status === 'active'
                    ? 'success'
                    : zone.status === 'error'
                    ? 'destructive'
                    : 'secondary'
                }
              >
                {zone.status}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Progress value={zone.moisture} className="w-[60px]" />
                <span className="text-sm">{zone.moisture}%</span>
              </div>
            </TableCell>
            <TableCell>{zone.temperature}°C</TableCell>
            <TableCell>{zone.humidity}%</TableCell>
            <TableCell className="text-muted-foreground">
              {zone.lastUpdated.toLocaleTimeString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}