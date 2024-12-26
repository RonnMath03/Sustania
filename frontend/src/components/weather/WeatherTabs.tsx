import { useState } from 'react';
import { WeatherForecast } from './WeatherForecast';
import { WeatherAlerts } from './WeatherAlerts';
import { WeatherHistory } from './WeatherHistory';
import { ImpactAnalysis } from './ImpactAnalysis';

const tabs = [
  { id: 'forecast', name: '7-Day Forecast', component: WeatherForecast },
  { id: 'alerts', name: 'Weather Alerts', component: WeatherAlerts },
  { id: 'historical', name: 'Historical Data', component: WeatherHistory },
  { id: 'impact', name: 'Impact Analysis', component: ImpactAnalysis },
];

export function WeatherTabs() {
  const [activeTab, setActiveTab] = useState('forecast');

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;

  return (
    <div className="space-y-4">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.name}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="py-4">
        {ActiveComponent && <ActiveComponent />}
      </div>
    </div>
  );
}