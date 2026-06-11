// components/Education.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaPlus, FaTrash, FaSave, FaTimes, FaEdit } from 'react-icons/fa';

const Education = ({ darkMode }) => {
  // Initial education data
  const [education, setEducation] = useState([
    {
      id: 1,
      degree: "Master of Computer Science",
      institution: "Summit State University",
      location: "Stanford, CA",
      period: "2013 - 2015",
      description: "Specialized in Software Engineering and Artificial Intelligence. Graduated with honors.",
      achievements: [
        "GPA: 3.9/4.0",
        "Published research paper on machine learning applications",
        "President of Computer Science Society"
      ]
    },
    {
      id: 2,
      degree: "Bachelor of Science in Computer Science",
      institution: "Forest University",
      location: "Berkeley, CA",
      period: "2009 - 2013",
      description: "Comprehensive education in computer science fundamentals with focus on web technologies.",
      achievements: [
        "GPA: 3.8/4.0",
        "Dean's List for 6 consecutive semesters",
        "Won first place in annual hackathon"
      ]
    },
    {
      id: 3,
      degree: "Full Stack Web Development Bootcamp",
      institution: "Alpine Academy",
      location: "San Francisco, CA",
      period: "2015",
      description: "Intensive 12-week program focusing on modern web development technologies and best practices.",
      achievements: [
        "Built 5 full-stack applications",
        "Collaborated on team projects using agile methodologies",
        "Graduated top of class"
      ]
    }
  ]);

  // State for new education form
  const [newEducation, setNewEducation] = useState({
    degree: "",
    institution: "",
    location: "",
    period: "",
    description: "",
    achievements: [""]
  });

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editEducation, setEditEducation] = useState(null);

  // State for saving status
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle input change for new education
  const handleNewEducationChange = (field, value) => {
    setNewEducation({ ...newEducation, [field]: value });
  };

  // Handle achievement change for new education
  const handleNewAchievementChange = (index, value) => {
    const updatedAchievements = [...newEducation.achievements];
    updatedAchievements[index] = value;
    setNewEducation({ ...newEducation, achievements: updatedAchievements });
  };

  // Add new achievement field to new education
  const addNewAchievement = () => {
    setNewEducation({
      ...newEducation,
      achievements: [...newEducation.achievements, ""]
    });
  };

  // Remove achievement field from new education
  const removeNewAchievement = (index) => {
    if (newEducation.achievements.length > 1) {
      const updatedAchievements = [...newEducation.achievements];
      updatedAchievements.splice(index, 1);
      setNewEducation({ ...newEducation, achievements: updatedAchievements });
    }
  };

  // Add new education
  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.period) {
      const newId = Math.max(0, ...education.map(e => e.id)) + 1;
      const filteredAchievements = newEducation.achievements.filter(a => a.trim() !== "");
      
      setEducation([
        ...education,
        {
          ...newEducation,
          id: newId,
          achievements: filteredAchievements
        }
      ]);
      
      // Reset form
      setNewEducation({
        degree: "",
        institution: "",
        location: "",
        period: "",
        description: "",
        achievements: [""]
      });
    }
  };

  // Start editing an education
  const startEditing = (edu) => {
    setEditingId(edu.id);
    setEditEducation({ ...edu });
  };

  // Handle input change for editing education
  const handleEditEducationChange = (field, value) => {
    setEditEducation({ ...editEducation, [field]: value });
  };

  // Handle achievement change for editing education
  const handleEditAchievementChange = (index, value) => {
    const updatedAchievements = [...editEducation.achievements];
    updatedAchievements[index] = value;
    setEditEducation({ ...editEducation, achievements: updatedAchievements });
  };

  // Add new achievement field to editing education
  const addEditAchievement = () => {
    setEditEducation({
      ...editEducation,
      achievements: [...editEducation.achievements, ""]
    });
  };

  // Remove achievement field from editing education
  const removeEditAchievement = (index) => {
    if (editEducation.achievements.length > 1) {
      const updatedAchievements = [...editEducation.achievements];
      updatedAchievements.splice(index, 1);
      setEditEducation({ ...editEducation, achievements: updatedAchievements });
    }
  };

  // Save edited education
  const saveEditedEducation = () => {
    if (editEducation.degree && editEducation.institution && editEducation.period) {
      const filteredAchievements = editEducation.achievements.filter(a => a.trim() !== "");
      
      setEducation(education.map(edu => 
        edu.id === editingId 
          ? { ...editEducation, achievements: filteredAchievements } 
          : edu
      ));
      
      cancelEditing();
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditEducation(null);
  };

  // Delete education
  const deleteEducation = (id) => {
    setEducation(education.filter(edu => edu.id !== id));
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
  const tealHoverClass = darkMode ? 'hover:text-teal-300' : 'hover:text-teal-800';
  const redHoverClass = darkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50';
  const redTextClass = darkMode ? 'text-red-400' : 'text-red-600';
  const successBgClass = darkMode ? 'bg-green-900' : 'bg-green-100';
  const successTextClass = darkMode ? 'text-green-200' : 'text-green-700';

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${textClass}`}>Education Editor</h1>
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

        {/* Add New Education Form */}
        <div className={`rounded-2xl p-6 border shadow-sm mb-8 ${cardBgClass} ${borderClass}`}>
          <h2 className={`text-2xl font-semibold mb-6 flex items-center ${tealTextClass}`}>
            <FaPlus className="mr-2" /> Add New Education
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Degree</label>
              <input
                type="text"
                value={newEducation.degree}
                onChange={(e) => handleNewEducationChange('degree', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Degree Name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Institution</label>
              <input
                type="text"
                value={newEducation.institution}
                onChange={(e) => handleNewEducationChange('institution', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Institution Name"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Location</label>
              <input
                type="text"
                value={newEducation.location}
                onChange={(e) => handleNewEducationChange('location', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="City, State"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Period</label>
              <input
                type="text"
                value={newEducation.period}
                onChange={(e) => handleNewEducationChange('period', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="2013 - 2015"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Description</label>
            <textarea
              value={newEducation.description}
              onChange={(e) => handleNewEducationChange('description', e.target.value)}
              rows={3}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
              placeholder="Education description"
            />
          </div>
          
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <label className={`block text-sm font-medium ${textSecondaryClass}`}>Achievements</label>
              <button
                type="button"
                onClick={addNewAchievement}
                className={`text-sm flex items-center ${tealTextClass} ${tealHoverClass}`}
              >
                <FaPlus className="mr-1" /> Add Achievement
              </button>
            </div>
            {newEducation.achievements.map((achievement, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => handleNewAchievementChange(index, e.target.value)}
                  className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="Achievement description"
                />
                <button
                  type="button"
                  onClick={() => removeNewAchievement(index)}
                  disabled={newEducation.achievements.length <= 1}
                  className={`ml-2 p-2 rounded-full disabled:opacity-25 disabled:cursor-not-allowed ${redTextClass} ${redHoverClass}`}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleAddEducation}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
          >
            <FaPlus className="mr-2" /> Add Education
          </button>
        </div>

        {/* Existing Education */}
        <div className="space-y-8">
          <h2 className={`text-2xl font-semibold ${textClass}`}>Your Education</h2>
          
          {education.length === 0 ? (
            <div className={`text-center py-8 ${textMutedClass}`}>
              No education entries yet. Add your first education above.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {education.map((edu) => (
                <div key={edu.id} className={`${cardBgClass} rounded-2xl p-6 border shadow-sm relative ${borderClass}`}>
                  {editingId === edu.id ? (
                    // Edit Mode
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-lg font-semibold ${textClass}`}>Editing Education</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={saveEditedEducation}
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
                      
                      <div className="space-y-4 mb-4">
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Degree</label>
                          <input
                            type="text"
                            value={editEducation.degree}
                            onChange={(e) => handleEditEducationChange('degree', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Institution</label>
                          <input
                            type="text"
                            value={editEducation.institution}
                            onChange={(e) => handleEditEducationChange('institution', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Location</label>
                          <input
                            type="text"
                            value={editEducation.location}
                            onChange={(e) => handleEditEducationChange('location', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Period</label>
                          <input
                            type="text"
                            value={editEducation.period}
                            onChange={(e) => handleEditEducationChange('period', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Description</label>
                        <textarea
                          value={editEducation.description}
                          onChange={(e) => handleEditEducationChange('description', e.target.value)}
                          rows={2}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className={`block text-sm font-medium ${textSecondaryClass}`}>Achievements</label>
                          <button
                            type="button"
                            onClick={addEditAchievement}
                            className={`text-xs flex items-center ${tealTextClass} ${tealHoverClass}`}
                          >
                            <FaPlus className="mr-1" /> Add
                          </button>
                        </div>
                        {editEducation.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center mb-2">
                            <input
                              type="text"
                              value={achievement}
                              onChange={(e) => handleEditAchievementChange(index, e.target.value)}
                              className={`flex-1 px-3 py-1 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeEditAchievement(index)}
                              disabled={editEducation.achievements.length <= 1}
                              className={`ml-2 p-1 rounded-full disabled:opacity-25 disabled:cursor-not-allowed ${redTextClass} ${redHoverClass}`}
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-blue-600 flex items-center justify-center text-white mr-3">
                            <FaGraduationCap />
                          </div>
                          <div>
                            <h3 className={`text-lg font-bold ${textClass}`}>{edu.degree}</h3>
                            <p className={`text-md font-medium ${tealTextClass}`}>{edu.institution}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditing(edu)}
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteEducation(edu.id)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      
                      <div className={`flex items-center mb-2 ${tealTextClass}`}>
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{edu.location}</span>
                      </div>
                      
                      <div className={`flex items-center mb-3 ${tealTextClass}`}>
                        <FaCalendarAlt className="mr-2" />
                        <span>{edu.period}</span>
                      </div>
                      
                      <p className={`mb-3 text-sm ${textSecondaryClass}`}>{edu.description}</p>
                      
                      <div>
                        <h4 className={`font-medium mb-2 text-sm ${textClass}`}>Achievements:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {edu.achievements.map((achievement, index) => (
                            <li key={index} className={`text-sm ${textSecondaryClass}`}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Bottom border accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-600 rounded-b-xl"></div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Education;