'use client';

import { useState, useEffect } from "react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  skills: string[];
  profilePic?: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserProfile>({
    id: "",
    name: "",
    email: "",
    bio: "",
    skills: [],
    profilePic: ""
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch("/api/users/me");
      const data: UserProfile = await res.json();
      setUser(data);
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSkillChange = (index: number, value: string) => {
    const updatedSkills = [...user.skills];
    updatedSkills[index] = value;
    setUser({ ...user, skills: updatedSkills });
  };

  const addSkill = () => setUser({ ...user, skills: [...user.skills, ""] });
  const removeSkill = (index: number) => {
    const updatedSkills = user.skills.filter((_, i) => i !== index);
    setUser({ ...user, skills: updatedSkills });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });
    if (res.ok) {
      alert("Profile updated successfully!");
      setEditing(false);
    } else {
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="pt-16 p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
        <button
          onClick={() => setEditing(!editing)}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {editing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md border border-gray-100 p-6 space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-6">
          <img
            src={user.profilePic || "/default-profile.png"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-300"
          />
          {editing && (
            <input
              type="text"
              name="profilePic"
              value={user.profilePic}
              onChange={handleInputChange}
              placeholder="Profile Image URL"
              className="px-4 py-2 border border-gray-300 rounded-lg w-full"
            />
          )}
        </div>

        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              disabled={!editing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              disabled={!editing}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <textarea
            name="bio"
            value={user.bio}
            onChange={handleInputChange}
            disabled={!editing}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
          <div className="space-y-2">
            {user.skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={skill}
                  disabled={!editing}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                />
                {editing && (
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            {editing && (
              <button
                type="button"
                onClick={addSkill}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Add Skill
              </button>
            )}
          </div>
        </div>

        {editing && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ProfilePage;
