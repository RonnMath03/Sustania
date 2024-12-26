import React, { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { ScheduleOptimizer } from './ScheduleOptimizer';
import toast from 'react-hot-toast';

interface Schedule {
  id: string;
  zoneName: string;
  startTime: string;
  duration: number;
  days: string[];
  mlRecommended: boolean;
  optimized: boolean;
}

export function IrrigationSchedule() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isAddingSchedule, setIsAddingSchedule] = useState(false);
  const [showOptimizer, setShowOptimizer] = useState(false);

  const handleAddSchedule = (schedule: Omit<Schedule, 'id' | 'optimized'>) => {
    const newSchedule = {
      ...schedule,
      id: Date.now().toString(),
      optimized: false,
    };
    setSchedules([...schedules, newSchedule]);
    setIsAddingSchedule(false);
    toast.success('Schedule added successfully');
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter(schedule => schedule.id !== id));
    toast.success('Schedule deleted');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Irrigation Schedule</h2>
            <p className="text-sm text-gray-500">Manage and optimize your irrigation schedules</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowOptimizer(!showOptimizer)}
            >
              {showOptimizer ? 'Hide Optimizer' : 'Show Optimizer'}
            </Button>
            <Button
              onClick={() => setIsAddingSchedule(true)}
              disabled={isAddingSchedule}
            >
              Add Schedule
            </Button>
          </div>
        </div>

        {showOptimizer && (
          <div className="mb-6">
            <ScheduleOptimizer />
          </div>
        )}

        {isAddingSchedule && (
          <ScheduleForm
            onSubmit={handleAddSchedule}
            onCancel={() => setIsAddingSchedule(false)}
          />
        )}

        <div className="space-y-4">
          {schedules.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              onDelete={handleDeleteSchedule}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ScheduleFormProps {
  onSubmit: (schedule: Omit<Schedule, 'id' | 'optimized'>) => void;
  onCancel: () => void;
}

function ScheduleForm({ onSubmit, onCancel }: ScheduleFormProps) {
  const [formData, setFormData] = useState({
    zoneName: '',
    startTime: '',
    duration: 30,
    days: [] as string[],
    mlRecommended: true,
  });

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.days.length === 0) {
      toast.error('Please select at least one day');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
      <Input
        label="Zone Name"
        value={formData.zoneName}
        onChange={(e) => setFormData({ ...formData, zoneName: e.target.value })}
        required
      />

      <Input
        label="Start Time"
        type="time"
        value={formData.startTime}
        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
        required
      />

      <Input
        label="Duration (minutes)"
        type="number"
        min={1}
        max={120}
        value={formData.duration}
        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
        required
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Days</label>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              type="button"
              className={`px-3 py-1 rounded-full text-sm ${
                formData.days.includes(day)
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => {
                const newDays = formData.days.includes(day)
                  ? formData.days.filter((d) => d !== day)
                  : [...formData.days, day];
                setFormData({ ...formData, days: newDays });
              }}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={formData.mlRecommended}
          onChange={(e) => setFormData({ ...formData, mlRecommended: e.target.checked })}
          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
        />
        <span className="text-sm text-gray-700">Follow ML recommendations</span>
      </label>

      <div className="flex space-x-4">
        <Button type="submit">Save Schedule</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

interface ScheduleCardProps {
  schedule: Schedule;
  onDelete: (id: string) => void;
}

function ScheduleCard({ schedule, onDelete }: ScheduleCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900">{schedule.zoneName}</h3>
            {schedule.optimized && (
              <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Optimized
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {schedule.startTime} • {schedule.duration} minutes
          </p>
          <div className="flex flex-wrap gap-2">
            {schedule.days.map((day) => (
              <span
                key={day}
                className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
              >
                {day}
              </span>
            ))}
          </div>
          {schedule.mlRecommended && (
            <p className="text-sm text-green-600">
              Following ML recommendations
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="secondary"
            onClick={() => onDelete(schedule.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}