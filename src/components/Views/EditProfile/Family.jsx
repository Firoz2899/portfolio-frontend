// components/Family.js
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSave, FaTimes, FaPlus, FaTrash, FaEdit, FaHeart, FaArrowLeft, FaImage, FaUser, FaInfoCircle
} from 'react-icons/fa';

const Family = ({ onSave, onCancel, initialData, darkMode }) => {
  const [familyMembers, setFamilyMembers] = useState([
    {
      id: 1,
      name: "Jane Doe",
      relation: "Spouse",
      description: "Supportive partner who encourages my creative pursuits and professional growth.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Alex Doe",
      relation: "Child",
      description: "Inspires me with curiosity and creativity, reminding me to approach problems with fresh eyes.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "Robert Doe",
      relation: "Parent",
      description: "Provided unwavering support and instilled values of hard work and perseverance.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      name: "Sarah Doe",
      relation: "Sibling",
      description: "My biggest critic and strongest supporter, always pushing me to be better.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ]);

  const [pageInfo, setPageInfo] = useState({
    title: "My Family",
    subtitle: "Family is not an important thing. It's everything."
  });

  const [newMember, setNewMember] = useState({
    name: "",
    relation: "",
    description: "",
    image: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (initialData) {
      setFamilyMembers(initialData.familyMembers || familyMembers);
      setPageInfo(initialData.pageInfo || pageInfo);
    }
  }, [initialData]);

  const handlePageInfoChange = (e) => {
    const { name, value } = e.target;
    setPageInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMemberChange = (id, field, value) => {
    setFamilyMembers(prev => 
      prev.map(member => 
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const handleNewMemberChange = (field, value) => {
    setNewMember(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addFamilyMember = () => {
    if (newMember.name && newMember.relation) {
      const newId = familyMembers.length > 0 
        ? Math.max(...familyMembers.map(m => m.id)) + 1 
        : 1;
      
      setFamilyMembers([
        ...familyMembers,
        {
          id: newId,
          name: newMember.name,
          relation: newMember.relation,
          description: newMember.description,
          image: newMember.image || `https://picsum.photos/seed/member${newId}/500/500.jpg`
        }
      ]);
      
      setNewMember({
        name: "",
        relation: "",
        description: "",
        image: ""
      });
    }
  };

  const deleteFamilyMember = (id) => {
    setFamilyMembers(familyMembers.filter(member => member.id !== id));
  };

  const startEditing = (id) => {
    setEditingId(id);
  };

  const stopEditing = () => {
    setEditingId(null);
  };

  const handleSave = () => {
    const data = {
      familyMembers,
      pageInfo
    };
    onSave(data);
  };

  // Theme classes
  const bgClass = darkMode ? 'bg-gradient-to-br from-teal-900 to-blue-900' : 'bg-gradient-to-br from-teal-50 to-blue-50';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const inputBgClass = darkMode ? 'bg-gray-700' : 'bg-white';
  const borderClass = darkMode ? 'border-gray-600' : 'border-gray-300';
  const textClass = darkMode ? 'text-gray-200' : 'text-gray-800';
  const textSecondaryClass = darkMode ? 'text-gray-300' : 'text-gray-700';
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-500';
  const tealTextClass = darkMode ? 'text-teal-400' : 'text-teal-600';
  const grayTextClass = darkMode ? 'text-gray-300' : 'text-gray-600';
  const redTextClass = darkMode ? 'text-red-400' : 'text-red-600';
  const buttonHoverClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100';
  const editButtonHoverClass = darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200';
  const deleteButtonHoverClass = darkMode ? 'hover:bg-red-800/50' : 'hover:bg-red-200';
  const emptyStateBgClass = darkMode ? 'bg-gray-700/50' : 'bg-gray-50';
  const newMemberBgClass = darkMode ? 'bg-gray-700/50' : 'bg-gray-50';

  return (
    <div className={`min-h-screen py-12 px-4 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${cardBgClass} rounded-2xl shadow-xl overflow-hidden`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button 
                  onClick={onCancel}
                  className="mr-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <FaArrowLeft />
                </button>
                <h2 className="text-2xl font-bold font-playfair">Edit Family Information</h2>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={onCancel}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center transition-colors"
                >
                  <FaTimes className="mr-2" /> Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="px-4 py-2 bg-white text-teal-600 hover:bg-teal-50 rounded-lg flex items-center font-medium transition-colors"
                >
                  <FaSave className="mr-2" /> Save Changes
                </button>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6">
            {/* Page Info Section */}
            <div className="mb-10">
              <h3 className={`text-xl font-bold mb-4 font-playfair ${textClass}`}>Page Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block mb-2 font-poppins ${textSecondaryClass}`}>Page Title</label>
                  <input
                    type="text"
                    name="title"
                    value={pageInfo.title}
                    onChange={handlePageInfoChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-poppins ${inputBgClass} ${borderClass} ${textClass}`}
                  />
                </div>
                <div>
                  <label className={`block mb-2 font-poppins ${textSecondaryClass}`}>Quote</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={pageInfo.subtitle}
                    onChange={handlePageInfoChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-poppins ${inputBgClass} ${borderClass} ${textClass}`}
                  />
                </div>
              </div>
            </div>
            
            {/* Add New Member Section */}
            <div className="mb-10">
              <h3 className={`text-xl font-bold mb-4 font-playfair ${textClass}`}>Add New Family Member</h3>
              <div className={`${newMemberBgClass} rounded-xl p-5`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={`block mb-2 font-poppins flex items-center ${textSecondaryClass}`}>
                      <FaUser className="mr-2 text-teal-500" /> Name
                    </label>
                    <input
                      type="text"
                      value={newMember.name}
                      onChange={(e) => handleNewMemberChange('name', e.target.value)}
                      placeholder="Enter name"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-poppins ${inputBgClass} ${borderClass} ${textClass}`}
                    />
                  </div>
                  <div>
                    <label className={`block mb-2 font-poppins flex items-center ${textSecondaryClass}`}>
                      <FaHeart className="mr-2 text-teal-500" /> Relation
                    </label>
                    <input
                      type="text"
                      value={newMember.relation}
                      onChange={(e) => handleNewMemberChange('relation', e.target.value)}
                      placeholder="e.g. Spouse, Child, Parent"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-poppins ${inputBgClass} ${borderClass} ${textClass}`}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block mb-2 font-poppins flex items-center ${textSecondaryClass}`}>
                      <FaInfoCircle className="mr-2 text-teal-500" /> Description
                    </label>
                    <textarea
                      value={newMember.description}
                      onChange={(e) => handleNewMemberChange('description', e.target.value)}
                      placeholder="Describe this family member"
                      rows="2"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-poppins resize-none ${inputBgClass} ${borderClass} ${textClass}`}
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className={`block mb-2 font-poppins flex items-center ${textSecondaryClass}`}>
                      <FaImage className="mr-2 text-teal-500" /> Image URL
                    </label>
                    <input
                      type="text"
                      value={newMember.image}
                      onChange={(e) => handleNewMemberChange('image', e.target.value)}
                      placeholder="https://example.com/image.jpg (leave empty for random image)"
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-poppins ${inputBgClass} ${borderClass} ${textClass}`}
                    />
                  </div>
                </div>
                <div className="mt-5 flex justify-end">
                  <button
                    onClick={addFamilyMember}
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-medium font-poppins flex items-center"
                  >
                    <FaPlus className="mr-2" /> Add Family Member
                  </button>
                </div>
              </div>
            </div>
            
            {/* Existing Members Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className={`text-xl font-bold font-playfair ${textClass}`}>Family Members</h3>
                <span className={`text-sm font-poppins ${textMutedClass}`}>
                  {familyMembers.length} members
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {familyMembers.map((member) => (
                  <div key={member.id} className={`${cardBgClass} border rounded-xl overflow-hidden ${borderClass}`}>
                    {editingId === member.id ? (
                      <div className="p-5">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className={`block mb-2 font-poppins ${textSecondaryClass}`}>Name</label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => handleMemberChange(member.id, 'name', e.target.value)}
                              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-poppins ${inputBgClass} ${borderClass} ${textClass}`}
                            />
                          </div>
                          <div>
                            <label className={`block mb-2 font-poppins ${textSecondaryClass}`}>Relation</label>
                            <input
                              type="text"
                              value={member.relation}
                              onChange={(e) => handleMemberChange(member.id, 'relation', e.target.value)}
                              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-poppins ${inputBgClass} ${borderClass} ${textClass}`}
                            />
                          </div>
                          <div>
                            <label className={`block mb-2 font-poppins ${textSecondaryClass}`}>Description</label>
                            <textarea
                              value={member.description}
                              onChange={(e) => handleMemberChange(member.id, 'description', e.target.value)}
                              rows="3"
                              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-poppins resize-none ${inputBgClass} ${borderClass} ${textClass}`}
                            ></textarea>
                          </div>
                          <div>
                            <label className={`block mb-2 font-poppins ${textSecondaryClass}`}>Image URL</label>
                            <input
                              type="text"
                              value={member.image}
                              onChange={(e) => handleMemberChange(member.id, 'image', e.target.value)}
                              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 font-poppins ${inputBgClass} ${borderClass} ${textClass}`}
                            />
                          </div>
                          <div className="flex space-x-3 pt-2">
                            <button
                              onClick={stopEditing}
                              className={`flex-1 py-2 rounded-lg font-medium font-poppins ${darkMode ? 'bg-gray-600 text-gray-200' : 'bg-gray-200 text-gray-800'}`}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={stopEditing}
                              className="flex-1 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg font-medium font-poppins"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex">
                        <div className="w-1/3">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-5">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className={`text-lg font-bold font-poppins ${textClass}`}>{member.name}</h4>
                              <p className={`font-poppins ${tealTextClass}`}>{member.relation}</p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => startEditing(member.id)}
                                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-600' : 'bg-gray-100'} ${editButtonHoverClass}`}
                              >
                                <FaEdit className={grayTextClass} />
                              </button>
                              <button
                                onClick={() => deleteFamilyMember(member.id)}
                                className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-red-900/30' : 'bg-red-100'} ${deleteButtonHoverClass}`}
                              >
                                <FaTrash className={redTextClass} />
                              </button>
                            </div>
                          </div>
                          <p className={`text-sm font-poppins ${textSecondaryClass}`}>{member.description}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {familyMembers.length === 0 && (
                <div className={`text-center py-10 rounded-xl ${emptyStateBgClass}`}>
                  <FaHeart className={`text-4xl mx-auto mb-3 ${textMutedClass}`} />
                  <p className={`font-poppins ${textMutedClass}`}>No family members added yet</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Family;