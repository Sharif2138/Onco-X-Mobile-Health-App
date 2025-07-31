import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    general: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Improved Validation
    const newErrors = {
      fullName: !formData.fullName ? 'Full name is required' : '',
      age:
        !formData.age || Number(formData.age) <= 0
          ? 'Valid age is required'
          : '',
      gender: !formData.gender ? 'Please select your gender' : '',
      email: !formData.email.includes('@') ? 'Invalid email format' : '',
      password:
        formData.password.length < 6
          ? 'Password must be at least 6 characters'
          : '',
      general: '',
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            age: Number(formData.age),
            gender: formData.gender,
          },
        },
      });

      if (error) {
        setErrors((prev) => ({ ...prev, general: error.message }));
      } else {
        navigate('/symptoms');
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, general: 'Unexpected error occurred' }));
    }

    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl space-y-6"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Sign Up
      </h2>

      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && (
          <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
        )}
      </div>

      {/* Age */}
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Age
        </label>
        <input
          id="age"
          name="age"
          type="number"
          min="1"
          value={formData.age}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          aria-invalid={!!errors.age}
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age}</p>
        )}
      </div>

      {/* Gender */}
      <div>
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          aria-invalid={!!errors.gender}
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      {/* General Error */}
      {errors.general && (
        <p className="text-red-600 text-center text-sm">{errors.general}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition"
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupForm;
