// components/Certifications.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaCalendarAlt, FaExternalLinkAlt, FaWater, FaAnchor, FaPlus, FaTrash, FaSave, FaTimes, FaEdit } from 'react-icons/fa';

const Certifications = ({ darkMode }) => {
  // Initial certifications data
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Jun 2022",
      credentialId: "AWS-ASA-123456",
      link: "https://aws.amazon.com/certification/",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 2,
      name: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "Mar 2021",
      credentialId: "GCP-PD-789012",
      link: "https://cloud.google.com/certification",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 3,
      name: "MongoDB Certified Developer",
      issuer: "MongoDB University",
      date: "Sep 2020",
      credentialId: "MDB-CD-345678",
      link: "https://university.mongodb.com/",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      name: "React Advanced Patterns",
      issuer: "Ocean Frontend Masters",
      date: "Jan 2020",
      credentialId: "FE-React-AP-901234",
      link: "https://frontendmasters.com/",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80"
    }
  ]);

  // State for new certification
  const [newCertification, setNewCertification] = useState({
    name: "",
    issuer: "",
    date: "",
    credentialId: "",
    link: "",
    image: ""
  });

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editCertification, setEditCertification] = useState(null);

  // State for saving status
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle input change for new certification
  const handleNewCertificationChange = (field, value) => {
    setNewCertification({ ...newCertification, [field]: value });
  };

  // Add new certification
  const handleAddCertification = () => {
    if (newCertification.name.trim() !== "" && newCertification.issuer.trim() !== "") {
      const newId = Math.max(0, ...certifications.map(c => c.id)) + 1;
      
      setCertifications([
        ...certifications,
        {
          id: newId,
          name: newCertification.name,
          issuer: newCertification.issuer,
          date: newCertification.date,
          credentialId: newCertification.credentialId,
          link: newCertification.link,
          image: newCertification.image || `https://via.placeholder.com/500x300?text=${encodeURIComponent(newCertification.name)}`
        }
      ]);
      
      // Reset form
      setNewCertification({
        name: "",
        issuer: "",
        date: "",
        credentialId: "",
        link: "",
        image: ""
      });
    }
  };

  // Start editing a certification
  const startEditing = (cert) => {
    setEditingId(cert.id);
    setEditCertification({ ...cert });
  };

  // Handle input change for editing certification
  const handleEditCertificationChange = (field, value) => {
    setEditCertification({ ...editCertification, [field]: value });
  };

  // Save edited certification
  const saveEditedCertification = () => {
    if (editCertification.name.trim() !== "" && editCertification.issuer.trim() !== "") {
      setCertifications(certifications.map(cert => 
        cert.id === editingId ? editCertification : cert
      ));
      cancelEditing();
    }
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditCertification(null);
  };

  // Delete certification
  const deleteCertification = (id) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
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
  const textMutedClass = darkMode ? 'text-gray-400' : 'text-gray-600';
  const borderClass = darkMode ? 'border-gray-700' : 'border-gray-200';
  const cardBgClass = darkMode ? 'bg-gray-800' : 'bg-white';
  const inputBgClass = darkMode ? 'bg-gray-700' : 'bg-white';
  const inputBorderClass = darkMode ? 'border-gray-600' : 'border-gray-300';
  const blueTextClass = darkMode ? 'text-blue-400' : 'text-blue-600';
  const cyanTextClass = darkMode ? 'text-cyan-400' : 'text-cyan-600';
  const successBgClass = darkMode ? 'bg-green-900' : 'bg-green-100';
  const successTextClass = darkMode ? 'text-green-200' : 'text-green-700';
  const hoverBgClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${textClass}`}>Certifications Editor</h1>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-75"
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

        {/* Add New Certification Form */}
        <div className={`rounded-2xl p-6 border shadow-sm mb-8 ${cardBgClass} ${borderClass}`}>
          <h2 className={`text-2xl font-semibold mb-6 flex items-center ${blueTextClass}`}>
            <FaPlus className="mr-2" /> Add New Certification
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Certification Name</label>
              <input
                type="text"
                value={newCertification.name}
                onChange={(e) => handleNewCertificationChange('name', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="e.g., AWS Certified Solutions Architect"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Issuer</label>
              <input
                type="text"
                value={newCertification.issuer}
                onChange={(e) => handleNewCertificationChange('issuer', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="e.g., Amazon Web Services"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Date</label>
              <input
                type="text"
                value={newCertification.date}
                onChange={(e) => handleNewCertificationChange('date', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="e.g., Jun 2022"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Credential ID</label>
              <input
                type="text"
                value={newCertification.credentialId}
                onChange={(e) => handleNewCertificationChange('credentialId', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="e.g., AWS-ASA-123456"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Verification Link</label>
              <input
                type="text"
                value={newCertification.link}
                onChange={(e) => handleNewCertificationChange('link', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="e.g., https://aws.amazon.com/certification/"
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Image URL</label>
              <input
                type="text"
                value={newCertification.image}
                onChange={(e) => handleNewCertificationChange('image', e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                placeholder="Enter image URL (optional)"
              />
            </div>
          </div>
          
          <button
            onClick={handleAddCertification}
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
          >
            <FaPlus className="mr-2" /> Add Certification
          </button>
        </div>

        {/* Existing Certifications */}
        <div className="space-y-8">
          <h2 className={`text-2xl font-semibold ${textClass}`}>Your Certifications</h2>
          
          {certifications.length === 0 ? (
            <div className={`text-center py-8 ${textMutedClass}`}>
              No certifications yet. Add your first certification above.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <div key={cert.id} className={`rounded-2xl border shadow-sm overflow-hidden ${cardBgClass} ${borderClass}`}>
                  {editingId === cert.id ? (
                    // Edit Mode
                    <div className={`p-6 ${darkMode ? 'bg-gray-800' : ''}`}>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className={`text-lg font-semibold ${textClass}`}>Editing Certification</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={saveEditedCertification}
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
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Certification Name</label>
                          <input
                            type="text"
                            value={editCertification.name}
                            onChange={(e) => handleEditCertificationChange('name', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Issuer</label>
                          <input
                            type="text"
                            value={editCertification.issuer}
                            onChange={(e) => handleEditCertificationChange('issuer', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Date</label>
                          <input
                            type="text"
                            value={editCertification.date}
                            onChange={(e) => handleEditCertificationChange('date', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Credential ID</label>
                          <input
                            type="text"
                            value={editCertification.credentialId}
                            onChange={(e) => handleEditCertificationChange('credentialId', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Verification Link</label>
                          <input
                            type="text"
                            value={editCertification.link}
                            onChange={(e) => handleEditCertificationChange('link', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div>
                          <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Image URL</label>
                          <input
                            type="text"
                            value={editCertification.image}
                            onChange={(e) => handleEditCertificationChange('image', e.target.value)}
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          />
                        </div>
                        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                          {editCertification.image ? (
                            <img 
                              src={editCertification.image} 
                              alt={editCertification.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://via.placeholder.com/500x300?text=Invalid+Image+URL";
                              }}
                            />
                          ) : (
                            <div className={`flex flex-col items-center ${textMutedClass}`}>
                              <FaCertificate className="text-3xl mb-2" />
                              <span>Preview</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex">
                      <div className="w-1/3">
                        <img 
                          src={cert.image} 
                          alt={cert.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://via.placeholder.com/500x300?text=${encodeURIComponent(cert.name)}`;
                          }}
                        />
                      </div>
                      <div className="w-2/3 p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 flex items-center justify-center text-white mr-3">
                              <FaCertificate />
                            </div>
                            <div>
                              <h3 className={`text-lg font-bold ${textClass}`}>{cert.name}</h3>
                              <p className={cyanTextClass}>{cert.issuer}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => startEditing(cert)}
                              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => deleteCertification(cert.id)}
                              className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                        
                        <div className={`flex items-center mb-2 ${cyanTextClass}`}>
                          <FaCalendarAlt className="mr-2" />
                          <span>{cert.date}</span>
                        </div>
                        
                        <p className={`text-sm mb-4 ${textMutedClass}`}>Credential ID: {cert.credentialId}</p>
                        
                        {cert.link && (
                          <a 
                            href={cert.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`inline-flex items-center hover:underline ${blueTextClass}`}
                          >
                            Verify Certificate <FaExternalLinkAlt className="ml-2" />
                          </a>
                        )}
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

export default Certifications;