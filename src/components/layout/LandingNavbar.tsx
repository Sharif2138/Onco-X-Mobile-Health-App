import { Link } from 'react-router-dom';

const LandingNavbar = () => (
  <header className="bg-white shadow-sm sticky top-0 z-10">
    <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <div className="h-8 w-8 rounded-md bg-purple-600 flex items-center justify-center mr-2">
          <span className="text-white font-bold">OX</span>
        </div>
        <span className="font-bold text-xl text-gray-800">
          Onco <span className="text-purple-600">X</span>
        </span>
      </Link>
      <div className="space-x-4 hidden md:flex">
        <Link to="/login" className="text-gray-700 hover:text-purple-700">
          Login
        </Link>
        <Link to="/signup" className="px-4 py-1.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 shadow">
          Sign Up
        </Link>
      </div>
    </div>
  </header>
);

export default LandingNavbar;
