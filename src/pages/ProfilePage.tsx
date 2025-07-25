import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ChevronRight, Clock, Settings, Shield, Bell, HelpCircle, LogOut, Edit3, Calendar, AlertTriangle, CheckCircle, FileText, MessageSquare } from 'lucide-react';
import ProfileEditModal from '../components/profile/ProfileEditModal';
const ProfilePage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 42,
    gender: 'Male',
    profileImage: null as string | null,
    notificationsEnabled: true,
    dataSharing: false
  });
  // Mock history data
  const recentAssessments = [{
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
  // Mock appointments
  const upcomingAppointments = [{
    id: 1,
    title: 'Dr. Smith - Oncology Consultation',
    date: new Date(2023, 6, 20, 10, 30),
    location: 'Memorial Cancer Center'
  }];
  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Low':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: <CheckCircle className="w-4 h-4 mr-1" />
        };
      case 'Moderate':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          icon: <AlertTriangle className="w-4 h-4 mr-1" />
        };
      case 'High':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          icon: <AlertTriangle className="w-4 h-4 mr-1" />
        };
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: null
        };
    }
  };
  const handleProfileUpdate = (updatedData: Partial<typeof userData>) => {
    setUserData(prev => ({
      ...prev,
      ...updatedData
    }));
    setShowEditModal(false);
  };
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          profileImage: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  return <div className="py-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start">
          <div className="relative mb-6 md:mb-0 md:mr-8">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-100 to-white flex items-center justify-center overflow-hidden border-4 border-white shadow-sm">
              {userData.profileImage ? <img src={userData.profileImage} alt="Profile" className="w-full h-full object-cover" /> : <span className="text-5xl text-purple-300 font-light">
                  {userData.name.charAt(0)}
                </span>}
            </div>
            <label htmlFor="profile-image" className="absolute bottom-1 right-1 bg-purple-600 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-purple-700 transition-colors duration-200">
              <Camera className="w-4 h-4" />
              <input type="file" id="profile-image" className="hidden" accept="image/*" onChange={handleProfileImageChange} />
            </label>
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {userData.name}
                </h1>
                <p className="text-gray-500 mb-2">{userData.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <span className="mr-1">👤</span> {userData.gender}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm flex items-center">
                    <span className="mr-1">🎂</span> {userData.age} years
                  </span>
                </div>
              </div>
              <button onClick={() => setShowEditModal(true)} className="mt-4 md:mt-0 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex overflow-x-auto hide-scrollbar">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors duration-200 ${activeTab === 'overview' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Overview
          </button>
          <button onClick={() => setActiveTab('history')} className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors duration-200 ${activeTab === 'history' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Assessment History
          </button>
          <button onClick={() => setActiveTab('appointments')} className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors duration-200 ${activeTab === 'appointments' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Appointments
          </button>
          <button onClick={() => setActiveTab('settings')} className={`px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors duration-200 ${activeTab === 'settings' ? 'border-purple-600 text-purple-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            Settings
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <div className="space-y-6">
          {/* Recent Assessments */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                Recent Assessments
              </h2>
              <Link to="/history" className="text-purple-600 text-sm font-medium hover:text-purple-800 transition-colors duration-200">
                View All
              </Link>
            </div>
            {recentAssessments.length > 0 ? <div className="space-y-4">
                {recentAssessments.slice(0, 2).map(item => {
            const riskBadge = getRiskBadgeColor(item.riskLevel);
            return <div key={item.id} className="border border-gray-100 rounded-xl p-4 hover:border-gray-200 transition-colors duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-gray-500">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            {item.date.toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                          </span>
                        </div>
                        <div className={`${riskBadge.bg} ${riskBadge.text} text-sm px-3 py-1 rounded-full flex items-center`}>
                          {riskBadge.icon}
                          {item.riskLevel} Risk
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">
                        <span className="font-medium">Symptoms:</span>{' '}
                        {item.symptoms.join(', ')}
                      </p>
                      <Link to="/results" className="mt-3 inline-flex items-center text-sm text-purple-600 hover:text-purple-800 transition-colors duration-200">
                        View Details
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </div>;
          })}
              </div> : <div className="text-center py-8 bg-gray-50 rounded-xl">
                <Clock className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">No assessments yet</p>
              </div>}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Link to="/symptoms" className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow transition-all duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium mb-1">New Assessment</h3>
                <p className="text-xs text-gray-500">Check your symptoms</p>
              </div>
            </Link>
            <Link to="/chat" className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow transition-all duration-200">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-medium mb-1">Chat with AI</h3>
                <p className="text-xs text-gray-500">Get health guidance</p>
              </div>
            </Link>
          </div>
        </div>}

      {activeTab === 'history' && <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-5">Assessment History</h2>
          {recentAssessments.length > 0 ? <div className="space-y-5">
              {recentAssessments.map(item => {
          const riskBadge = getRiskBadgeColor(item.riskLevel);
          return <div key={item.id} className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors duration-200">
                    <div className="flex flex-wrap md:flex-nowrap md:items-center justify-between gap-3 mb-3">
                      <div className="flex items-center">
                        <div className="bg-gray-100 p-2 rounded-lg mr-3">
                          <Calendar className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {item.date.toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.date.toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                          </div>
                        </div>
                      </div>
                      <div className={`${riskBadge.bg} ${riskBadge.text} px-3 py-1 rounded-full flex items-center text-sm`}>
                        {riskBadge.icon}
                        {item.riskLevel} Risk
                      </div>
                    </div>
                    <div className="mb-3 pl-2 border-l-2 border-gray-100">
                      <h4 className="font-medium mb-1">Symptoms</h4>
                      <ul className="list-disc pl-5 space-y-0.5 text-gray-700 text-sm">
                        {item.symptoms.map((symptom, i) => <li key={i}>{symptom}</li>)}
                      </ul>
                    </div>
                    <div className="flex justify-end">
                      <Link to="/results" className="inline-flex items-center gap-1 text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors duration-200">
                        View Full Report
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>;
        })}
            </div> : <div className="text-center py-12 bg-gray-50 rounded-xl">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-700">
                No History Yet
              </h3>
              <p className="text-gray-500 mt-1">
                Your symptom checks and reports will appear here
              </p>
            </div>}
        </div>}

      {activeTab === 'appointments' && <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-5">Your Appointments</h2>
          {upcomingAppointments.length > 0 ? <div className="space-y-4">
              {upcomingAppointments.map(appointment => <div key={appointment.id} className="border border-gray-100 rounded-xl p-5 hover:border-gray-200 transition-colors duration-200">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg mb-1">
                        {appointment.title}
                      </h3>
                      <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-gray-400" />
                          {appointment.date.toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                  })}{' '}
                          at{' '}
                          {appointment.date.toLocaleTimeString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                        </div>
                        <div className="flex items-center">
                          <span className="w-4 h-4 mr-1 text-gray-400">📍</span>
                          {appointment.location}
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50 transition-colors duration-200">
                          Reschedule
                        </button>
                        <button className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-lg text-sm hover:bg-red-100 transition-colors duration-200">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>)}
            </div> : <div className="text-center py-12 bg-gray-50 rounded-xl">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-700">
                No Appointments
              </h3>
              <p className="text-gray-500 mt-1 mb-4">
                You don't have any upcoming appointments
              </p>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                Schedule Appointment
              </button>
            </div>}
        </div>}

      {activeTab === 'settings' && <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold mb-5">Account Settings</h2>
          <div className="space-y-6">
            <div className="pb-5 border-b border-gray-100">
              <h3 className="font-medium mb-3 text-gray-800">
                Notification Preferences
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Email Notifications</h4>
                    <p className="text-xs text-gray-500">
                      Receive updates via email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={userData.notificationsEnabled} onChange={() => setUserData(prev => ({
                  ...prev,
                  notificationsEnabled: !prev.notificationsEnabled
                }))} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">
                      Appointment Reminders
                    </h4>
                    <p className="text-xs text-gray-500">
                      Get reminded about upcoming appointments
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={true} onChange={() => {}} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="pb-5 border-b border-gray-100">
              <h3 className="font-medium mb-3 text-gray-800">
                Privacy Settings
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-sm">Data Sharing</h4>
                    <p className="text-xs text-gray-500">
                      Share anonymized data for research
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={userData.dataSharing} onChange={() => setUserData(prev => ({
                  ...prev,
                  dataSharing: !prev.dataSharing
                }))} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>
            <div className="pb-5 border-b border-gray-100">
              <h3 className="font-medium mb-3 text-gray-800">Support & Help</h3>
              <div className="space-y-2">
                <Link to="/help" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center">
                    <HelpCircle className="w-5 h-5 text-gray-500 mr-3" />
                    <span>Help Center</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
                <Link to="/contact" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 text-gray-500 mr-3" />
                    <span>Contact Support</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </Link>
              </div>
            </div>
            <div className="pt-2">
              <button className="flex items-center w-full p-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200">
                <LogOut className="w-5 h-5 mr-3" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>}

      {/* Profile Edit Modal */}
      {showEditModal && <ProfileEditModal userData={userData} onClose={() => setShowEditModal(false)} onSave={handleProfileUpdate} />}
    </div>;
};
export default ProfilePage;