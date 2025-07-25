import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SymptomsPage from './pages/SymptomsPage';
import ResultsPage from './pages/ResultsPage';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import LearnPage from './pages/LearnPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
export function App() {
  return <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Navbar />
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 pb-16 pt-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/symptoms" element={<SymptomsPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/learn" element={<LearnPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>;
}