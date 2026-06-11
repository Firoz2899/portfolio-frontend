// components/Medical.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaAllergies, 
  FaPills, 
  FaUserMd, 
  FaNotesMedical, 
  FaIdCard,
  FaExclamationTriangle,
  FaCapsules,
  FaLungs,
  FaStethoscope,
  FaTint,
  FaEdit,
  FaEllipsisV,
  FaPlus,
  FaTrash,
  FaSave,
  FaTimes
} from 'react-icons/fa';

const Medical = ({ darkMode }) => {
  // Initial medical information
  const [medicalInfo, setMedicalInfo] = useState({
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts", "Dust mites"],
    medications: ["Vitamin D3", "Omega-3"],
    conditions: ["Mild Asthma"],
    doctors: [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "General Practitioner",
        phone: "+1 (555) 234-5678"
      },
      {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Cardiologist",
        phone: "+1 (555) 345-6789"
      }
    ]
  });

  // State for new allergy
  const [newAllergy, setNewAllergy] = useState("");

  // State for new medication
  const [newMedication, setNewMedication] = useState("");

  // State for new condition
  const [newCondition, setNewCondition] = useState("");

  // State for new doctor
  const [newDoctor, setNewDoctor] = useState({
    name: "",
    specialty: "",
    phone: ""
  });

  // State for editing
  const [editingDoctor, setEditingDoctor] = useState(null);

  // State for saving status
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Handle blood type change
  const handleBloodTypeChange = (value) => {
    setMedicalInfo({ ...medicalInfo, bloodType: value });
  };

  // Add new allergy
  const handleAddAllergy = () => {
    if (newAllergy.trim() !== "" && !medicalInfo.allergies.includes(newAllergy.trim())) {
      setMedicalInfo({
        ...medicalInfo,
        allergies: [...medicalInfo.allergies, newAllergy.trim()]
      });
      setNewAllergy("");
    }
  };

  // Remove allergy
  const handleRemoveAllergy = (index) => {
    const updatedAllergies = [...medicalInfo.allergies];
    updatedAllergies.splice(index, 1);
    setMedicalInfo({ ...medicalInfo, allergies: updatedAllergies });
  };

  // Add new medication
  const handleAddMedication = () => {
    if (newMedication.trim() !== "" && !medicalInfo.medications.includes(newMedication.trim())) {
      setMedicalInfo({
        ...medicalInfo,
        medications: [...medicalInfo.medications, newMedication.trim()]
      });
      setNewMedication("");
    }
  };

  // Remove medication
  const handleRemoveMedication = (index) => {
    const updatedMedications = [...medicalInfo.medications];
    updatedMedications.splice(index, 1);
    setMedicalInfo({ ...medicalInfo, medications: updatedMedications });
  };

  // Add new condition
  const handleAddCondition = () => {
    if (newCondition.trim() !== "" && !medicalInfo.conditions.includes(newCondition.trim())) {
      setMedicalInfo({
        ...medicalInfo,
        conditions: [...medicalInfo.conditions, newCondition.trim()]
      });
      setNewCondition("");
    }
  };

  // Remove condition
  const handleRemoveCondition = (index) => {
    const updatedConditions = [...medicalInfo.conditions];
    updatedConditions.splice(index, 1);
    setMedicalInfo({ ...medicalInfo, conditions: updatedConditions });
  };

  // Handle new doctor change
  const handleNewDoctorChange = (field, value) => {
    setNewDoctor({ ...newDoctor, [field]: value });
  };

  // Add new doctor
  const handleAddDoctor = () => {
    if (newDoctor.name.trim() !== "" && newDoctor.specialty.trim() !== "") {
      const newId = Math.max(0, ...medicalInfo.doctors.map(d => d.id)) + 1;
      setMedicalInfo({
        ...medicalInfo,
        doctors: [
          ...medicalInfo.doctors,
          {
            id: newId,
            name: newDoctor.name.trim(),
            specialty: newDoctor.specialty.trim(),
            phone: newDoctor.phone.trim()
          }
        ]
      });
      setNewDoctor({
        name: "",
        specialty: "",
        phone: ""
      });
    }
  };

  // Start editing a doctor
  const startEditingDoctor = (doctor) => {
    setEditingDoctor(doctor.id);
  };

  // Handle edit doctor change
  const handleEditDoctorChange = (field, value) => {
    setMedicalInfo({
      ...medicalInfo,
      doctors: medicalInfo.doctors.map(doctor => 
        doctor.id === editingDoctor ? { ...doctor, [field]: value } : doctor
      )
    });
  };

  // Save edited doctor
  const saveEditedDoctor = () => {
    setEditingDoctor(null);
  };

  // Cancel editing doctor
  const cancelEditingDoctor = () => {
    setEditingDoctor(null);
  };

  // Delete doctor
  const handleDeleteDoctor = (id) => {
    setMedicalInfo({
      ...medicalInfo,
      doctors: medicalInfo.doctors.filter(doctor => doctor.id !== id)
    });
    if (editingDoctor === id) {
      setEditingDoctor(null);
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
  const inputBorderClass = darkMode ? 'border-gray-600' : 'border-gray-200';
  const successBgClass = darkMode ? 'bg-green-900' : 'bg-green-100';
  const successTextClass = darkMode ? 'text-green-200' : 'text-green-700';
  const yellowBgClass = darkMode ? 'bg-yellow-900/30' : 'bg-yellow-50';
  const yellowBorderClass = darkMode ? 'border-yellow-800' : 'border-yellow-100';
  const yellowTextClass = darkMode ? 'text-yellow-300' : 'text-yellow-600';
  const blueBgClass = darkMode ? 'bg-blue-900/30' : 'bg-blue-50';
  const blueBorderClass = darkMode ? 'border-blue-800' : 'border-blue-100';
  const blueTextClass = darkMode ? 'text-blue-300' : 'text-blue-600';
  const purpleBgClass = darkMode ? 'bg-purple-900/30' : 'bg-purple-50';
  const purpleBorderClass = darkMode ? 'border-purple-800' : 'border-purple-100';
  const purpleTextClass = darkMode ? 'text-purple-300' : 'text-purple-600';
  const tealBgClass = darkMode ? 'bg-teal-900/30' : 'bg-teal-50';
  const tealBorderClass = darkMode ? 'border-teal-800' : 'border-teal-100';
  const tealTextClass = darkMode ? 'text-teal-300' : 'text-teal-600';
  const redTextClass = darkMode ? 'text-red-400' : 'text-red-500';
  const redHoverClass = darkMode ? 'hover:text-red-300' : 'hover:text-red-700';
  const grayTextClass = darkMode ? 'text-gray-400' : 'text-gray-400';
  const grayHoverClass = darkMode ? 'hover:text-gray-300' : 'hover:text-gray-600';
  const selectBgClass = darkMode ? 'bg-transparent' : 'bg-transparent';
  const selectBorderClass = darkMode ? 'border-white/30' : 'border-white/30';
  const selectTextClass = darkMode ? 'text-white' : 'text-white';

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${textClass}`}>Medical Information Editor</h1>
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

        {/* Medical Information Editor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Medical Card */}
          <div className="lg:col-span-2">
            <div className={`${cardBgClass} rounded-2xl shadow-xl overflow-hidden border ${blueBorderClass}`}>
              {/* Card Header */}
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-5 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <FaIdCard className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Medical Profile</h3>
                      <p className="text-xs text-teal-100">Emergency Information</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-2">
                      <FaTint className="text-sm" />
                    </div>
                    <select
                      value={medicalInfo.bloodType}
                      onChange={(e) => handleBloodTypeChange(e.target.value)}
                      className={`${selectBgClass} ${selectBorderClass} rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-white/50 ${selectTextClass}`}
                    >
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-6">
                {/* Medical Categories */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Allergies */}
                  <div className={`${yellowBgClass} rounded-xl p-4 border ${yellowBorderClass}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-2 ${darkMode ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                          <FaAllergies className={yellowTextClass} />
                        </div>
                        <h4 className={`text-sm font-medium ${textClass}`}>Allergies</h4>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-yellow-800 text-yellow-200' : 'bg-yellow-200 text-yellow-800'}`}>
                        {medicalInfo.allergies.length}
                      </span>
                    </div>
                    <div className="space-y-2 mb-3">
                      {medicalInfo.allergies.map((allergy, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <div className="flex items-center">
                            <FaExclamationTriangle className={`mr-2 ${yellowTextClass}`} />
                            <span className={textSecondaryClass}>{allergy}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveAllergy(index)}
                            className={`${redTextClass} ${redHoverClass}`}
                          >
                            <FaTimes size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={newAllergy}
                        onChange={(e) => setNewAllergy(e.target.value)}
                        className={`flex-1 px-3 py-1 border rounded-l-lg focus:outline-none focus:ring-1 text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        placeholder="Add new allergy"
                      />
                      <button
                        onClick={handleAddAllergy}
                        className="px-3 py-1 bg-yellow-500 text-white rounded-r-lg hover:bg-yellow-600 transition-colors"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Medications */}
                  <div className={`${blueBgClass} rounded-xl p-4 border ${blueBorderClass}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-2 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                          <FaPills className={blueTextClass} />
                        </div>
                        <h4 className={`text-sm font-medium ${textClass}`}>Medications</h4>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-blue-800 text-blue-200' : 'bg-blue-200 text-blue-800'}`}>
                        {medicalInfo.medications.length}
                      </span>
                    </div>
                    <div className="space-y-2 mb-3">
                      {medicalInfo.medications.map((medication, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <div className="flex items-center">
                            <FaCapsules className={`mr-2 ${blueTextClass}`} />
                            <span className={textSecondaryClass}>{medication}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveMedication(index)}
                            className={`${redTextClass} ${redHoverClass}`}
                          >
                            <FaTimes size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={newMedication}
                        onChange={(e) => setNewMedication(e.target.value)}
                        className={`flex-1 px-3 py-1 border rounded-l-lg focus:outline-none focus:ring-1 text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        placeholder="Add new medication"
                      />
                      <button
                        onClick={handleAddMedication}
                        className="px-3 py-1 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Conditions */}
                  <div className={`${purpleBgClass} rounded-xl p-4 border ${purpleBorderClass}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-2 ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                          <FaNotesMedical className={purpleTextClass} />
                        </div>
                        <h4 className={`text-sm font-medium ${textClass}`}>Conditions</h4>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${darkMode ? 'bg-purple-800 text-purple-200' : 'bg-purple-200 text-purple-800'}`}>
                        {medicalInfo.conditions.length}
                      </span>
                    </div>
                    <div className="space-y-2 mb-3">
                      {medicalInfo.conditions.map((condition, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <div className="flex items-center">
                            <FaLungs className={`mr-2 ${purpleTextClass}`} />
                            <span className={textSecondaryClass}>{condition}</span>
                          </div>
                          <button
                            onClick={() => handleRemoveCondition(index)}
                            className={`${redTextClass} ${redHoverClass}`}
                          >
                            <FaTimes size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={newCondition}
                        onChange={(e) => setNewCondition(e.target.value)}
                        className={`flex-1 px-3 py-1 border rounded-l-lg focus:outline-none focus:ring-1 text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        placeholder="Add new condition"
                      />
                      <button
                        onClick={handleAddCondition}
                        className="px-3 py-1 bg-purple-500 text-white rounded-r-lg hover:bg-purple-600 transition-colors"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Healthcare Providers */}
            <div className={`${cardBgClass} rounded-2xl shadow-xl overflow-hidden border ${blueBorderClass}`}>
              <div className="bg-gradient-to-r from-teal-500 to-blue-600 p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                      <FaStethoscope className="text-lg" />
                    </div>
                    <h3 className="text-lg font-bold">Healthcare Providers</h3>
                  </div>
                  <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                    {medicalInfo.doctors.length}
                  </span>
                </div>
              </div>
              
              <div className="p-4 space-y-3">
                {medicalInfo.doctors.map((doctor) => (
                  <div key={doctor.id} className={`${tealBgClass} rounded-xl p-3 border ${tealBorderClass}`}>
                    {editingDoctor === doctor.id ? (
                      // Edit Mode
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={doctor.name}
                          onChange={(e) => handleEditDoctorChange('name', e.target.value)}
                          className={`w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-1 text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          placeholder="Doctor name"
                        />
                        <input
                          type="text"
                          value={doctor.specialty}
                          onChange={(e) => handleEditDoctorChange('specialty', e.target.value)}
                          className={`w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-1 text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          placeholder="Specialty"
                        />
                        <input
                          type="text"
                          value={doctor.phone}
                          onChange={(e) => handleEditDoctorChange('phone', e.target.value)}
                          className={`w-full px-3 py-1 border rounded-lg focus:outline-none focus:ring-1 text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                          placeholder="Phone number"
                        />
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={saveEditedDoctor}
                            className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditingDoctor}
                            className="px-3 py-1 bg-gray-500 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex items-start">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 ${darkMode ? 'bg-teal-900/30' : 'bg-teal-100'}`}>
                          <FaUserMd className={tealTextClass} />
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium text-sm ${textClass}`}>{doctor.name}</h4>
                          <p className={`text-xs ${tealTextClass}`}>{doctor.specialty}</p>
                          <p className={`text-xs mt-1 ${textMutedClass}`}>{doctor.phone}</p>
                        </div>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => startEditingDoctor(doctor)}
                            className={`${grayTextClass} ${grayHoverClass} p-1`}
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteDoctor(doctor.id)}
                            className={`${grayTextClass} ${redHoverClass} p-1`}
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Add New Doctor Form */}
              <div className={`p-4 border-t ${tealBorderClass}`}>
                <h4 className={`text-sm font-medium mb-3 ${textClass}`}>Add New Doctor</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    value={newDoctor.name}
                    onChange={(e) => handleNewDoctorChange('name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="Doctor name"
                  />
                  <input
                    type="text"
                    value={newDoctor.specialty}
                    onChange={(e) => handleNewDoctorChange('specialty', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="Specialty"
                  />
                  <input
                    type="text"
                    value={newDoctor.phone}
                    onChange={(e) => handleNewDoctorChange('phone', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 text-sm ${inputBgClass} ${inputBorderClass} ${textClass}`}
                    placeholder="Phone number"
                  />
                  <button
                    onClick={handleAddDoctor}
                    className="w-full px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center justify-center text-sm"
                  >
                    <FaPlus className="mr-2" /> Add Doctor
                  </button>
                </div>
              </div>
            </div>
            
            {/* Emergency Notice */}
            <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl shadow-xl overflow-hidden p-5 text-white">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
                  <FaExclamationTriangle className="text-lg" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Emergency Contact</h3>
                  <p className="text-xs text-red-100">In case of emergency, call 911 or your local emergency services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medical;