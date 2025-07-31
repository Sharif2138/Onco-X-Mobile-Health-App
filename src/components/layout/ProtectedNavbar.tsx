// src/components/layout/ProtectedNavbar.tsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MenuIcon, UserIcon, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ProtectedNavbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    setShowMenu(false);
    navigate('/login');
  };

  const isLoggedIn = !!user;
  const userName = user?.user_metadata?.full_name || 'User';

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-md bg-purple-600 flex items-center justify-center mr-2">
            <span className="text-white font-bold">OX</span>
          </div>
          <span className="font-bold text-xl text-gray-800">
            Onco <span className="text-purple-600">X</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex space-x-6 text-sm">
          <NavLink to="/interface" label="Home" currentPath={location.pathname} />
          <NavLink to="/chat" label="Chat" currentPath={location.pathname} />
          <NavLink to="/learn" label="Learn" currentPath={location.pathname} />
          <NavLink to="/history" label="History" currentPath={location.pathname} />
        </div>

        {/* Profile / Auth Buttons */}
        <div className="flex items-center">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-full text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-200">
                <span className="text-gray-700">{userName}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <Link to="/profile" className="relative group">
                <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm hover:border-purple-100 transition-all duration-200">
                  <UserIcon className="w-5 h-5 text-gray-500 group-hover:text-purple-600 transition-colors duration-200" />
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
              </Link>
              <button
                onClick={handleLogout}
                className="hidden md:inline-block text-sm text-red-600 px-4 py-1.5 rounded-lg hover:bg-red-50 transition-colors duration-200"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex space-x-2">
              <Link
                to="/login"
                className="px-4 py-1.5 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200 shadow-sm"
              >
                Sign up
              </Link>
            </div>
          )}
          <button
            className="ml-4 md:hidden p-1.5 rounded-md hover:bg-gray-100 transition-colors duration-200"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <X className="w-5 h-5 text-gray-700" /> : <MenuIcon className="w-5 h-5 text-gray-700" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {showMenu && (
        <div className="md:hidden bg-white border-t border-gray-100 py-3 px-4 animate-fadeIn shadow-lg">
          <nav className="space-y-1 mb-4">
            <MobileNavLink to="/interface" label="Home" onClick={() => setShowMenu(false)} />
            <MobileNavLink to="/chat" label="Chat" onClick={() => setShowMenu(false)} />
            <MobileNavLink to="/learn" label="Learn" onClick={() => setShowMenu(false)} />
            <MobileNavLink to="/history" label="History" onClick={() => setShowMenu(false)} />
          </nav>
          <div className="border-t border-gray-100 pt-3 mt-3">
            {isLoggedIn ? (
              <div className="space-y-2">
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2.5 rounded-lg hover:bg-purple-50 text-purple-700"
                  onClick={() => setShowMenu(false)}
                >
                  <UserIcon className="w-4 h-4 mr-3" />
                  My Profile
                </Link>
                <button
                  className="flex items-center w-full text-left px-3 py-2.5 rounded-lg hover:bg-red-50 text-red-600"
                  onClick={handleLogout}
                >
                  <span className="mr-3 w-4 h-4">→</span>
                  Log out
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  className="block w-full px-3 py-2 rounded-lg border border-gray-300 text-center hover:bg-gray-50"
                  onClick={() => setShowMenu(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="block w-full px-3 py-2 rounded-lg bg-purple-600 text-white text-center hover:bg-purple-700"
                  onClick={() => setShowMenu(false)}
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

type NavLinkProps = {
  to: string;
  label: string;
  currentPath: string;
};
const NavLink: React.FC<NavLinkProps> = ({ to, label, currentPath }) => {
  const isActive = currentPath === to || (to !== '/' && currentPath.startsWith(to));
  return (
    <Link
      to={to}
      className={`relative font-medium hover:text-purple-700 transition-colors duration-200 py-1 ${
        isActive ? 'text-purple-700' : 'text-gray-600'
      }`}
    >
      {label}
      {isActive && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-full" />}
    </Link>
  );
};

type MobileNavLinkProps = {
  to: string;
  label: string;
  onClick: () => void;
};
const MobileNavLink: React.FC<MobileNavLinkProps> = ({ to, label, onClick }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to));
  return (
    <Link
      to={to}
      className={`block px-3 py-2.5 rounded-lg ${
        isActive ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default ProtectedNavbar;
