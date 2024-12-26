import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { format } from 'date-fns';
import { Brain, Target, AlertTriangle } from 'lucide-react';

// Feature importance data from the bar chart
const featureImportanceData = [
  { feature: 'moisture', importance: 0.21 },
  { feature: 'moisture_normalized', importance: 0.18 },
  { feature: 'temp_normalized', importance: 0.16 },
  { feature: 'temp', importance: 0.14 },
  { feature: 'temp_hot', importance: 0.09 },
  { feature: 'moisture_temp_interaction', importance: 0.06 },
  { feature: 'moisture_low', importance: 0.04 },
  { feature: 'moisture_medium_high', importance: 0.035 },
  { feature: 'temp_optimal', importance: 0.02 },
  { feature: 'moisture_medium_low', importance: 0.015 },
  { feature: 'temp_cold', importance: 0.01 },
  { feature: 'moisture_high', importance: 0.01 }
];

// Confusion matrix data
const confusionMatrix = {
  trueNegatives: 403,
  falsePositives: 30,
  falseNegatives: 61,
  truePositives: 506
};

export function MLPerformanceMetrics() {
  // Calculate metrics from confusion matrix
  const total = confusionMatrix.trueNegatives + confusionMatrix.falsePositives + 
                confusionMatrix.falseNegatives + confusionMatrix.truePositives;
  const accuracy = ((confusionMatrix.truePositives + confusionMatrix.trueNegatives) / total) * 100;
  const precision = (confusionMatrix.truePositives / (confusionMatrix.truePositives + confusionMatrix.falsePositives)) * 100;
  const recall = (confusionMatrix.truePositives / (confusionMatrix.truePositives + confusionMatrix.falseNegatives)) * 100;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-medium text-gray-900">ML Model Performance</h2>
        <div className="text-sm text-gray-500">AUC-ROC: 0.98</div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-indigo-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-indigo-600">
            <Brain className="w-5 h-5" />
            <span className="text-sm font-medium">Accuracy</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {accuracy.toFixed(1)}%
          </div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-green-600">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Precision</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {precision.toFixed(1)}%
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-blue-600">
            <Target className="w-5 h-5" />
            <span className="text-sm font-medium">Recall</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {recall.toFixed(1)}%
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium">False Positives</span>
          </div>
          <div className="mt-2 text-2xl font-semibold text-gray-900">
            {confusionMatrix.falsePositives}
          </div>
        </div>
      </div>

      {/* Feature Importance Chart */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Feature Importance</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={featureImportanceData} layout="vertical" margin={{ left: 120 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" domain={[0, 0.25]} />
              <YAxis dataKey="feature" type="category" />
              <Tooltip 
                formatter={(value: number) => `${(value * 100).toFixed(1)}%`}
                labelFormatter={(label) => `Feature: ${label}`}
              />
              <Bar dataKey="importance" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Confusion Matrix */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Confusion Matrix</h3>
        <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-600">True Negatives</div>
            <div className="text-xl font-semibold text-gray-900">{confusionMatrix.trueNegatives}</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-600">False Positives</div>
            <div className="text-xl font-semibold text-gray-900">{confusionMatrix.falsePositives}</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-600">False Negatives</div>
            <div className="text-xl font-semibold text-gray-900">{confusionMatrix.falseNegatives}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-600">True Positives</div>
            <div className="text-xl font-semibold text-gray-900">{confusionMatrix.truePositives}</div>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Model Insights</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Soil moisture is the most important feature (21% importance)</li>
            <li>• High model accuracy with AUC-ROC of 0.98</li>
            <li>• Strong performance in both irrigation and no-irrigation cases</li>
          </ul>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Recommendations</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Focus on moisture sensor calibration for optimal results</li>
            <li>• Consider temperature interactions for better predictions</li>
            <li>• Monitor false positives in edge cases</li>
          </ul>
        </div>
      </div>
    </div>
  );
}