import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, MessageSquare, Clock, User } from 'lucide-react';
const BottomNav = () => {
  const location = useLocation();
  return <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 shadow-lg">
      <div className="flex items-center justify-around">
        <NavItem to="/Interface" icon={<Home />} label="Interface" active={location.pathname === '/'} />
        <NavItem to="/symptoms" icon={<FileText />} label="Symptoms" active={location.pathname === '/symptoms'} />
        <NavItem to="/chat" icon={<MessageSquare />} label="Chat" active={location.pathname === '/chat'} />
        <NavItem to="/history" icon={<Clock />} label="History" active={location.pathname === '/history'} />
        <NavItem to="/profile" icon={<User />} label="Profile" active={location.pathname === '/profile'} />
      </div>
    </nav>;
};
type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
};
const NavItem = ({
  to,
  icon,
  label,
  active
}: NavItemProps) => {
  return <Link to={to} className="flex flex-col items-center py-3 px-4 relative">
      <div className={`w-6 h-6 mb-1 ${active ? 'text-purple-600' : 'text-gray-500'}`}>
        {icon}
      </div>
      <span className={`text-xs ${active ? 'text-purple-600 font-medium' : 'text-gray-500'}`}>
        {label}
      </span>
      {active && <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-purple-600" />}
    </Link>;
};
export default BottomNav;