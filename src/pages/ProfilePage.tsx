// pages/ProfilePage.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import ProfileEditModal from '../components/profile/ProfileEditModal';

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return;

    const { name = '', age = '', gender = '' } = user.user_metadata || {};
    setUserData({
      name,
      email: user.email || '',
      age,
      gender,
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSave = async (updatedData: Partial<typeof userData>) => {
    const { error } = await supabase.auth.updateUser({
      data: updatedData,
    });
    if (error) {
      console.error('Update failed:', error.message);
    } else {
      setUserData(prev => ({ ...prev, ...updatedData }));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div><strong>Name:</strong> {userData.name || 'Not set'}</div>
        <div><strong>Email:</strong> {userData.email}</div>
        <div><strong>Age:</strong> {userData.age || 'Not set'}</div>
        <div><strong>Gender:</strong> {userData.gender || 'Not set'}</div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md"
        >
          Edit Profile
        </button>
      </div>
      {isModalOpen && (
        <ProfileEditModal
          userData={userData}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProfilePage;
