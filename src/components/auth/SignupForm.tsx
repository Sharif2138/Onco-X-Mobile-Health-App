import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
const SignupForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: ''
  });
  const [errors, setErrors] = useState({
    fullName: '',
    age: '',
    gender: ''
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      fullName: !formData.fullName ? 'Full name is required' : '',
      age: !formData.age ? 'Age is required' : '',
      gender: !formData.gender ? 'Please select your gender' : ''
    };
    setErrors(newErrors);
    // If no errors, proceed with submission
    if (!Object.values(newErrors).some(error => error)) {
      setIsLoading(true);
      // Mock API call
      setTimeout(() => {
        setIsLoading(false);
        navigate('/symptoms');
      }, 1500);
    }
  };
  return <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full p-3 rounded-xl border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`} placeholder="Enter your full name" />
        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
          Age
        </label>
        <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className={`w-full p-3 rounded-xl border ${errors.age ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500`} placeholder="Enter your age" min="0" max="120" />
        {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
      </div>
      <div className="mb-6">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
          Gender
        </label>
        <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className={`w-full p-3 rounded-xl border ${errors.gender ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white`}>
          <option value="" disabled>
            Select your gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender}</p>}
      </div>
      <button type="submit" disabled={isLoading} className="w-full bg-purple-600 text-white p-3 rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center">
        {isLoading ? <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Creating Account...
          </> : 'Create Account'}
      </button>
    </form>;
};
export default SignupForm;