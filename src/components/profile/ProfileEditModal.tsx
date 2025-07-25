import React, { useState } from 'react';
import { X } from 'lucide-react';
type UserData = {
  name: string;
  email: string;
  age: number;
  gender: string;
  profileImage: string | null;
  notificationsEnabled: boolean;
  dataSharing: boolean;
};
type ProfileEditModalProps = {
  userData: UserData;
  onClose: () => void;
  onSave: (updatedData: Partial<UserData>) => void;
};
const ProfileEditModal = ({
  userData,
  onClose,
  onSave
}: ProfileEditModalProps) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    email: userData.email,
    age: userData.age,
    gender: userData.gender
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    age: ''
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
    // Clear error when field is edited
    if (name in errors) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate form
    const newErrors = {
      name: !formData.name ? 'Name is required' : '',
      email: !formData.email ? 'Email is required' : !/\S+@\S+\.\S+/.test(formData.email) ? 'Email is invalid' : '',
      age: !formData.age ? 'Age is required' : isNaN(Number(formData.age)) ? 'Age must be a number' : ''
    };
    setErrors(newErrors);
    // If no errors, proceed with submission
    if (!Object.values(newErrors).some(error => error)) {
      onSave({
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
        gender: formData.gender
      });
    }
  };
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-xl font-bold">Edit Profile</h3>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5">
          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={`w-full p-3 rounded-xl border ${errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`} placeholder="Enter your full name" />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={`w-full p-3 rounded-xl border ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`} placeholder="Enter your email" />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className={`w-full p-3 rounded-xl border ${errors.age ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200`} placeholder="Age" min="0" max="120" />
                {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age}</p>}
              </div>
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white transition-all duration-200">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button type="button" onClick={onClose} className="flex-1 p-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200">
              Cancel
            </button>
            <button type="submit" className="flex-1 p-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors duration-200 shadow-sm">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default ProfileEditModal;