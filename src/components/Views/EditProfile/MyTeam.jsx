// components/MyTeam.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaLinkedin, FaTwitter, FaDribbble, FaGithub, FaMountain, FaTree, FaPlus, FaTrash, FaSave, FaTimes, FaEdit } from 'react-icons/fa';

const MyTeam = ({ darkMode }) => {
  // Initial team members data
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      position: "UI/UX Designer",
      bio: "Creative designer with 7+ years of experience in creating intuitive user interfaces.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      social: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        dribbble: "https://dribbble.com"
      }
    },
    {
      id: 2,
      name: "Sarah Williams",
      position: "Backend Developer",
      bio: "Expert in server-side technologies with a passion for scalable architecture.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        twitter: "https://twitter.com"
      }
    },
    {
      id: 3,
      name: "Michael Chen",
      position: "DevOps Engineer",
      bio: "Specializing in cloud infrastructure and automation to streamline development processes.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        twitter: "https://twitter.com"
      }
    },
    {
      id: 4,
      name: "Emily Rodriguez",
      position: "Frontend Developer",
      bio: "Passionate about creating responsive and accessible web applications.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
      social: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
        twitter: "https://twitter.com"
      }
    }
  ]);

  // Initial team description
  const [teamDescription, setTeamDescription] = useState(
    "I'm proud to collaborate with a talented team of professionals who share my passion for " +
    "creating exceptional digital experiences. Together, we deliver innovative solutions that " +
    "exceed client expectations."
  );

  // State for new team member
  const [newTeamMember, setNewTeamMember] = useState({
    name: "",
    position: "",
    bio: "",
    image: "",
    social: {
      linkedin: "",
      twitter: "",
      dribbble: "",
      github: ""
    }
  });

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editTeamMember, setEditTeamMember] = useState(null);

  // State for saving status
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle input change for new team member
  const handleNewTeamMemberChange = (field, value) => {
    setNewTeamMember({ ...newTeamMember, [field]: value });
  };

  // Handle social media change for new team member
  const handleNewSocialChange = (platform, value) => {
    setNewTeamMember({
      ...newTeamMember,
      social: {
        ...newTeamMember.social,
        [platform]: value
      }
    });
  };

  // Add new team member
  const handleAddTeamMember = () => {
    if (newTeamMember.name.trim() !== "" && newTeamMember.position.trim() !== "") {
      const newId = Math.max(0, ...teamMembers.map(m => m.id)) + 1;
      
      setTeamMembers([
        ...teamMembers,
        {
          id: newId,
          name: newTeamMember.name,
          position: newTeamMember.position,
          bio: newTeamMember.bio,
          image: newTeamMember.image || `https://via.placeholder.com/500x500?text=${encodeURIComponent(newTeamMember.name)}`,
          social: newTeamMember.social
        }
      ]);
      
      // Reset form
      setNewTeamMember({
        name: "",
        position: "",
        bio: "",
        image: "",
        social: {
          linkedin: "",
          twitter: "",
          dribbble: "",
          github: ""
        }
      });
    }
  };

  // Start editing a team member
  const startEditing = (member) => {
    setEditingId(member.id);
    setEditTeamMember({ ...member });
  };

  // Handle input change for editing team member
  const handleEditTeamMemberChange = (field, value) => {
    setEditTeamMember({ ...editTeamMember, [field]: value });
  };

  // Handle social media change for editing team member
  const handleEditSocialChange = (platform, value) => {
    setEditTeamMember({
      ...editTeamMember,
      social: {
        ...editTeamMember.social,
        [platform]: value
      }
    });
  };

  // Save edited team member
  const saveEditedTeamMember = () => {
    if (editTeamMember.name.trim() !== "" && editTeamMember.position.trim() !== "") {
      setTeamMembers(teamMembers.map(member => 
        member.id === editingId ? editTeamMember : member
      ));
      cancelEditing();
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditTeamMember(null);
  };

  // Delete team member
  const deleteTeamMember = (id) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
    if (editingId === id) {
      cancelEditing();
    }
  };

  // Save all changes
  const handleSave = () => {
    setSaving(true);
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1500);
  };

  // Theme classes
  const bgClass = darkMode ? 'bg-gray-900' : 'bg-white';
  const textClass = darkMode ? 'text-gray-200' : 'text-gray-800';
  const textSecondaryClass = darkMode ? 'text-gray-300' : 'text-gray-700';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const inputBgClass = darkMode ? 'bg-gray-700' : 'bg-white';
  const inputBorderClass = darkMode ? 'border-gray-600' : 'border-gray-300';
  const tealTextClass = darkMode ? 'text-teal-400' : 'text-teal-600';
  const successBgClass = darkMode ? 'bg-green-900' : 'bg-green-100';
  const successTextClass = darkMode ? 'text-green-200' : 'text-green-700';
  const socialIconBgClass = darkMode ? 'bg-teal-900/30' : 'bg-teal-100';
  const socialIconTextClass = darkMode ? 'text-teal-400' : 'text-teal-600';
  const socialIconHoverClass = darkMode ? 'hover:bg-teal-800' : 'hover:bg-teal-200';

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${textClass}`}>My Team Editor</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-75"
          >
            {saving ? (
              <>Saving...</>
            ) : (
              <>
                <FaSave className="mr-2" /> Save Changes
              </>
            )}
          </button>
        </div>

        {saveSuccess && (
          <div className={`mb-6 p-4 rounded-lg flex items-center ${successBgClass} ${successTextClass}`}>
            <FaSave className="mr-2" /> Changes saved successfully!
          </div>
        )}

        {/* Team Description Editor */}
        <div className={`rounded-2xl p-6 border shadow-sm mb-8 ${cardBgClass} ${borderClass}`}>
          <h2 className={`text-2xl font-semibold mb-4 flex items-center ${tealTextClass}`}>
            <FaUsers className="mr-2" /> Team Description
          </h2>
          
          <textarea
            value={teamDescription}
            onChange={(e) => setTeamDescription(e.target.value)}
            rows={3}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
            placeholder="Enter team description"
          />
        </div>

        {/* Add New Team Member Form */}
        <div className={`rounded-2xl p-6 border shadow-sm mb-8 ${cardBgClass} ${borderClass}`}>
          <h2 className={`text-2xl font-semibold mb-6 flex items-center ${tealTextClass}`}>
            <FaPlus className="mr-2" /> Add New Team Member
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Name</label>
              <input
                type="text"
                value={newTeamMember.name}
                onChange={(e) => handleNewTeamMemberChange('name', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Enter team member's name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Position</label>
              <input
                type="text"
                value={newTeamMember.position}
                onChange={(e) => handleNewTeamMemberChange('position', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Enter position"
              />
            </div>
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Bio</label>
              <textarea
                value={newTeamMember.bio}
                onChange={(e) => handleNewTeamMemberChange('bio', e.target.value)}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Enter bio"
              />
            </div>
            <div className="md:col-span-2">
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Image URL</label>
              <input
                type="text"
                value={newTeamMember.image}
                onChange={(e) => handleNewTeamMemberChange('image', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Enter image URL (optional)"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className={`text-lg font-medium mb-3 ${textClass}`}>Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>LinkedIn</label>
                <input
                  type="text"
                  value={newTeamMember.social.linkedin}
                  onChange={(e) => handleNewSocialChange('linkedin', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="Enter LinkedIn URL"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Twitter</label>
                <input
                  type="text"
                  value={newTeamMember.social.twitter}
                  onChange={(e) => handleNewSocialChange('twitter', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="Enter Twitter URL"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Dribbble</label>
                <input
                  type="text"
                  value={newTeamMember.social.dribbble}
                  onChange={(e) => handleNewSocialChange('dribbble', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="Enter Dribbble URL"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>GitHub</label>
                <input
                  type="text"
                  value={newTeamMember.social.github}
                  onChange={(e) => handleNewSocialChange('github', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="Enter GitHub URL"
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={handleAddTeamMember}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
          >
            <FaPlus className="mr-2" /> Add Team Member
          </button>
        </div>

        {/* Existing Team Members */}
        <div className="space-y-8">
          <h2 className={`text-2xl font-semibold ${textClass}`}>Your Team</h2>
          
          {teamMembers.length === 0 ? (
            <div className={`text-center py-8 ${textMutedClass}`}>
              No team members yet. Add your first team member above.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className={`rounded-2xl border shadow-sm overflow-hidden ${cardBgClass} ${borderClass}`}>
                  {editingId === member.id ? (
                    // Edit Mode
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-lg font-semibold ${textClass}`}>Editing Team Member</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={saveEditedTeamMember}
                            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                          >
                            <FaSave />
                          </button>
                          <button
                            onClick={cancelEditing}
                            className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Name</label>
                          <input
                            type="text"
                            value={editTeamMember.name}
                            onChange={(e) => handleEditTeamMemberChange('name', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Position</label>
                          <input
                            type="text"
                            value={editTeamMember.position}
                            onChange={(e) => handleEditTeamMemberChange('position', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Bio</label>
                          <textarea
                            value={editTeamMember.bio}
                            onChange={(e) => handleEditTeamMemberChange('bio', e.target.value)}
                            rows={3}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Image URL</label>
                          <input
                            type="text"
                            value={editTeamMember.image}
                            onChange={(e) => handleEditTeamMemberChange('image', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <h4 className={`text-md font-medium mb-2 ${textClass}`}>Social Media Links</h4>
                          <div className="space-y-2">
                            <div>
                              <label className={`block text-xs mb-1 ${textMutedClass}`}>LinkedIn</label>
                              <input
                                type="text"
                                value={editTeamMember.social.linkedin}
                                onChange={(e) => handleEditSocialChange('linkedin', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                              />
                            </div>
                            <div>
                              <label className={`block text-xs mb-1 ${textMutedClass}`}>Twitter</label>
                              <input
                                type="text"
                                value={editTeamMember.social.twitter}
                                onChange={(e) => handleEditSocialChange('twitter', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                              />
                            </div>
                            <div>
                              <label className={`block text-xs mb-1 ${textMutedClass}`}>Dribbble</label>
                              <input
                                type="text"
                                value={editTeamMember.social.dribbble}
                                onChange={(e) => handleEditSocialChange('dribbble', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                              />
                            </div>
                            <div>
                              <label className={`block text-xs mb-1 ${textMutedClass}`}>GitHub</label>
                              <input
                                type="text"
                                value={editTeamMember.social.github}
                                onChange={(e) => handleEditSocialChange('github', e.target.value)}
                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="group">
                      {/* Top accent bar */}
                      <div className="h-2 bg-gradient-to-r from-teal-500 to-blue-600"></div>
                      
                      <div className="p-6 pt-10 -mt-6">
                        <div className="relative mb-6">
                          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <img 
                              src={member.image} 
                              alt={member.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://via.placeholder.com/500x500?text=${encodeURIComponent(member.name)}`;
                              }}
                            />
                          </div>
                          
                          {/* Edit and delete buttons */}
                          <div className="absolute top-0 right-0 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => startEditing(member)}
                              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => deleteTeamMember(member.id)}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        
                        {/* Team member info */}
                        <div className="text-center mb-4">
                          <h3 className={`text-xl font-bold mb-1 ${textClass}`}>{member.name}</h3>
                          <p className={tealTextClass}>{member.position}</p>
                        </div>
                        
                        {/* Bio */}
                        <p className={`text-center mb-6 ${textSecondaryClass}`}>
                          {member.bio}
                        </p>
                        
                        {/* Social links */}
                        <div className="flex justify-center space-x-3">
                          {Object.entries(member.social).map(([platform, url]) => (
                            url && (
                              <a
                                key={platform}
                                href={url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${socialIconBgClass} ${socialIconTextClass} ${socialIconHoverClass}`}
                              >
                                {platform === 'linkedin' && <FaLinkedin />}
                                {platform === 'twitter' && <FaTwitter />}
                                {platform === 'dribbble' && <FaDribbble />}
                                {platform === 'github' && <FaGithub />}
                              </a>
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyTeam;