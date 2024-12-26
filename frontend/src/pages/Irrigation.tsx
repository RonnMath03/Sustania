import { IrrigationSchedule } from '../components/irrigation/IrrigationSchedule';
import { ZoneManagement } from '../components/irrigation/ZoneManagement';
import { IrrigationHistory } from '../components/irrigation/IrrigationHistory';

export function Irrigation() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Irrigation Management</h1>
      
      <IrrigationSchedule />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ZoneManagement />
        <IrrigationHistory />
      </div>
    </div>
  );
}