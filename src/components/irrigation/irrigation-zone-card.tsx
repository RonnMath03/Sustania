import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { DropletIcon, Timer, Settings2 } from 'lucide-react';

interface IrrigationZoneCardProps {
  id: string;
  name: string;
  moisture: number;
  isActive: boolean;
  schedule: string;
  onToggle: (id: string, active: boolean) => void;
  onAdjustFlow: (id: string, value: number) => void;
}

export function IrrigationZoneCard({
  id,
  name,
  moisture,
  isActive,
  schedule,
  onToggle,
  onAdjustFlow,
}: IrrigationZoneCardProps) {
  const [flowRate, setFlowRate] = useState(50);

  const handleFlowChange = (value: number[]) => {
    setFlowRate(value[0]);
    onAdjustFlow(id, value[0]);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">{name}</CardTitle>
          <div className="flex items-center space-x-2">
            <Badge variant={moisture > 60 ? "default" : "warning"}>
              {moisture}% Moisture
            </Badge>
            <Badge variant="outline">{schedule}</Badge>
          </div>
        </div>
        <Switch
          checked={isActive}
          onCheckedChange={(checked) => onToggle(id, checked)}
        />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Flow Rate</span>
            <span className="text-sm font-medium">{flowRate}%</span>
          </div>
          <Slider
            value={[flowRate]}
            max={100}
            step={1}
            onValueChange={handleFlowChange}
            disabled={!isActive}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Button variant="outline" size="sm" className="flex-1" disabled={!isActive}>
            <Timer className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            <Settings2 className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}