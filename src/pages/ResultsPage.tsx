import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, CheckCircle, MessageSquare } from 'lucide-react';
import RiskReport from '../components/results/RiskReport';
const ResultsPage = () => {
  // Mock data - in a real app, this would come from the backend
  const mockResult = {
    riskLevel: 'Moderate',
    symptoms: ['Persistent cough', 'Fatigue', 'Night sweats'],
    recommendation: 'We recommend scheduling an appointment with a healthcare provider for further evaluation.',
    educationalContent: 'Persistent cough and night sweats can be symptoms of various conditions, including respiratory infections, allergies, or in some cases, certain types of cancer. Early evaluation is important for proper diagnosis and treatment.'
  };
  return <div className="max-w-2xl mx-auto w-full py-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Your Assessment Results</h1>
        <p className="text-gray-600">
          Based on the symptoms you've shared, we've prepared this report
        </p>
      </div>
      <RiskReport result={mockResult} />
      <div className="mt-8 bg-blue-50 rounded-2xl p-6">
        <div className="flex items-start">
          <AlertTriangle className="w-6 h-6 text-blue-600 mr-3 mt-1" />
          <div>
            <h3 className="font-medium text-lg text-blue-800">
              Important Note
            </h3>
            <p className="text-blue-700 text-sm mt-1">
              This assessment is not a medical diagnosis. It's designed to
              provide guidance based on the symptoms you've shared. Always
              consult with a healthcare professional for proper diagnosis and
              treatment.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex flex-col md:flex-row gap-4">
        <Link to="/chat" className="flex-1 bg-purple-50 hover:bg-purple-100 transition p-5 rounded-2xl flex items-center">
          <MessageSquare className="w-8 h-8 text-purple-600 mr-4" />
          <div>
            <h3 className="font-bold">Have questions?</h3>
            <p className="text-gray-600 text-sm">Chat with our AI assistant</p>
          </div>
        </Link>
        <Link to="/learn" className="flex-1 bg-green-50 hover:bg-green-100 transition p-5 rounded-2xl flex items-center">
          <CheckCircle className="w-8 h-8 text-green-600 mr-4" />
          <div>
            <h3 className="font-bold">Learn more</h3>
            <p className="text-gray-600 text-sm">Explore our knowledge hub</p>
          </div>
        </Link>
      </div>
    </div>;
};
export default ResultsPage;