// components/ProfileEditModal.tsx
import React, { useState, useEffect } from 'react';

interface UserData {
  name: string;
  email: string;
  age: string;
  gender: string;
}

interface ProfileEditModalProps {
  userData: UserData;
  onClose: () => void;
  onSave: (updatedData: Partial<UserData>) => Promise<void>;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ userData, onClose, onSave }) => {
  const [formData, setFormData] = useState(userData);
  const [errors, setErrors] = useState({ name: '', age: '', gender: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFormData(userData);
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = { name: '', age: '', gender: '' };
    newErrors.name = formData.name ? '' : 'Name is required';
    newErrors.age =
      !formData.age
        ? 'Age is required'
        : isNaN(Number(formData.age)) || Number(formData.age) < 1 || Number(formData.age) > 120
        ? 'Age must be a valid number (1–120)'
        : '';
    newErrors.gender = formData.gender ? '' : 'Gender is required';
    setErrors(newErrors);
    return Object.values(newErrors).every(e => !e);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSaving(true);
    await onSave({ name: formData.name, age: formData.age, gender: formData.gender });
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              className="w-full p-2 border rounded-md"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              className="w-full p-2 border rounded-md bg-gray-100"
              value={formData.email}
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="text"
              name="age"
              className="w-full p-2 border rounded-md"
              value={formData.age}
              onChange={handleChange}
            />
            {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              name="gender"
              className="w-full p-2 border rounded-md"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className={`px-4 py-2 rounded-md text-white ${
                saving ? 'bg-purple-400' : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
