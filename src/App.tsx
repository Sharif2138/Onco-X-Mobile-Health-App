import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import LandingLayout from './components/layout/LandingLayout';
import ProtectedLayout from './components/layout/ProtectedLayout';

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Interface from './pages/Interface';
import SymptomsPage from './pages/SymptomsPage';
import ResultsPage from './pages/ResultsPage';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import LearnPage from './pages/LearnPage';
import ProfilePage from './pages/ProfilePage';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public (Landing) Layout */}
          <Route element={<LandingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Protected (Dashboard) Layout */}
          <Route  element={<ProtectedLayout />}>
            <Route path="/interface" element={<Interface />} />
            <Route path="/symptoms" element={<SymptomsPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
