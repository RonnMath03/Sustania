import React, { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import toast from 'react-hot-toast';

interface Zone {
  id: string;
  name: string;
  area: number;
  plantType: string;
  status: 'active' | 'inactive';
}

export function ZoneManagement() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [isAddingZone, setIsAddingZone] = useState(false);

  const handleAddZone = (zone: Omit<Zone, 'id'>) => {
    const newZone = {
      ...zone,
      id: Date.now().toString(),
    };
    setZones([...zones, newZone]);
    setIsAddingZone(false);
    toast.success('Zone added successfully');
  };

  const handleDeleteZone = (id: string) => {
    setZones(zones.filter(zone => zone.id !== id));
    toast.success('Zone deleted');
  };

  const handleToggleStatus = (id: string) => {
    setZones(zones.map(zone => {
      if (zone.id === id) {
        const newStatus = zone.status === 'active' ? 'inactive' : 'active';
        return { ...zone, status: newStatus };
      }
      return zone;
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">Irrigation Zones</h2>
        <Button
          onClick={() => setIsAddingZone(true)}
          disabled={isAddingZone}
        >
          Add Zone
        </Button>
      </div>

      {isAddingZone && (
        <ZoneForm
          onSubmit={handleAddZone}
          onCancel={() => setIsAddingZone(false)}
        />
      )}

      <div className="space-y-4">
        {zones.map((zone) => (
          <ZoneCard
            key={zone.id}
            zone={zone}
            onDelete={handleDeleteZone}
            onToggleStatus={handleToggleStatus}
          />
        ))}
      </div>
    </div>
  );
}

interface ZoneFormProps {
  onSubmit: (zone: Omit<Zone, 'id'>) => void;
  onCancel: () => void;
}

function ZoneForm({ onSubmit, onCancel }: ZoneFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    area: 100,
    plantType: '',
    status: 'active' as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
      <Input
        label="Zone Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <Input
        label="Area (m²)"
        type="number"
        min={1}
        value={formData.area}
        onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) })}
        required
      />

      <Input
        label="Plant Type"
        value={formData.plantType}
        onChange={(e) => setFormData({ ...formData, plantType: e.target.value })}
        required
      />

      <div className="flex space-x-4">
        <Button type="submit">Save Zone</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

interface ZoneCardProps {
  zone: Zone;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

function ZoneCard({ zone, onDelete, onToggleStatus }: ZoneCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{zone.name}</h3>
          <p className="text-sm text-gray-500">
            {zone.area} m² • {zone.plantType}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={zone.status === 'active' ? 'primary' : 'secondary'}
            onClick={() => onToggleStatus(zone.id)}
          >
            {zone.status === 'active' ? 'Active' : 'Inactive'}
          </Button>
          <Button
            variant="secondary"
            onClick={() => onDelete(zone.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}