import React from 'react';
import { Link } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
const SignupPage = () => {
  return <div className="max-w-md mx-auto w-full py-8">
      <h1 className="text-2xl font-bold text-center mb-2">
        Create Your Account
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Join Onco X to track your health and get personalized guidance
      </p>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-xl p-3 mb-6 hover:bg-gray-50 transition">
          <div className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              or complete the form
            </span>
          </div>
        </div>
        <SignupForm />
        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-600 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>;
};
export default SignupPage;