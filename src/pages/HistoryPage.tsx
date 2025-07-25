import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
const HistoryPage = () => {
  const navigate = useNavigate();
  // Mock history data
  const historyItems = [{
    id: 1,
    date: new Date(2023, 5, 15),
    symptoms: ['Persistent cough', 'Fatigue', 'Night sweats'],
    riskLevel: 'Moderate'
  }, {
    id: 2,
    date: new Date(2023, 4, 28),
    symptoms: ['Skin discoloration', 'Lump'],
    riskLevel: 'Low'
  }, {
    id: 3,
    date: new Date(2023, 3, 10),
    symptoms: ['Unexplained weight loss', 'Persistent pain'],
    riskLevel: 'High'
  }];
  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const handleViewReport = (id: number) => {
    navigate('/results');
  };
  return <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Your History</h1>
        <p className="text-gray-600">
          View your past symptom checks and reports
        </p>
      </div>
      {historyItems.length > 0 ? <div className="space-y-4">
          {historyItems.map(item => <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <span className="text-sm">
                    {item.date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
                  </span>
                </div>
                <div className={`${getRiskBadgeColor(item.riskLevel)} text-sm px-2 py-0.5 rounded-md`}>
                  {item.riskLevel} Risk
                </div>
              </div>
              <h3 className="font-medium mb-2">Symptoms:</h3>
              <p className="text-gray-700 mb-4">{item.symptoms.join(', ')}</p>
              <button onClick={() => handleViewReport(item.id)} className="w-full flex items-center justify-center gap-1 p-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition">
                View Full Report
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>)}
        </div> : <div className="text-center py-12 bg-gray-50 rounded-2xl">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-700">No History Yet</h3>
          <p className="text-gray-500 mt-1">
            Your symptom checks and reports will appear here
          </p>
        </div>}
    </div>;
};
export default HistoryPage;