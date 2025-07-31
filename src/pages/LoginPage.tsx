import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
const LoginPage = () => {
  return <div className="max-w-md mx-auto w-full py-8">
      <h1 className="text-2xl font-bold text-center mb-2">Welcome Back</h1>
      <p className="text-gray-600 text-center mb-8">
        Log in to continue your health journey
      </p>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {/* <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl p-3 mb-6 hover:bg-gray-50 transition">
          <div className="w-5 h-5" />
          <span>Continue with Google</span>
        </button> */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              log in with email
            </span>
          </div>
        </div>
        <LoginForm />
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-purple-600 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>;
};
export default LoginPage;