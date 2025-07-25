import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    const newErrors = {
      email: !formData.email ? 'Email is required' : '',
      password: !formData.password ? 'Password is required' : ''
    };
    setErrors(newErrors);
    // If no errors, proceed with submission
    if (!Object.values(newErrors).some(error => error)) {
      setIsLoading(true);
      // Mock API call
      setTimeout(() => {
        setIsLoading(false);
        navigate('/');
      }, 1500);
    }
  };
  return <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full p-3 rounded-xl border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`} placeholder="Enter your email" />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
      </div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <a href="#" className="text-sm text-purple-600 hover:text-purple-500">
            Forgot password?
          </a>
        </div>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className={`w-full p-3 rounded-xl border ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`} placeholder="Enter your password" />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
      </div>
      <button type="submit" disabled={isLoading} className="w-full bg-purple-600 text-white p-3 rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center">
        {isLoading ? <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Logging in...
          </> : 'Log in'}
      </button>
    </form>;
};
export default LoginForm;