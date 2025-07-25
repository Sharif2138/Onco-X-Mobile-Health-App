import React from 'react';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
type RiskReportProps = {
  result: {
    riskLevel: 'Low' | 'Moderate' | 'High';
    symptoms: string[];
    recommendation: string;
    educationalContent: string;
  };
};
const RiskReport = ({
  result
}: RiskReportProps) => {
  const getRiskBadge = () => {
    switch (result.riskLevel) {
      case 'Low':
        return {
          icon: <CheckCircle className="w-5 h-5" />,
          color: 'bg-green-100 text-green-800',
          iconColor: 'text-green-500'
        };
      case 'Moderate':
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          color: 'bg-yellow-100 text-yellow-800',
          iconColor: 'text-yellow-500'
        };
      case 'High':
        return {
          icon: <AlertCircle className="w-5 h-5" />,
          color: 'bg-red-100 text-red-800',
          iconColor: 'text-red-500'
        };
      default:
        return {
          icon: <AlertTriangle className="w-5 h-5" />,
          color: 'bg-gray-100 text-gray-800',
          iconColor: 'text-gray-500'
        };
    }
  };
  const badge = getRiskBadge();
  return <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center mb-6">
        <div className={`${badge.color} rounded-lg px-3 py-1 flex items-center`}>
          <span className={`mr-1 ${badge.iconColor}`}>{badge.icon}</span>
          <span className="font-medium">{result.riskLevel} Risk</span>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Symptoms Summary</h3>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          {result.symptoms.map((symptom, index) => <li key={index}>{symptom}</li>)}
        </ul>
      </div>
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="text-lg font-medium mb-3">Recommendation</h3>
        <p className="text-gray-700">{result.recommendation}</p>
      </div>
      <div>
        <h3 className="text-lg font-medium mb-3">Educational Information</h3>
        <p className="text-gray-700">{result.educationalContent}</p>
      </div>
    </div>;
};
export default RiskReport;