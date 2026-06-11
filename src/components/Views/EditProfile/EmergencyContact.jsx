// components/EmergencyContact.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaAmbulance, FaHospital, FaUserAlt, FaEnvelope, FaMapMarkerAlt, FaExclamationTriangle, FaPlus, FaTrash, FaSave, FaEdit, FaTimes } from 'react-icons/fa';

const EmergencyContact = ({ darkMode }) => {
  // Initial emergency contacts
  const [emergencyContacts, setEmergencyContacts] = useState([
    {
      id: 1,
      name: "Jane Doe",
      relationship: "Spouse",
      phone: "+1 (555) 123-4567",
      secondaryPhone: "+1 (555) 765-4321",
      email: "jane@example.com",
      address: "123 Main St, San Francisco, CA 94110"
    },
    {
      id: 2,
      name: "Robert Doe",
      relationship: "Father",
      phone: "+1 (555) 987-6543",
      secondaryPhone: "+1 (555) 456-7890",
      email: "robert@example.com",
      address: "456 Oak Ave, New York, NY 10001"
    },
    {
      id: 3,
      name: "Emily Johnson",
      relationship: "Sister",
      phone: "+1 (555) 234-5678",
      secondaryPhone: "",
      email: "emily@example.com",
      address: "789 Pine Rd, Chicago, IL 60601"
    }
  ]);

  // Initial emergency services
  const [emergencyServices, setEmergencyServices] = useState([
    {
      id: 1,
      name: "Emergency Services",
      number: "911",
      icon: <FaAmbulance className="text-red-500" />
    },
    {
      id: 2,
      name: "Poison Control",
      number: "1-800-222-1222",
      icon: <FaHospital className="text-blue-500" />
    },
    {
      id: 3,
      name: "Suicide Prevention",
      number: "988",
      icon: <FaPhone className="text-green-500" />
    }
  ]);

  // State for new contact
  const [newContact, setNewContact] = useState({
    name: "",
    relationship: "",
    phone: "",
    secondaryPhone: "",
    email: "",
    address: ""
  });

  // State for new service
  const [newService, setNewService] = useState({
    name: "",
    number: "",
    iconType: "ambulance"
  });

  // State for editing
  const [editingId, setEditingId] = useState(null);
  const [editContact, setEditContact] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editService, setEditService] = useState(null);

  // State for saving status
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Icon options for services
  const iconOptions = [
    { type: "ambulance", icon: <FaAmbulance className="text-red-500" /> },
    { type: "hospital", icon: <FaHospital className="text-blue-500" /> },
    { type: "phone", icon: <FaPhone className="text-green-500" /> }
  ];

  // Handle input change for new contact
  const handleNewContactChange = (field, value) => {
    setNewContact({ ...newContact, [field]: value });
  };

  // Add new contact
  const handleAddContact = () => {
    if (newContact.name.trim() !== "" && newContact.phone.trim() !== "") {
      const newId = Math.max(0, ...emergencyContacts.map(c => c.id)) + 1;
      
      setEmergencyContacts([
        ...emergencyContacts,
        {
          id: newId,
          name: newContact.name.trim(),
          relationship: newContact.relationship.trim(),
          phone: newContact.phone.trim(),
          secondaryPhone: newContact.secondaryPhone.trim(),
          email: newContact.email.trim(),
          address: newContact.address.trim()
        }
      ]);
      
      // Reset form
      setNewContact({
        name: "",
        relationship: "",
        phone: "",
        secondaryPhone: "",
        email: "",
        address: ""
      });
    }
  };

  // Start editing a contact
  const startEditingContact = (contact) => {
    setEditingId(contact.id);
    setEditContact({ ...contact });
  };

  // Handle input change for editing contact
  const handleEditContactChange = (field, value) => {
    setEditContact({ ...editContact, [field]: value });
  };

  // Save edited contact
  const saveEditedContact = () => {
    if (editContact.name.trim() !== "" && editContact.phone.trim() !== "") {
      setEmergencyContacts(emergencyContacts.map(contact => 
        contact.id === editingId ? editContact : contact
      ));
      cancelEditingContact();
    }
  };

  // Cancel editing contact
  const cancelEditingContact = () => {
    setEditingId(null);
    setEditContact(null);
  };

  // Delete contact
  const deleteContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
    if (editingId === id) {
      cancelEditingContact();
    }
  };

  // Handle input change for new service
  const handleNewServiceChange = (field, value) => {
    setNewService({ ...newService, [field]: value });
  };

  // Add new service
  const handleAddService = () => {
    if (newService.name.trim() !== "" && newService.number.trim() !== "") {
      const newId = Math.max(0, ...emergencyServices.map(s => s.id)) + 1;
      const selectedIcon = iconOptions.find(opt => opt.type === newService.iconType) || iconOptions[0];
      
      setEmergencyServices([
        ...emergencyServices,
        {
          id: newId,
          name: newService.name.trim(),
          number: newService.number.trim(),
          icon: selectedIcon.icon
        }
      ]);
      
      // Reset form
      setNewService({
        name: "",
        number: "",
        iconType: "ambulance"
      });
    }
  };

  // Start editing a service
  const startEditingService = (service) => {
    setEditingServiceId(service.id);
    setEditService({ ...service, iconType: iconOptions.find(opt => opt.icon === service.icon)?.type || "ambulance" });
  };

  // Handle input change for editing service
  const handleEditServiceChange = (field, value) => {
    setEditService({ ...editService, [field]: value });
  };

  // Save edited service
  const saveEditedService = () => {
    if (editService.name.trim() !== "" && editService.number.trim() !== "") {
      const selectedIcon = iconOptions.find(opt => opt.type === editService.iconType) || iconOptions[0];
      
      setEmergencyServices(emergencyServices.map(service => 
        service.id === editingServiceId 
          ? { ...editService, icon: selectedIcon.icon } 
          : service
      ));
      cancelEditingService();
    }
  };

  // Cancel editing service
  const cancelEditingService = () => {
    setEditingServiceId(null);
    setEditService(null);
  };

  // Delete service
  const deleteService = (id) => {
    setEmergencyServices(emergencyServices.filter(service => service.id !== id));
    if (editingServiceId === id) {
      cancelEditingService();
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
  const redTextClass = darkMode ? 'text-red-400' : 'text-red-600';
  const tealTextClass = darkMode ? 'text-teal-400' : 'text-teal-600';
  const successBgClass = darkMode ? 'bg-green-900' : 'bg-green-100';
  const successTextClass = darkMode ? 'text-green-200' : 'text-green-700';
  const iconBgClass = darkMode ? 'bg-gray-700' : 'bg-white';
  const hoverClass = darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50';

  return (
    <div className={`min-h-screen p-6 ${bgClass}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold ${textClass}`}>Emergency Contacts Editor</h1>
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

        {/* Emergency Services Editor */}
        <div className={`rounded-2xl p-6 border shadow-sm mb-8 ${cardBgClass} ${borderClass}`}>
          <h2 className={`text-2xl font-semibold mb-6 flex items-center ${redTextClass}`}>
            <FaExclamationTriangle className="mr-2" /> Emergency Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {emergencyServices.map((service) => (
              <div key={service.id} className={`rounded-xl border shadow-sm overflow-hidden ${cardBgClass} ${borderClass}`}>
                {editingServiceId === service.id ? (
                  // Edit Mode
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-lg font-semibold ${textClass}`}>Editing Service</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={saveEditedService}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={cancelEditingService}
                          className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Service Name</label>
                        <input
                          type="text"
                          value={editService.name}
                          onChange={(e) => handleEditServiceChange('name', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Emergency Number</label>
                        <input
                          type="text"
                          value={editService.number}
                          onChange={(e) => handleEditServiceChange('number', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Icon</label>
                        <select
                          value={editService.iconType}
                          onChange={(e) => handleEditServiceChange('iconType', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        >
                          <option value="ambulance">Ambulance</option>
                          <option value="hospital">Hospital</option>
                          <option value="phone">Phone</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="p-5 text-center">
                    <div className="flex justify-center mb-3 text-3xl">
                      {service.icon}
                    </div>
                    <h4 className={`font-bold mb-2 ${textClass}`}>{service.name}</h4>
                    <p className={`text-2xl font-bold ${redTextClass}`}>{service.number}</p>
                    <div className="flex justify-center mt-4 space-x-2">
                      <button
                        onClick={() => startEditingService(service)}
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteService(service.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Add New Service Form */}
          <div className={`border-t pt-6 ${borderClass}`}>
            <h3 className={`text-lg font-semibold mb-4 ${textClass}`}>Add New Emergency Service</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Service Name</label>
                <input
                  type="text"
                  value={newService.name}
                  onChange={(e) => handleNewServiceChange('name', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="e.g., Fire Department"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Emergency Number</label>
                <input
                  type="text"
                  value={newService.number}
                  onChange={(e) => handleNewServiceChange('number', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="e.g., 911"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Icon</label>
                <select
                  value={newService.iconType}
                  onChange={(e) => handleNewServiceChange('iconType', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                >
                  <option value="ambulance">Ambulance</option>
                  <option value="hospital">Hospital</option>
                  <option value="phone">Phone</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <button
                onClick={handleAddService}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
              >
                <FaPlus className="mr-2" /> Add Service
              </button>
            </div>
          </div>
        </div>

        {/* Personal Emergency Contacts Editor */}
        <div className={`rounded-2xl p-6 border shadow-sm ${cardBgClass} ${borderClass}`}>
          <h2 className={`text-2xl font-semibold mb-6 flex items-center ${tealTextClass}`}>
            <FaUserAlt className="mr-2" /> Personal Emergency Contacts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6">
            {emergencyContacts.map((contact) => (
              <div key={contact.id} className={`rounded-xl border shadow-sm overflow-hidden ${cardBgClass} ${borderClass}`}>
                {editingId === contact.id ? (
                  // Edit Mode
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className={`text-lg font-semibold ${textClass}`}>Editing Contact</h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={saveEditedContact}
                          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <FaSave />
                        </button>
                        <button
                          onClick={cancelEditingContact}
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
                          value={editContact.name}
                          onChange={(e) => handleEditContactChange('name', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Relationship</label>
                        <input
                          type="text"
                          value={editContact.relationship}
                          onChange={(e) => handleEditContactChange('relationship', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Primary Phone</label>
                        <input
                          type="text"
                          value={editContact.phone}
                          onChange={(e) => handleEditContactChange('phone', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Secondary Phone</label>
                        <input
                          type="text"
                          value={editContact.secondaryPhone}
                          onChange={(e) => handleEditContactChange('secondaryPhone', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Email</label>
                        <input
                          type="email"
                          value={editContact.email}
                          onChange={(e) => handleEditContactChange('email', e.target.value)}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Address</label>
                        <textarea
                          value={editContact.address}
                          onChange={(e) => handleEditContactChange('address', e.target.value)}
                          rows={2}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="h-full flex flex-col">
                    <div className="p-6 flex-grow">
                      <div className="flex items-center mb-6">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 flex items-center justify-center text-white mr-4 shadow-md">
                          <FaUserAlt />
                        </div>
                        <div>
                          <h4 className={`font-bold text-xl ${textClass}`}>{contact.name}</h4>
                          <p className={tealTextClass}>{contact.relationship}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${darkMode ? 'bg-teal-900/30' : 'bg-teal-100'}`}>
                            <FaPhone className={`text-sm ${tealTextClass}`} />
                          </div>
                          <div>
                            <p className={`font-medium ${textClass}`}>{contact.phone}</p>
                            {contact.secondaryPhone && (
                              <p className={`text-sm ${tealTextClass}`}>{contact.secondaryPhone}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${darkMode ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                            <FaEnvelope className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                          </div>
                          <p className={`text-sm ${textSecondaryClass}`}>{contact.email}</p>
                        </div>
                        
                        <div className="flex items-start">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                            <FaMapMarkerAlt className={`text-sm ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
                          </div>
                          <p className={`text-sm ${textSecondaryClass}`}>{contact.address}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-4 mt-auto">
                      <div className="flex justify-between items-center">
                        <a 
                          href={`tel:${contact.phone.replace(/\D/g, '')}`} 
                          className="text-white font-medium hover:text-teal-100 transition-colors flex items-center"
                        >
                          <FaPhone className="mr-2" />
                          Call Now
                        </a>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEditingContact(contact)}
                            className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => deleteContact(contact.id)}
                            className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Add New Contact Form */}
          <div className={`border-t pt-6 ${borderClass}`}>
            <h3 className={`text-lg font-semibold mb-4 ${textClass}`}>Add New Emergency Contact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Name</label>
                <input
                  type="text"
                  value={newContact.name}
                  onChange={(e) => handleNewContactChange('name', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="Enter contact name"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Relationship</label>
                <input
                  type="text"
                  value={newContact.relationship}
                  onChange={(e) => handleNewContactChange('relationship', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="e.g., Spouse, Parent, Sibling"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Primary Phone</label>
                <input
                  type="text"
                  value={newContact.phone}
                  onChange={(e) => handleNewContactChange('phone', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="Enter primary phone number"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Secondary Phone</label>
                <input
                  type="text"
                  value={newContact.secondaryPhone}
                  onChange={(e) => handleNewContactChange('secondaryPhone', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="Enter secondary phone number (optional)"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Email</label>
                <input
                  type="email"
                  value={newContact.email}
                  onChange={(e) => handleNewContactChange('email', e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="Enter email address"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-1 ${textSecondaryClass}`}>Address</label>
                <textarea
                  value={newContact.address}
                  onChange={(e) => handleNewContactChange('address', e.target.value)}
                  rows={2}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent ${inputBgClass} ${inputBorderClass} ${textClass}`}
                  placeholder="Enter address"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={handleAddContact}
                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
              >
                <FaPlus className="mr-2" /> Add Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyContact;