import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Settings } from 'lucide-react';
import { IrrigationZoneCard } from './irrigation-zone-card';
import { IrrigationSchedule } from './irrigation-schedule';

interface IrrigationZone {
  id: string;
  name: string;
  moisture: number;
  isActive: boolean;
  schedule: string;
}

const mockZones: IrrigationZone[] = [
  {
    id: '1',
    name: 'North Field',
    moisture: 75,
    isActive: true,
    schedule: 'Daily at 6:00',
  },
  {
    id: '2',
    name: 'South Garden',
    moisture: 45,
    isActive: false,
    schedule: 'Every 2 days',
  },
  {
    id: '3',
    name: 'East Greenhouse',
    moisture: 60,
    isActive: true,
    schedule: 'Custom',
  },
  {
    id: '4',
    name: 'West Orchard',
    moisture: 65,
    isActive: false,
    schedule: 'Weekly',
  },
];

export function IrrigationView() {
  const [zones, setZones] = useState<IrrigationZone[]>(mockZones);

  const handleZoneToggle = (id: string, active: boolean) => {
    setZones((prev) =>
      prev.map((zone) =>
        zone.id === id ? { ...zone, isActive: active } : zone
      )
    );
  };

  const handleFlowAdjust = (id: string, value: number) => {
    console.log(`Adjusting flow for zone ${id} to ${value}%`);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Irrigation Control</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </Button>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Zone
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {zones.map((zone) => (
          <IrrigationZoneCard
            key={zone.id}
            {...zone}
            onToggle={handleZoneToggle}
            onAdjustFlow={handleFlowAdjust}
          />
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-4">
        <div className="lg:col-span-3">
          {/* Additional controls or charts can go here */}
        </div>
        <div>
          <IrrigationSchedule />
        </div>
      </div>
    </div>
  );
}